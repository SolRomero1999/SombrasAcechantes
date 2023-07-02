export default class Perdiste extends Phaser.Scene {
  constructor() {
    super("perdiste");
  }

  create() {
    // Detén la música del menú si se estaba reproduciendo
    if (this.game.menuMusic && this.game.menuMusic.isPlaying) {
      this.game.menuMusic.stop();
    }

    // Carga el archivo de música adicional
    this.musicPerdiste = this.sound.add("susurros");

    // Reproduce la música en bucle
    this.musicPerdiste.play({ loop: true });

    const menuImage = this.add.image(10, this.scale.height / 2, "perdiste").setOrigin(0, 0.5);
    menuImage.setScale(1);

    // Agregar evento de teclado para reiniciar la escena anterior al presionar la tecla "R"
    this.input.keyboard.on('keydown-R', () => {
      this.sound.play("click");
      this.musicPerdiste.stop(); // Detiene la música de "perdiste" antes de cambiar de escena
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

