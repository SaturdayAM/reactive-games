export default function preload(){
    this.load.image('sky', 'WatchYourBaconAssets/sky.png');
    this.load.image('ground', 'WatchYourBaconAssets/platform.png');
    this.load.image('star', 'WatchYourBaconAssets/star.png');
    this.load.image('bomb', 'WatchYourBaconAssets/bomb.png');
    this.load.spritesheet('dude', 
        'WatchYourBaconAssets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}