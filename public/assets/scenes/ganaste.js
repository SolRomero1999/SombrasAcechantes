export default class ganaste extends Phaser.Scene {
    constructor() {
      super("ganaste");
    }
  
    create() {
      const menuImage = this.add.image(10, this.scale.height / 2, "ganaste").setOrigin(0, 0.5);
      menuImage.setScale(1);
  
      // Agregar el texto "volver" después de tres segundos
      this.time.delayedCall(3000, this.addRetryText, [], this);
    }
  
    addRetryText() {
      const retryText = this.add.text(this.scale.width - 30, this.scale.height - 30, "volver", {
        fontFamily: "Arial",
        fontSize: "50px",
        fill: "#ffffff"
      }).setOrigin(1, 1).setInteractive();
  
      retryText.on("pointerup", () => {
        this.scene.start("menu"); 
      });
    }
  }