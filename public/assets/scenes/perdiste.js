export default class Perdiste extends Phaser.Scene {
  constructor() {
    super("perdiste");
  }

  create() {
    // Obtener referencia al objeto de música de la escena anterior
    this.game.music = this.sound.get("musica");

    // Reanuda la música si ya se estaba reproduciendo en la escena anterior
    if (this.game.music && !this.game.music.isPlaying) {
      this.game.music.play();
    }

    const menuImage = this.add.image(10, this.scale.height / 2, "perdiste").setOrigin(0, 0.5);
    menuImage.setScale(1);

    // Agregar evento de teclado para reiniciar la escena anterior al presionar la tecla "R"
    this.input.keyboard.on('keydown-R', () => {
      this.sound.play("click");
      this.scene.start(this.scene.settings.data.escenaAnterior);
    });

    // Agregar el texto para reintentar en pantalla
    this.addRetryText();
  }

  addRetryText() {
    const retryText = this.add.text(this.scale.width - 30, this.scale.height - 30, "R para reintentar", {
      fontFamily: "Arial",
      fontSize: "50px",
      fill: "#ffffff",
    }).setOrigin(1);
  }
}

