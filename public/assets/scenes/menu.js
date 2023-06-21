export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
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