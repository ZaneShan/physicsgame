class intro extends Phaser.Scene {
    constructor() {
      super('intro');
    }
  
    create() {
        this.cameras.main.setBackgroundColor('#00000');
    
        const title = this.add.text(0, 0, '', {
            font: 'bold 100px Arial Black',
            fill: '#ffffff',
        });
        title.setOrigin(0.5, 1.2);
        title.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    
        const subtitle = this.add.text(0, 0, '', {
            font: 'bold 50px Arial Black',
            fill: '#ffffff',
        });
        subtitle.setOrigin(0.5, 0.5);
        subtitle.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    
        const texts = ["Left and right arrowkeys to move", "Up arrowkey to jump"];
        const run = ["Run."];
        let currentIndex = -1;
    
        const showNextText = () => {
            currentIndex++;
            if (currentIndex === texts.length) {
                return; // Break out of the function when all texts have been shown
            }
    
            // Show the next text
            const currentText = texts[currentIndex];
            title.setText(currentText);
            subtitle.setText('');
    
            // Fade in the current text
            this.tweens.add({
                targets: title,
                alpha: 1,
                duration: 3000,
                ease: 'Power1',
                onComplete: () => {
                    // Fade out the current text
                    this.tweens.add({
                        targets: title,
                        alpha: 0,
                        duration: 3000,
                        ease: 'Power1',
                        onComplete: showNextText,
                    });
                }
            });
        }
        this.time.delayedCall(12000, () => {
            title.setText(run[0]);
            // Show the last text ("Run.")
            this.tweens.add({
                targets: title,
                alpha: 1,
                duration: 3000,
                ease: 'Power1',
            });

            title.setInteractive();
            title.on('pointerover', () => {
                this.tweens.add({
                targets: title,
                scale: 1.2,
                duration: 200,
                ease: 'Power1',
                });
            });

            title.on('pointerout', () => {
                this.tweens.add({
                targets: title,
                scale: 1,
                duration: 200,
                ease: 'Power1',
                });
            });

            title.on('pointerdown', () => {
                this.tweens.add({
                    targets: title,
                    scaleX: 0.9,
                    scaleY: 0.9,
                    duration: 50,
                    yoyo: true,
                    ease: 'Power1',
                    onComplete: () => {
                        this.cameras.main.fade(1000, 0, 0, 0);
                        this.time.delayedCall(1000, () => this.scene.start('start'));
                    },
                });
            });
    });

    showNextText();
    }
}
  
class start extends Phaser.Scene {
    constructor() {
        super('start')
    }
    preload() {
        this.load.image('ground', 'assets/floor.png');
        this.load.image('player', 'assets/player.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('0x000000');
        //stat counter
        let playerscore = 0;
        //time counter.
        const counter = this.add.text(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2 - 400, "3", {
            font: 'bold 300px Arial',
            fill: "#262626",
        });

        // Count down from 5 to 0
        let count = 3;
        const timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                // Pulsate effect
                this.tweens.add({
                    targets: counter,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 250,
                    yoyo: true,
                });
                counter.text = count;
                count--;
                if (count < 0) {
                    timer.remove();
                    this.scene.start('sum', {
                        id: 'start2',
                        score: playerscore
                    });
                }
            },
            loop: true,
        });

        const platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 500; i++) {
            platforms.create(Math.random() * 2000, 1000, 'ground');
          }

        this.player = this.physics.add.sprite(this.cameras.main.width / 2, 850, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(20, 20);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, platforms);

    }

    update ()
    {
        const { left, right, up } = this.cursors;

        if (left.isDown)
        {
            this.player.setVelocityX(-400);
        }
        else if (right.isDown)
        {
            this.player.setVelocityX(400);
        }
        else
        {
            this.player.setVelocityX(0);
        }
        if (up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-500);
        }

    }
}

