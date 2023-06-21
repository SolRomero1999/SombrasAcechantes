export default class Nivel3 extends Phaser.Scene {
  constructor() {
    super("nivel3");
  }

  create() {
    const map = this.make.tilemap({ key: "map3" });

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

    // Obtener todos los objetos de pinchos en la capa de objetos
    const pinchosObjects = map.filterObjects("objetos", (obj) => obj.name === "pinchos");

    // Crear sprites de pinchos para cada objeto encontrado
    this.pinchos = this.physics.add.group();
    pinchosObjects.forEach((obj) => {
      const pinchos = this.pinchos.create(obj.x, obj.y, "pinchos").setScale(0.4);
      pinchos.setImmovable(true);
      this.physics.add.collider(pinchos, plataformaLayer);
      this.physics.add.collider(this.jugador, pinchos, this.jugadorMuere, null, this);
    });

    // Crear el pico
    const spawnPointpico = map.findObject("objetos", (obj) => obj.name === "pico");
    this.pico = this.physics.add.sprite(spawnPointpico.x, spawnPointpico.y, "pico").setScale(0.5);
    this.physics.add.collider(this.pico, plataformaLayer);
    this.physics.add.collider(this.jugador, this.pico, this.jugadorChocaConPico, null, this);

    // Crear el muro
    const spawnPointMuro = map.findObject("objetos", (obj) => obj.name === "muro");
    this.muro = this.physics.add.sprite(spawnPointMuro.x, spawnPointMuro.y, "muro").setScale(1);
    this.muro.setImmovable(true);
    this.physics.add.collider(this.muro, plataformaLayer);
    this.physics.add.collider(this.jugador, this.muro, this.jugadorChocaConMuro, null, this);

    // Obtener todos los objetos de carrito en la capa de objetos
    const carritoObjects = map.filterObjects("objetos", (obj) => obj.name === "carrito");

    // Crear sprites de carrito para cada objeto encontrado
    this.carritos = this.physics.add.group();
    carritoObjects.forEach((obj) => {
      const carrito = this.carritos.create(obj.x, obj.y, "carrito").setScale(0.6);
      this.physics.add.collider(carrito, plataformaLayer);
      this.physics.add.collider(carrito, this.muro);
      this.physics.add.collider(this.jugador, carrito);
    });

    this.jugadorEnContactoConCarrito = false;

    // Crear la salida
    const spawnPointSalida = map.findObject("objetos", (obj) => obj.name === "salida");
    this.salida = this.physics.add.sprite(spawnPointSalida.x, spawnPointSalida.y, "salida").setScale(0.9);
    this.physics.add.collider(this.jugador, plataformaLayer);
    this.physics.add.collider(this.salida, plataformaLayer);

    // Crear iconos
    const spawnPointvolver = map.findObject("objetos", (obj) => obj.name === "volver");
    this.volver = this.physics.add.sprite(spawnPointvolver.x, spawnPointvolver.y, "icono menu").setScale(0.9);
    this.volver.setScrollFactor(0);
    this.volver.body.allowGravity = false;
    this.volver.setInteractive();
    this.volver.on("pointerdown", () => {
      this.sound.play("click");
      this.scene.start("menu");
    });

    const spawnPointinfo = map.findObject("objetos", (obj) => obj.name === "info");
    this.info = this.physics.add.sprite(spawnPointinfo.x, spawnPointinfo.y, "icono ayuda").setScale(0.7);
    this.info.setScrollFactor(0);
    this.info.body.allowGravity = false;

    const spawnPointmusica = map.findObject("objetos", (obj) => obj.name === "musica");
    this.musica = this.physics.add.sprite(spawnPointmusica.x, spawnPointmusica.y, "icono musica").setScale(0.7);
    this.musica.setScrollFactor(0);
    this.musica.body.allowGravity = false;

    const spawnPointsonido = map.findObject("objetos", (obj) => obj.name === "sonido");
    this.sonido = this.physics.add.sprite(spawnPointsonido.x, spawnPointsonido.y, "icono sonido").setScale(0.7);
    this.sonido.setScrollFactor(0);
    this.sonido.body.allowGravity = false;

    // Condición para pasar de nivel
    this.physics.add.overlap(this.jugador, this.salida, this.pasardeNivel, null, this);

    this.luzEncendida = false;

    this.distanciaRecorridaY = 0;

    // Configurar la cámara
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.jugador);

    // Configurar los límites del mundo físico
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.jugador.body.setCollideWorldBounds(true);
  }

  jugadorChocaConPico(jugador, pico) {
    pico.disableBody(true, true);
    this.haRecogidoElPico = true;
  }

  jugadorChocaConMuro(jugador, muro) {
    if (this.haRecogidoElPico) {
      var sound = this.sound.add('piedras'); 
      sound.setVolume(0.3);
      sound.setRate(2);
      sound.play();
      muro.disableBody(true, true); 
    } else {
      // El jugador simplemente se detiene al chocar con el muro
      jugador.setVelocityX(0);
      jugador.setVelocityY(0);
    }
  }

  jugadorMuere() {
    console.log("¡El jugador murió!");
    this.scene.start("perdiste");
  }

  pasardeNivel() {
    this.scene.start("ganaste");
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
      this.jugador.setVelocityY(-250);
      if (this.cursors.left.isDown) {
        this.jugador.anims.play('jump-left', true);
      } else if (this.cursors.right.isDown) {
        this.jugador.anims.play('jump-right', true);
      }
    }

    if (this.physics.overlap(this.jugador, this.carritos)) {
      this.jugadorEnContactoConCarrito = true;
    } else {
      this.jugadorEnContactoConCarrito = false;
    }

    if (this.jugadorEnContactoConCarrito) {
      this.carritos.getChildren().forEach((carrito) => {
        if (this.cursors.left.isDown) {
          carrito.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
          carrito.setVelocityX(160);
        } else {
          carrito.setVelocityX(0);
        }
      });
    } else {
      this.carritos.setVelocityX(0);
    }

    this.distanciaRecorridaY += Math.abs(this.jugador.body.velocity.y);

    if (this.jugador.body.blocked.down) {
      this.distanciaRecorridaY = 0;
    }

    const distanciaMaximaSinPlataforma = 3000;
    if (this.distanciaRecorridaY >= distanciaMaximaSinPlataforma && !this.jugador.body.blocked.down) {
      this.jugadorMuere();
    }

    this.cameras.main.scrollY = this.jugador.y - this.cameras.main.height / 2;
  }
}