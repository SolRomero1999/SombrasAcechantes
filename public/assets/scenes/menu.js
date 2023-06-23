export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
    // Detén la música de "perdiste" si se estaba reproduciendo
    if (this.game.musicPerdiste && this.game.musicPerdiste.isPlaying) {
      this.game.musicPerdiste.stop();
    }

    // Carga el archivo de música del menú si aún no se ha cargado
    if (!this.game.menuMusic || !this.game.menuMusic.isPlaying) {
      this.game.menuMusic = this.sound.add("musica");
      this.game.menuMusic.setVolume(0.5);
      this.game.menuMusic.play({ loop: true });
    }

    const menuImage = this.add.image(10, this.scale.height / 2, "Menu").setOrigin(0, 0.5);
    menuImage.setScale(1);

    const text = this.add.text(1200, this.scale.height / 2, "JUGAR", {
      fontFamily: "Arial",
      fontSize: 150,
      color: "#ffffff",
      fontStyle: "bold",
    });
    text.setOrigin(0.5);
    text.setInteractive();
    text.on("pointerup", () => {
      this.sound.play("click");
      this.scene.start("SeleccionNivel");
    });
  }
}