export default class SeleccionNivel extends Phaser.Scene {
    constructor() {
      super("SeleccionNivel");
    }
  
    preload() {
      this.load.image("carrito", "./public/assets/images/carrito.png");
    }
  
    create() {
      const carritoScale = 2; // Escala de tamaño del carrito
      const carritoY = this.scale.height / 2; // Posición Y centrada de los carritos
  
      const carritoX1 = 200; // Posición X del primer carrito
      const carrito1 = this.add.image(carritoX1, carritoY, "carrito").setScale(carritoScale);
  
      const carritoX2 = this.scale.width / 2; // Posición X del segundo carrito
      const carrito2 = this.add.image(carritoX2, carritoY, "carrito").setScale(carritoScale);
  
      const carritoX3 = 600; // Posición X del tercer carrito
      const carrito3 = this.add.image(carritoX3, carritoY, "carrito").setScale(carritoScale);
  
      const style = {
        fontFamily: "Arial",
        fontSize: 40,
        color: "#ffffff",
        fontWeight: "bold",
        stroke: "#000000",
        strokeThickness: 2,
      };
  
      const numero1 = this.add.text(carritoX1, carritoY, "I", style).setOrigin(0.5);
      numero1.setInteractive();
      numero1.on("pointerup", () => {
        this.scene.start("Nivel1");
      });
  
      const numero2 = this.add.text(carritoX2, carritoY, "II", style).setOrigin(0.5);
      numero2.setInteractive();
      numero2.on("pointerup", () => {
        this.scene.start("Nivel2");
      });
  
      const numero3 = this.add.text(carritoX3, carritoY, "III", style).setOrigin(0.5);
      numero3.setInteractive();
      numero3.on("pointerup", () => {
        this.scene.start("Nivel3");
      });
    }
  }
  
  