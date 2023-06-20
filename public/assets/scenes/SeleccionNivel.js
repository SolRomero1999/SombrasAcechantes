export default class SeleccionNivel extends Phaser.Scene {
  constructor() {
    super("SeleccionNivel");
  }

  create() {
    const carritoY = this.scale.height / 2; // Posición Y centrada de los carritos

    const carritoX1 = this.scale.width / 4; // Posición X del primer carrito
    const carrito1 = this.add.image(carritoX1, carritoY, "carrito1").setScale(1);
    carrito1.setInteractive();
    carrito1.on("pointerup", () => {
      this.scene.start("nivel1");
    });

    const carritoX2 = this.scale.width / 2; // Posición X del segundo carrito
    const carrito2 = this.add.image(carritoX2, carritoY, "carrito2").setScale(1);
    carrito2.setInteractive();
    carrito2.on("pointerup", () => {
      this.scene.start("nivel2");
    });

    const carritoX3 = (this.scale.width * 3) / 4; // Posición X del tercer carrito
    const carrito3 = this.add.image(carritoX3, carritoY, "carrito3").setScale(1);
    carrito3.setInteractive();
    carrito3.on("pointerup", () => {
      this.scene.start("nivel3");
    });
  }
}
