export default class nivel2 extends Phaser.Scene {
    constructor() {
      super("nivel2");
    }

    create() {
      const map = this.make.tilemap({ key: "map2" });
  
      // Cargar las capas de tiles: fondo y plataformas
      const capaFondo = map.addTilesetImage("fondo", "tilesFondo");
      const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");
      const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
      const plataformaLayer = map.createLayer("plataformas", capaPlataformas, 0, 0);
  
      const objectosLayer = map.getObjectLayer("objetos");
      plataformaLayer.setCollisionByProperty({ colision: true });
  
      // Crear al jugador
      const spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
      this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
      this.jugador.setBounce(0.1);
      this.jugador.setCollideWorldBounds(true);
      this.jugador.setScale(0.2);
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Crear los pinchos
      const spawnPointpinchos = map.findObject("objetos", (obj) => obj.name === "pinchos");
      this.pinchos = this.physics.add.sprite(spawnPointpinchos.x, spawnPointpinchos.y, "pinchos").setScale(0.5);
      this.pinchos.setImmovable(true); // Establecer como inamovible
      this.physics.add.collider(this.pinchos, plataformaLayer);
      this.physics.add.collider(this.jugador, this.pinchos, this.jugadorMuere, null, this);
  
      // Crear el pico
      const spawnPointpico = map.findObject("objetos", (obj) => obj.name === "pico");
      this.pico = this.physics.add.sprite(spawnPointpico.x, spawnPointpico.y, "pico").setScale(0.5);
      this.physics.add.collider(this.pico, plataformaLayer);
      this.physics.add.collider(this.jugador, this.pico, this.jugadorChocaConPico, null, this);
  
      // Crear el muro
      const spawnPointMuro = map.findObject("objetos", (obj) => obj.name === "muro");
      this.muro = this.physics.add.sprite(spawnPointMuro.x, spawnPointMuro.y, "muro").setScale(1);
      this.muro.setImmovable(true); // Establecer como inamovible
      this.physics.add.collider(this.muro, plataformaLayer);
      this.physics.add.collider(this.jugador, this.muro, this.jugadorChocaConMuro, null, this);
  
      // Crear el carrito
      const spawnPointCarrito = map.findObject("objetos", (obj) => obj.name === "carrito");
      this.Carrito = this.physics.add.sprite(spawnPointCarrito.x, spawnPointCarrito.y, "carrito").setScale(0.6);
      this.physics.add.collider(this.Carrito, plataformaLayer);
      this.physics.add.collider(this.Carrito, this.muro); // Establecer la colisión con el muro
      this.physics.add.collider(this.jugador, this.Carrito);
      this.jugadorEnContactoConCarrito = false;
  
      // Crear la salida
      const spawnPointSalida = map.findObject("objetos", (obj) => obj.name === "salida");
      this.salida = this.physics.add.sprite(spawnPointSalida.x, spawnPointSalida.y, "salida").setScale(0.9);
      this.physics.add.collider(this.jugador, plataformaLayer);
      this.physics.add.collider(this.salida, plataformaLayer);
  
      // Condición para pasar de nivel
      this.physics.add.overlap(this.jugador, this.salida, this.pasarAlNivel2, null, this);
  
      this.luzEncendida = false;
  
      this.distanciaRecorridaY = 0; // Variable para almacenar la distancia recorrida en el eje y
    }
  
    jugadorChocaConPico(jugador, pico) {
      pico.disableBody(true, true); // Desactiva el cuerpo físico y oculta el sprite
      this.haRecogidoElPico = true;
    }
  
    jugadorChocaConMuro(jugador, muro) {
      if (this.haRecogidoElPico) {
        muro.disableBody(true, true); // Desactiva el cuerpo físico y oculta el sprite
      } else {
        // El jugador simplemente se detiene al chocar con el muro
        jugador.setVelocityX(0);
        jugador.setVelocityY(0);
      }
    }
  
    jugadorMuere() {
      // Lógica para la muerte del jugador
      console.log("¡El jugador murió!");
      this.scene.start("perdiste");
    }
  
    pasarAlNivel2() {
      this.scene.start("nivel3");
    }
  
    update() {
      if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L))) {
        this.luzEncendida = !this.luzEncendida;
      }
  
      if (this.cursors.left.isDown) {
        this.jugador.setVelocityX(-160);
        if (this.luzEncendida) {
          this.jugador.anims.play('left-luzEncendida', true);
        } else {
          this.jugador.anims.play('left', true);
        }
      } else if (this.cursors.right.isDown) {
        this.jugador.setVelocityX(160);
        if (this.luzEncendida) {
          this.jugador.anims.play('right-luzEncendida', true);
        } else {
          this.jugador.anims.play('right', true);
        }
      } else {
        this.jugador.setVelocityX(0);
        if (this.luzEncendida) {
          this.jugador.anims.play('turn-luzEncendida');
        } else {
          this.jugador.anims.play('turn');
        }
      } 
  
      if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
        this.jugador.setVelocityY(-250); // Ajustar este valor para aumentar la altura del salto
        if (this.cursors.left.isDown) {
          this.jugador.anims.play('jump-left', true);
        } else if (this.cursors.right.isDown) {
          this.jugador.anims.play('jump-right', true);
        }
      }
  
      // Verificar si el jugador está en contacto con el carrito
      if (this.physics.overlap(this.jugador, this.Carrito)) {
        this.jugadorEnContactoConCarrito = true;
      } else {
        this.jugadorEnContactoConCarrito = false;
      }
  
      // Mover el carrito solo si el jugador está en contacto con él
      if (this.jugadorEnContactoConCarrito) {
        if (this.cursors.left.isDown) {
          // Ajustar la velocidad horizontal para un movimiento lateral constante
          this.Carrito.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
          // Ajustar la velocidad horizontal para un movimiento lateral constante
          this.Carrito.setVelocityX(160);
        } else {
          this.Carrito.setVelocityX(0);
        }
      } else {
        this.Carrito.setVelocityX(0); // Detener el movimiento del carrito si el jugador no está en contacto
      }
  
      // Actualizar la distancia recorrida en el eje y
      this.distanciaRecorridaY += Math.abs(this.jugador.body.velocity.y);
  
      // Verificar si el jugador está tocando una plataforma y reiniciar la distancia recorrida en el eje y a cero
      if (this.jugador.body.blocked.down) {
        this.distanciaRecorridaY = 0;
      }
  
      // Verificar la distancia recorrida sin tocar ninguna plataforma
      const distanciaMaximaSinPlataforma = 3000; // Distancia máxima sin tocar plataformas
      if (this.distanciaRecorridaY >= distanciaMaximaSinPlataforma && !this.jugador.body.blocked.down) {
        this.jugadorMuere();
      }
    }
  }