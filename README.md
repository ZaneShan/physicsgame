Link to game: https://zaneshan.github.io/physicsgame/

Code requirements:
    * The game uses both continuous and discrete inputs from the player
- Continous: movement of left to right
- Discrete: Jumping

    * The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact).
- Objects will fly at the player, and the player must not make collision with those objects. Touching an object will cause you to receive a negative score.

    * 3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass).
- 3 scenes of varying difficulty with the same premise are included.

    * Other scenes are used to separate and contextualize the gameplay scenes
- There is an intro tutorial with a start button, and an outro for when all 3 scenes are completed. The outro has an option to start from the beginning.

Asset sources:
- Since it was difficult to apply physics to rendered objects, I decided to use photoshop to create some basic shapes, which I added into the asset folder.

Code sources:
- https://labs.phaser.io/edit.html?src=src/physics/arcade/body%20on%20a%20path.js
    offered a skeleton of basic controls and character physics which I worked off of
- https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cpassing%20data%20to%20a%20scene.js
    demonstrated how to pass data into the scene. This was crucial for getting my scoreboard to work, as I needed to transition between scenes and maintain the score data.