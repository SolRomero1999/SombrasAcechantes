export default class Ganaste extends Phaser.Scene {
  constructor() {
    super("ganaste");
  }

  create() {
    // Obtener referencia al objeto de música de la escena anterior
    this.game.music = this.sound.get("musica");

    // Reanuda la música si ya se estaba reproduciendo en la escena anterior
    if (this.game.music && !this.game.music.isPlaying) {
      this.game.music.play();
    }
    
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
