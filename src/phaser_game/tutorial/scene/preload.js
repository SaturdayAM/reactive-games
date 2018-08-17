export default function preload(){
    this.load.image('sky', 'tutorialAssets/sky.png');
    this.load.image('ground', 'tutorialAssets/platform.png');
    this.load.image('star', 'tutorialAssets/star.png');
    this.load.image('bomb', 'tutorialAssets/bomb.png');
    this.load.spritesheet('dude', 
        'tutorialAssets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}