export default class Precarga extends Phaser.Scene {
  constructor() {
    super("precarga");
  }

  preload() {
    // RECURSOS MENU
    this.load.image("Menu", "./public/assets/images/Menu.png");

    // RECURSOS SELECCIÓN DE NIVEL
    this.load.image("carrito", "./public/assets/images/carrito.png");

    // RECURSOS 1° NIVEL
    this.load.tilemapTiledJSON("map", "./public/tilemaps/nivel1.json");
    this.load.image("tilesFondo", "./public/assets/images/fondo.png");
    this.load.image("tilesPlataforma", "./public/assets/images/platform.png");
    this.load.image("salida", "./public/assets/images/salida.png");
    this.load.image("muro", "./public/assets/images/muro.png");
    this.load.image("pico", "./public/assets/images/pico.png");
    this.load.image("pinchos", "./public/assets/images/pinchos.png");
    this.load.image("icono menu", "./public/assets/images/icono menu.png");
    this.load.image("icono ayuda", "./public/assets/images/icono ayuda.png");
    this.load.image("icono musica", "./public/assets/images/icono musica.png");
    this.load.image("icono sonido", "./public/assets/images/icono sonido.png");
    this.load.spritesheet("salto", "./public/assets/images/salto.png", {
      frameWidth: 340,
      frameHeight: 438,
    });
    this.load.spritesheet("dude", "./public/assets/images/personaje.png", {
      frameWidth: 353,
      frameHeight: 438,
    });
    this.load.spritesheet("dudeluz", "./public/assets/images/personajeluz.png", {
      frameWidth: 353,
      frameHeight: 438,
    });
  }

  create() {
    // Animaciones del jugador luz apagada
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animaciones del jugador luz prendida
    this.anims.create({
      key: "left-luzEncendida",
      frames: this.anims.generateFrameNumbers("dudeluz", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn-luzEncendida",
      frames: [{ key: "dudeluz", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right-luzEncendida",
      frames: this.anims.generateFrameNumbers("dudeluz", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animación de salto luz apagada
    this.anims.create({
      key: 'jump-left',
      frames: this.anims.generateFrameNumbers('salto', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'jump-right',
      frames: this.anims.generateFrameNumbers('salto', { start: 5, end: 10 }),
      frameRate: 5,
      repeat: -1
    });

    // Iniciar escena "menu"
    this.scene.start("menu");
  }
}
