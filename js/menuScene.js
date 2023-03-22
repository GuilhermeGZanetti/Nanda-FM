export default class menuScene extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  init(){
  }

  preload() {
    this.load.image("menu", 'assets/black_bg.jpg');
    this.load.image("logo", "assets/NandaFM_logo.png")
    this.load.image("btn_tempo", 'assets/button_o_tempo.png');
    this.load.image("btn_american", 'assets/button_american.png');
    this.load.image("btn_bulletproof", 'assets/button_bulletproof.png');
    this.load.image("btn_mind", 'assets/button_mind.png');
  }

  create() {
    // Add the menu image
    this.add.image(650, 350, "menu").setScale(0.35);
    //Add logo
    this.add.image(650, 100, 'logo').setScale(0.8);
    // Add the music buttons
    let btn_tempo = this.add.image(450, 300, "btn_tempo").setInteractive({ cursor: 'pointer' });
    let btn_american = this.add.image(850, 300, "btn_american").setInteractive({ cursor: 'pointer' });
    let btn_bulletproof = this.add.image(450, 500, "btn_bulletproof").setInteractive({ cursor: 'pointer' });
    let btn_mind = this.add.image(850, 500, "btn_mind").setInteractive({ cursor: 'pointer' });

    btn_tempo.on('pointerdown', ()=>{
      this.removeCache();
      this.scene.start("gameScene", 1);
      this.scene.stop();
    });

    btn_american.on('pointerdown', ()=>{
      this.removeCache();
      this.scene.start("gameScene", 2);
      this.scene.stop();
    });

    btn_bulletproof.on('pointerdown', ()=>{
      this.removeCache();
      this.scene.start("gameScene", 3);
      this.scene.stop();
    });

    btn_mind.on('pointerdown', ()=>{
      this.removeCache();
      this.scene.start("gameScene", 4);
      this.scene.stop();
    });
  }

  removeCache(){
    for(let type in this.cache) {
			console.log(type)

			if (type != 'game') {
				for (let entry in this.cache[type]) {
					this.cache[type].remove(entry);
				}
			}
		}
  }

  static Unload(scene, data)
  {
    
    /*Animations are loaded from JSON files that are linked to spritesheets, however
      We don't want to be too picky about the order in which things are unloaded
      so we can't guarantee those JSON files will still exist. Thus we need to get
      the animation data from the scene so we can figure out which ones need to be
      removed.*/
    var animationData = scene.anims.toJSON().anims;
    
    for(var i = 0; i < data.length; i++)
    {
      
      switch (data[i].type)
      {
        
        case "image":
          //Unload Images by removing from the textures cache
          scene.textures.remove(data[i].id); 
          break;
        
        case "spritesheet":
          //Spritesheets are composed of a texture and animation data, so we need to remove the texture
          scene.textures.remove(data[i].id); 

          //Pick out which animations correspond to this spritesheet so we can remove them
          var animations = animationData.filter(function(val)
          {
            
            /*Our naming convention is that Spritesheet "Key" is given animations
              with keys matching the format "Key-AnimationName". Therefore if we
              remove that spritesheet, we remove all of the animations corresponding
              to it. If your naming convention is different, then modify as necessary.*/
            return (val.key.indexOf(data[i].id + "-") == 0);
            
          });
          
          for(var j = 0; j < animations.length; j++)
          {
            
            scene.anims.remove(animations[j].key);
            
          }
          
          break;
        
        case "json":
          //The cache member of a scene has a bunch of subcaches for most other assets, so remove from there as necessary
          scene.cache.json.remove(data[i].id); 
          break;
        
        case "sound":
          scene.cache.audio.remove(data[i].id);
          break;
        
        case "music":
          scene.cache.audio.remove(data[i].id);
          break;
        
      }
      
    }
    
  }
}
