var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('hexmini', 'assets/hexmini.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/hexagonal-mini.json');
    console.log("Preload");
}

function create ()
{
    console.log("Create");
    this.map = this.add.tilemap('tilemap');
    this.map.addTilesetImage('hex mini', 'hexmini');
    this.groundLayer = this.map.createLayer("Ground", ["hex mini"], 0, 0);
}

function update ()
{
    this.input.on('pointermove', (pointer) => {
        var tile = this.groundLayer.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY);
        if (tile) {
            var regularTint = tile.tint;
            if (this.selectedTile) {
                this.selectedTile.tint = regularTint;
            }
            this.selectedTile = tile;
            this.selectedTile.tint = 0xff0000;
        }
    });
}