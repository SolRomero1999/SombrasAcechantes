export default class Nivel3 extends Phaser.Scene {
  constructor() {
    super("nivel3");
    this.sonidosActivados = true;
  }

  create() {
    // Obtener referencia al objeto de música de la escena anterior
    this.game.music = this.sound.get("musica");

    // Reanuda la música si ya se estaba reproduciendo en la escena anterior
    if (this.game.music && !this.game.music.isPlaying) {
      this.game.music.play();
    }

    const map = this.make.tilemap({ key: "map3" });

    // Cargar las capas de tiles: fondo y plataformas
    const capaFondo = map.addTilesetImage("fondo", "tilesFondo");
    const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");
    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const plataformaLayer = map.createLayer("plataformas", capaPlataformas, 0, 0);
    const objectosLayer = map.getObjectLayer("objetos");
    plataformaLayer.setCollisionByProperty({ colision: true });

    this.luzEncendida = false;

    this.tiempoLuzEncendida = 0;

    this.contadorTexto = this.add.text(10, 10, 'Tiempo luz encendida: 0', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
    this.contadorTexto.setDepth(2);
    this.contadorTexto.setScrollFactor(0);

    this.maximoTiempoTexto = this.add.text(10, 40, 'Tiempo de uso de luz máximo: 60 segundos', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
    this.maximoTiempoTexto.setDepth(2);
    this.maximoTiempoTexto.setScrollFactor(0);

    this.luzPuedeEncenderse = true;

    this.distanciaRecorridaY = 0; // Variable para almacenar la distancia recorrida en el eje y

    // Crear al jugador
    const spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);
    this.jugador.setScale(0.2);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.jugador.setDepth(2);

    // Crear oscuridad 
    const radioOscuridad = 250; // Radio del círculo de oscuridad
    const oscuridad = this.add.graphics();
    oscuridad.fillStyle(0x000000, 1);
    oscuridad.setDepth(1);
    oscuridad.fillCircle(this.jugador.x-210, this.jugador.y-170, radioOscuridad);
    oscuridad.visible = true;
    this.oscuridad = oscuridad;

    // Actualizar la posición de la oscuridad con respecto al jugador en cada fotograma
    this.oscuridad.setPosition(this.jugador.x, this.jugador.y);

    // Crear la capa de oscuridad
    const menuImage = this.add.image (this.jugador.x, this.jugador.y, "oscuridadfija");
    menuImage.setScale(8);
    this.menuImage = menuImage;
    menuImage.setDepth(1);

    // Obtener todos los objetos de flechas
    const flechasObjects = map.filterObjects("objetos", (obj) => obj.name === "flecha");

    // Crear sprites 
    this.flecha = this.physics.add.group();
    flechasObjects.forEach((obj) => {
      const flecha = this.flecha.create(obj.x, obj.y, "flecha").setScale(0.7);
      flecha.body.allowGravity = false;
    });

    // Obtener todos los objetos de pinchos en la capa de objetos
    const pinchosObjects = map.filterObjects("objetos", (obj) => obj.name === "pinchos");

    // Crear sprites de pinchos para cada objeto encontrado
    this.pinchos = this.physics.add.group();
    pinchosObjects.forEach((obj) => {
      const pinchos = this.pinchos.create(obj.x, obj.y, "pinchos").setScale(0.3);
      pinchos.setImmovable(true);
      this.physics.add.collider(pinchos, plataformaLayer);
      this.physics.add.collider(this.jugador, pinchos, this.jugadorChocaConPinchos, null, this);
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
    const spawnPointVolver = map.findObject("objetos", (obj) => obj.name === "volver");
    this.volver = this.physics.add.sprite(spawnPointVolver.x, spawnPointVolver.y, "icono menu").setScale(0.9);
    this.volver.setScrollFactor(0);
    this.volver.body.allowGravity = false;
    this.volver.setDepth(2);
    this.volver.setInteractive(); 
    this.volver.on("pointerdown", () => {
      if (this.sonidosActivados) {
        this.sound.play("click");
      }
      this.scene.start("menu"); 
    });

    const spawnPointInfo = map.findObject("objetos", (obj) => obj.name === "info");
    this.info = this.physics.add.sprite(spawnPointInfo.x, spawnPointInfo.y, "icono ayuda").setScale(0.7);
    this.info.setScrollFactor(0);
    this.info.body.allowGravity = false;
    this.info.setDepth(2);
    this.info.setInteractive(); 

    const consejos = ["consejo1", "consejo2", "consejo3", "consejo4", "consejo5"];
    let consejoIndex = 0;
    let consejoActual;
    
    this.info.on("pointerdown", () => {
      if (this.sonidosActivados) {
      this.sound.play("click");
    }
      if (consejoIndex < consejos.length) {
        if (!this.image) {
          consejoActual = consejos[consejoIndex];
          this.image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, consejoActual);
          this.image.setScale(0.5);
          this.image.setDepth(2);
          
          this.image.setInteractive();
          this.image.on("pointerdown", () => {
            if (this.sonidosActivados) {
              this.sound.play("click");
            }
            consejoIndex++;
            this.image.destroy();
            this.image = null;
            this.mostrarSiguienteConsejo();
          });
        }
      } else {
        this.image.destroy();
        this.image = null;
        consejoIndex = 0;
      }
    });
    
    this.mostrarSiguienteConsejo = () => {
      if (consejoIndex < consejos.length) {
        consejoActual = consejos[consejoIndex];
        this.image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, consejoActual);
        this.image.setScale(0.5);
        this.image.setDepth(2);

        this.image.setInteractive();
        this.image.on("pointerdown", () => {
          if (this.sonidosActivados) {
            this.sound.play("click");
          }
          consejoIndex++;
          this.image.destroy();
          this.image = null;
          this.mostrarSiguienteConsejo();
        });
      } else {
        consejoIndex = 0;
      }
    };

    const spawnPointMusica = map.findObject("objetos", (obj) => obj.name === "musica");
    this.musica = this.physics.add.sprite(spawnPointMusica.x, spawnPointMusica.y, "icono musica").setScale(0.7);
    this.musica.setScrollFactor(0);
    this.musica.body.allowGravity = false;
    this.musica.setDepth(2);
    this.musica.setInteractive(); 
    this.musica.on("pointerdown", () => {
      if (this.sonidosActivados) {
      this.sound.play("click");
    }
      if (this.game.music.isPlaying) {
        this.game.music.pause();
      } else {
        this.game.music.resume();
      }
    });

    const spawnPointSonido = map.findObject("objetos", (obj) => obj.name === "sonido");
    this.sonido = this.physics.add.sprite(spawnPointSonido.x, spawnPointSonido.y, "icono sonido").setScale(0.7);
    this.sonido.setScrollFactor(0);
    this.sonido.body.allowGravity = false;
    this.sonido.setDepth(2);
    this.sonido.setInteractive(); 
    this.sonido.on("pointerdown", () => {
      // Invertir el estado de los sonidos
      this.sonidosActivados = !this.sonidosActivados;
      this.sound.play("click");
    });

    // Imagen para que el jugador sepa que junto el pico
    this.imagenPicoRecogido = this.add.image(game.config.width - 20, game.config.height - 20, 'pico').setOrigin(1);
    this.imagenPicoRecogido.setVisible(false);
    this.imagenPicoRecogido.setDepth(2);

    // Condición para pasar de nivel
    this.physics.add.overlap(this.jugador, this.salida, this.pasardeNivel, null, this);

    // Configurar la cámara
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.jugador);

    // Configurar los límites del mundo físico
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.jugador.body.setCollideWorldBounds(true);
  }

  update() {
    // Cambiar la visibilidad de la oscuridad al presionar la tecla 'L'
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L))) {
      if (this.luzPuedeEncenderse) {
      this.luzEncendida = !this.luzEncendida; // Cambia el estado de la luz encendida
      
      if (this.sonidosActivados) {
        // Reproducir el sonido
        this.sound.play('encendido');
        this.sound.setVolume(0.1);
      }

      if (this.luzEncendida) {
        this.oscuridad.visible = false; // Apaga la oscuridad
        this.oscuridadActivada = false; // Desactiva la oscuridad
      } else {
        this.oscuridad.visible = true; // Enciende la oscuridad
        this.oscuridadActivada = true; // Activa la oscuridad
      }
    }
  }
  
  // Actualizar el tiempo de luz encendida en cada fotograma
  if (this.luzEncendida) {
    this.tiempoLuzEncendida += this.sys.game.loop.delta;
    const limiteTiempoLuzEncendida = 60; 
    
    if (this.tiempoLuzEncendida >= limiteTiempoLuzEncendida * 1000) {
      this.luzEncendida = false; 
      this.oscuridad.visible = true; 
      this.oscuridadActivada = true; 
      //this.tiempoLuzEncendida = 0; // Reinicia el contador de tiempo
      this.luzPuedeEncenderse = false;
  }
}

    // Actualizar contador
    this.contadorTexto.setText(`Tiempo luz encendida: ${Math.floor(this.tiempoLuzEncendida / 1000)} segundos`);
    // Actualizar la posición de la oscuridad con respecto al jugador en cada fotograma
    this.oscuridad.setPosition(this.jugador.x, this.jugador.y);
    // Actualizar la posición de la imagen de la capa de oscuridad con respecto al jugador
    this.menuImage.setPosition(this.jugador.x, this.jugador.y);

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
      this.jugadorMuereCaida();
    }

    this.cameras.main.scrollY = this.jugador.y - this.cameras.main.height / 2;
  }

  jugadorChocaConPico(jugador, pico) {
    pico.disableBody(true, true);
    this.haRecogidoElPico = true;
    this.imagenPicoRecogido.setVisible(true);
  }

  jugadorChocaConMuro(jugador, muro) {
    if (this.haRecogidoElPico) {
      if (this.sonidosActivados) {
      var sound = this.sound.add('piedras'); 
      sound.setVolume(0.3);
      sound.setRate(2);
      sound.play();
      muro.disableBody(true, true); 
      this.imagenPicoRecogido.setVisible(false);
    }
    } else {
      // El jugador simplemente se detiene al chocar con el muro
      jugador.setVelocityX(0);
      jugador.setVelocityY(0);
    }
  }

  jugadorChocaConPinchos(jugador, pinchos) {
    if (this.sonidosActivados) {
    // Reproducir el sonido de choque con los pinchos
    var sound = this.sound.add('corte');
    sound.setVolume(0.5);
    sound.play();
  }

    // Lógica para la muerte del jugador después de reproducir el sonido
    jugador.setTint(0xff0000); // Cambiar el color del jugador al chocar con los pinchos
    this.time.delayedCall(500, () => {
      jugador.clearTint();
      this.jugadorMuere();
    });
  }

  jugadorMuere() {
    // Lógica para la muerte del jugador
    console.log("¡El jugador murió!");
    this.scene.start("perdiste");
  }

  jugadorMuereCaida() {
    // Lógica para la muerte del jugador
    console.log("¡El jugador murió!");
    this.scene.start("perdiste");
  }

  pasardeNivel() {
    this.scene.start("ganaste");
  }

}