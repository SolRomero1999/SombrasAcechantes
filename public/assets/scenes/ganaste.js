export default class Ganaste extends Phaser.Scene {
  constructor() {
    super("ganaste");
  }

  create() {
    const menuImage = this.add.image(10, this.scale.height / 2, "ganaste").setOrigin(0, 0.5);
    menuImage.setScale(1);

    this.addRetryText();

    this.input.keyboard.on('keydown-ENTER', () => {
      this.sound.play("click");
      // Cambiar a la escena deseada
      this.scene.start("menu");
    });
  }

  addRetryText() {
    const retryText = this.add.text(this.scale.width - 30, this.scale.height - 30, "ENTER para volver", {
      fontFamily: "Arial",
      fontSize: "50px",
      fill: "#ffffff",
    }).setOrigin(1);
  }
}