class start2 extends Phaser.Scene {
    constructor() {
        super('start2')
    }
    preload() {
        this.load.image('ground', 'assets/floor.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('obstacle', 'assets/obstacle.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('0x000000');
        //stat counter
        let playerscore = 0;
        //time counter.
        const counter = this.add.text(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2 - 400, "10", {
            font: 'bold 300px Arial',
            fill: "#262626",
        });

        let count = 10;
        const timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                // Pulsate effect
                this.tweens.add({
                    targets: counter,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 250,
                    yoyo: true,
                });
                counter.text = count;
                count--;
                if (count < 0) {
                    timer.remove();
                    this.scene.start('sum', {
                        id: 'start3', 
                        score: playerscore
                    });
                }
            },
            loop: true,
        });

        const platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 500; i++) {
            platforms.create(Math.random() * 2000, 1000, 'ground');
          }

        this.player = this.physics.add.sprite(this.cameras.main.width / 2, 850, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(20, 20);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, platforms);

        // obstacles
        this.blocks = this.physics.add.group({
            allowGravity: false
        });

        // shoot timer
        this.time.addEvent({
            delay: Phaser.Math.Between(1500, 2000), // Random delay 
            callback: () => {
                const block = this.blocks.create(this.cameras.main.width, Phaser.Math.Between(500, 1050), 'obstacle');
                block.setVelocityX(-500);
            },
            loop: true,
        });

        // block collision
        this.physics.add.collider(this.player, this.blocks, (player, block) => {
            block.destroy(); 
            playerscore--; 
        });

    }

    update ()
    {
        const { left, right, up } = this.cursors;

        if (left.isDown)
        {
            this.player.setVelocityX(-400);
        }
        else if (right.isDown)
        {
            this.player.setVelocityX(400);
        }
        else
        {
            this.player.setVelocityX(0);
        }
        if (up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-500);
        }

    }
}

class start3 extends Phaser.Scene {
    constructor() {
        super('start3')
    }
    preload() {
        this.load.image('ground', 'assets/floor.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('obstacle', 'assets/obstacle.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('0x000000');
        //stat counter
        let playerscore = 0;
        //time counter.
        const counter = this.add.text(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2 - 400, "15", {
            font: 'bold 300px Arial',
            fill: "#262626",
        });

        // Count down from 5 to 0
        let count = 15;
        const timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                // Pulsate effect
                this.tweens.add({
                    targets: counter,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 250,
                    yoyo: true,
                });
                counter.text = count;
                count--;
                if (count < 0) {
                    timer.remove();
                    this.scene.start('sum', {
                        id: 'end', 
                        score: playerscore
                    });
                }
            },
            loop: true,
        });

        const platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 500; i++) {
            platforms.create(Math.random() * 2000, 1000, 'ground');
          }

        this.player = this.physics.add.sprite(this.cameras.main.width / 2, 850, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(20, 20);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, platforms);

        // obstacles
        this.blocks = this.physics.add.group({
            allowGravity: false
        });

        // shoot timer
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 2000), // Random delay 
            callback: () => {
                const block = this.blocks.create(this.cameras.main.width, Phaser.Math.Between(500, 1050), 'obstacle');
                block.setVelocityX(-700);
            },
            loop: true,
        });

        // block collision
        this.physics.add.collider(this.player, this.blocks, (player, block) => {
            block.destroy(); 
            playerscore--; 
        });

    }

    update ()
    {
        const { left, right, up } = this.cursors;

        if (left.isDown)
        {
            this.player.setVelocityX(-400);
        }
        else if (right.isDown)
        {
            this.player.setVelocityX(400);
        }
        else
        {
            this.player.setVelocityX(0);
        }
        if (up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-500);
        }

    }
}

class sum extends Phaser.Scene {
    constructor() {
        super('sum');
    }
    init (data) {
        console.log('init', data);
        this.level = data.id
        this.finalScore = data.score;
    }
    create() {
        this.cameras.main.setBackgroundColor('#0x000000');

        const score = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `Score: ${this.finalScore}`, {
            font: 'bold 100px Arial',
            fill: '#262626',
        });
        score.setOrigin(0.5, 0.8);
        score.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2 - 200);

        const cont = this.add.text(0, 0, 'Next Stage', {
            font: 'bold 50px Arial Black',
            fill: '#262626',
        });
        cont.setOrigin(0.5, 1.0);
        cont.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
        cont.setInteractive();
        cont.on('pointerover', () => {
            this.tweens.add({
            targets: cont,
            scale: 1.2,
            duration: 200,
            ease: 'Power1',
            });
        });
        cont.on('pointerout', () => {
            this.tweens.add({
            targets: cont,
            scale: 1,
            duration: 200,
            ease: 'Power1',
            });
        });
        cont.on('pointerdown', () => {
            this.tweens.add({
                targets: cont,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 50,
                yoyo: true,
                ease: 'Power1',
                onComplete: () => {
                    this.cameras.main.fade(1000, 0, 0, 0);
                    this.time.delayedCall(1000, () => this.scene.start(`${this.level}`));
                },
            });
        });
    }
}

class end extends Phaser.Scene {
    constructor() {
        super('end');
    }
    create() {
        this.add.text(50, 50, "You Win!").setFontSize(50);
        this.add.text(50, 1000, "Play Again?").setFontSize(100);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [intro, start, start2, start3, sum, end],
    title: "Runner",
    background: "#00000",
});

