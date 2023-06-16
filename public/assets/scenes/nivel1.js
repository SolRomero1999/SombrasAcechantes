export default class nivel1 extends Phaser.Scene {
  constructor() {
    super("nivel1");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    // Cargar las capas de tiles: fondo y plataformas
    const capaFondo = map.addTilesetImage("fondo", "tilesFondo");
    const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");
    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const plataformaLayer = map.createLayer("plataformas", capaPlataformas, 0, 0);

    const objectosLayer = map.getObjectLayer("objetos");
    plataformaLayer.setCollisionByProperty({ colision: true });

    // Crear al jugador
    const spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);
    this.jugador.setScale(0.2);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crear la salida
    const spawnPointSalida = map.findObject("objetos", (obj) => obj.name === "salida");
    this.salida = this.physics.add.sprite(spawnPointSalida.x, spawnPointSalida.y, "salida").setScale(1.8);
    this.physics.add.collider(this.jugador, plataformaLayer);
    this.physics.add.collider(this.salida, plataformaLayer);

    // Crear el carrito
    const spawnPointCarrito = map.findObject("objetos", (obj) => obj.name === "carrito");
    this.Carrito = this.physics.add.sprite(spawnPointCarrito.x, spawnPointCarrito.y, "carrito").setScale(1);
    this.physics.add.collider(this.Carrito, plataformaLayer);
    this.physics.add.collider(this.jugador, this.Carrito);

    // Habilitar el sistema de físicas para el carrito
  this.physics.world.enable(this.Carrito);

    // Establecer las propiedades físicas del carrito
  this.Carrito.body.setMass(4);  // Aumentar la masa para hacerlo más pesado
  this.Carrito.body.setFriction(3);  // Aumentar la fricción para hacerlo más difícil de mover
  }

  update() {
    if (this.cursors.left.isDown) {
      // Ajustar la velocidad horizontal para un salto lateral constante
      this.jugador.setVelocityX(-160);
      this.jugador.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      // Ajustar la velocidad horizontal para un salto lateral constante
      this.jugador.setVelocityX(160);
      this.jugador.anims.play("right", true);
    } else {
      this.jugador.setVelocityX(0);
      this.jugador.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
      // Ajustar la velocidad vertical para un salto más alto
      this.jugador.setVelocityY(-140); // Ajusta este valor para aumentar la altura del salto
    }
  }
}