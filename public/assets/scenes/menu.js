export default class Menu extends Phaser.Scene {
    constructor() {
      super("menu");
    }
  
    preload() {
      this.load.image("Menu", "./public/assets/images/Menu.png");
    }
  
    create() {
      const menuImage = this.add.image(0, this.scale.height / 2, "Menu").setOrigin(0, 0.5);
      menuImage.setScale(2.5);
      menuImage.x = 30;
  
      const text = this.add.text(1200, this.scale.height / 2, "JUGAR", {
        fontFamily: "Arial",
        fontSize: 150,
        color: "#ffffff",
        fontStyle: "bold",
      });
      text.setOrigin(0.5);
      text.setInteractive(); // Habilitar interactividad
  
      text.on("pointerup", () => {
        this.scene.start("SeleccionNivel"); // Redirigir a otra escena al hacer clic
      });
    }
  }
  
  
  