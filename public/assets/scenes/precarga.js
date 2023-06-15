export default class Precarga extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("precarga");
    }
  
  
    preload() {
        //RECURSOS MENU
        this.load.image("Menu", "./public/assets/images/Menu.png");
        //RECURSOS SELECCIÓN DE NIVEL
        this.load.image("carrito", "./public/assets/images/carrito.png");
        //RECURSOS 1° NIVEL
        this.load.tilemapTiledJSON("map", "./public/tilemaps/nivel1.json");
        this.load.image("tilesFondo", "./public/assets/images/fondo.png");
        this.load.image("tilesPlataforma", "./public/assets/images/platform.png");
        this.load.image("salida", "./public/assets/images/salida.png");
        this.load.spritesheet("dude", "./public/assets/images/personaje.png", {
          frameWidth: 210,
          frameHeight: 378,
        });
      }
  
    create() {
     // Animaciones del jugador: girar a la izquierda, girar a la derecha, quieto
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
  
      // init scene juego
      this.scene.start("menu");
    }

  }