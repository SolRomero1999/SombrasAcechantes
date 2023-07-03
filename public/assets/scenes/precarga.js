export default class Precarga extends Phaser.Scene {
  constructor() {
    super("precarga");
  }

  preload() {
    // RECURSOS MENU
    this.load.image("Menu", "./public/assets/images/Menu.png");

    // RECURSOS SELECCIÓN DE NIVEL
    this.load.image("carrito1", "./public/assets/images/carrito1.png");
    this.load.image("carrito2", "./public/assets/images/carrito2.png");
    this.load.image("carrito3", "./public/assets/images/carrito3.png");

    // SONIDO

    this.load.audio('click', './public/assets/musica/click.mp3');
    this.load.audio('carrito', './public/assets/musica/carrito.mp3');
    this.load.audio('corte', './public/assets/musica/corte.mp3');
    this.load.audio('encendido', './public/assets/musica/encendido.mp3');
    this.load.audio('latidos', './public/assets/musica/latidos.mp3');
    this.load.audio('musica', './public/assets/musica/musica.mp3');
    this.load.audio('piedras', './public/assets/musica/piedras.mp3');
    this.load.audio('salto', './public/assets/musica/salto.mp3');
    this.load.audio('susurros', './public/assets/musica/susurros.mp3');

    // RECURSOS 1° NIVEL
    this.load.tilemapTiledJSON("map", "./public/tilemaps/nivel1.json");
    this.load.image("tilesFondo", "./public/assets/images/fondo.png");
    this.load.image("tilesPlataforma", "./public/assets/images/platform.png");
    this.load.image("salida", "./public/assets/images/salida.png");
    this.load.image("carrito", "./public/assets/images/carrito.png");
    this.load.image("muro", "./public/assets/images/muro.png");
    this.load.image("pico", "./public/assets/images/pico.png");
    this.load.image("pinchos", "./public/assets/images/pinchos.png");
    this.load.image("icono menu", "./public/assets/images/icono menu.png");
    this.load.image("icono ayuda", "./public/assets/images/icono ayuda.png");
    this.load.image("icono musica", "./public/assets/images/icono musica.png");
    this.load.image("icono sonido", "./public/assets/images/icono sonido.png");
    this.load.image("consejo1", "./public/assets/images/consejo1.png");
    this.load.image("consejo2", "./public/assets/images/consejo2.png");
    this.load.image("consejo3", "./public/assets/images/consejo3.png");
    this.load.image("consejo4", "./public/assets/images/consejo4.png");
    this.load.image("consejo5", "./public/assets/images/consejo5.png");
    this.load.image("flecha", "./public/assets/images/flecha.png");
    this.load.image("oscuridadfija", "./public/assets/images/fijo.png");
    this.load.spritesheet("salto", "./public/assets/images/salto.png", {
      frameWidth: 397,
      frameHeight: 465,
    });
    this.load.spritesheet("saltoluz", "./public/assets/images/saltoluz.png", {
      frameWidth: 374,
      frameHeight: 465,
    });
    this.load.spritesheet("caida", "./public/assets/images/caida.png", {
      frameWidth: 353,
      frameHeight: 411,
    });
    this.load.spritesheet("dude", "./public/assets/images/personaje.png", {
      frameWidth: 353,
      frameHeight: 438,
    });
    this.load.spritesheet("dudeluz", "./public/assets/images/personajeluz.png", {
      frameWidth: 353,
      frameHeight: 438,
    });

    // RECURSOS 2° NIVEL
    this.load.tilemapTiledJSON("map2", "./public/tilemaps/nivel2.json");

    // RECURSOS 3° NIVEL
    this.load.tilemapTiledJSON("map3", "./public/tilemaps/nivel3.json");

    //RECURSOS PERDIDA Y GANADA
    this.load.image("perdiste", "./public/assets/images/perdiste.png");
    this.load.image("ganaste", "./public/assets/images/ganaste.png");
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
      frames: this.anims.generateFrameNumbers('salto', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump-right',
      frames: this.anims.generateFrameNumbers('salto', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    

    this.anims.create({
      key: 'jump-left-L',
      frames: this.anims.generateFrameNumbers('saltoluz', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump-right-L',
      frames: this.anims.generateFrameNumbers('saltoluz', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });


    this.anims.create({
      key: 'caida',
      frames: this.anims.generateFrameNumbers('caida', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    // Iniciar escena "menu"
    this.scene.start("menu");
  }
}
