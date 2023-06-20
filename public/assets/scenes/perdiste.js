export default class perdiste extends Phaser.Scene {
    constructor() {
      super("perdiste");
    }
  
    create() {
      const menuImage = this.add.image(10, this.scale.height / 2, "perdiste").setOrigin(0, 0.5);
      menuImage.setScale(1);
  
      // Agregar el texto "reintentar" después de tres segundos
      this.time.delayedCall(3000, this.addRetryText, [], this);
    }
  
    addRetryText() {
      const retryText = this.add.text(this.scale.width - 30, this.scale.height - 30, "Reintentar", {
        fontFamily: "Arial",
        fontSize: "50px",
        fill: "#ffffff"
      }).setOrigin(1, 1).setInteractive();
  
      retryText.on("pointerup", () => {
        this.scene.start("menu"); 
      });
    }
  }
  