GAMEMODEL.update = function() {
    if(this.gameCamera != null && this.gameSession.gamePlayer != null) {

        this.gameCamera.updatePosition( {x:this.gameSession.gamePlayer.absPosition.x,y:this.gameCamera.position.y} );
    }
};
GAMEMODEL.readInput = function(inputobj)
{
    if(this.gameCamera != null)
    {
        var keyids = GAMECONTROL.keyIDs;    

        if(keyids['KEY_SQUAREBR_RIGHT'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      GAMEMUSIC.volumeUp();           
        }
        if(keyids['KEY_SQUAREBR_LEFT'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      GAMEMUSIC.volumeDown();         
        }
        if(keyids['KEY_M'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      
            {
                if(GAMEMUSIC.mute)    GAMEMUSIC.mute=false;
                else {
                    GAMEMUSIC.mute=true;
                    var player = GAMEMODEL.gameSession.gamePlayer;
                    for(var i=0; i<10;i++) {
                        if(typeof player.playingSounds[i] !== "undefined") {
                //          console.log('this '+this.speed+' num '+num+' i '+i +' newsound '+newsound);
                            if(player.playingSounds[i].source)        player.playingSounds[i].source.stop();
                            delete player.playingSounds[i];
                        }
                    }   
                }
            }
        }

        if(keyids['KEY_P'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      
            {
                GAMEMODEL.togglePause();

                if(GAMEMUSIC.musicOn)
                {
                    if(this.gameMode === "GAME_PAUSE" && GAMEMUSIC.playing)     GAMEMUSIC.pauseAudio();
                    else if(this.gameMode === "GAME_RUN" && !GAMEMUSIC.playing) GAMEMUSIC.pauseAudio();
                }

            }
        }
    }
};


GAMEMODEL.loadGame = function()
{
    this.gameSession.gameWorld = GameWorld.alloc();
    this.gameSession.gameWorld.load();
    this.gameSession.gameWorld.size = {w:1400,h:750};

    this.gameCamera.position.y = 120;

    var T2 = TileActor.alloc();
    T2.updatePosition({x:0,y:-10});
    T2.setTileGroup(23);
    T2.scrollSpd=0.5;
    this.gameSession.gameWorld.addActor(T2,'act');

    var T = TileActor.alloc();
    T.updatePosition({x:0,y:0});
    T.setTileGroup(21);
    this.gameSession.gameWorld.addActor(T,'act');

    var Tx0 = TextActor.alloc();
    Tx0.fontSize = 28;
    Tx0.text = "YOU ARE THE TRUCK";
    Tx0.updatePosition({x:550,y:50});
    this.gameSession.gameWorld.addActor(Tx0,'act');
    var Tx1 = TextActor.alloc();
    Tx1.text = "Up and Down to change lanes";
    Tx1.updatePosition({x:1550,y:50});
    this.gameSession.gameWorld.addActor(Tx1,'act');
    var Tx2 = TextActor.alloc();
    Tx2.text = "Left and right for speed";
    Tx2.updatePosition({x:2550,y:50});
    this.gameSession.gameWorld.addActor(Tx2,'act');
    var Tx3 = TextActor.alloc();
    Tx3.text = "[ and ] adjust volume, and M to mute. P to pause!";
    Tx3.updatePosition({x:3550,y:50});
    this.gameSession.gameWorld.addActor(Tx3,'act');

    var Tx4 = TextActor.alloc();
    Tx4.text = "Avoid cinderblocks!";
    Tx4.updatePosition({x:4800,y:50});
    this.gameSession.gameWorld.addActor(Tx4,'act');


    
    var C = CharActor.alloc();
    GAMEMODEL.gameSession.gameWorld.putInLane(C,200,2);
    this.gameSession.gameWorld.addActor(C,'act');
    this.gameSession.gameWorld.gamePlayer = C;

    var B1 = BlockActor.alloc();
    GAMEMODEL.gameSession.gameWorld.putInLane(B1,2400,1);
    this.gameSession.gameWorld.addActor(B1,'act');
    var B2 = BlockActor.alloc();
    B2.carLook=2;
    GAMEMODEL.gameSession.gameWorld.putInLane(B2,3400,2);
    this.gameSession.gameWorld.addActor(B2,'act');
    var B3 = BlockActor.alloc();
    B3.carLook=2;
    GAMEMODEL.gameSession.gameWorld.putInLane(B3,3600,1);
    this.gameSession.gameWorld.addActor(B3,'act');

    var O1 = OilActor.alloc();
    GAMEMODEL.gameSession.gameWorld.putInLane(O1,2400,0);
    this.gameSession.gameWorld.addActor(O1,'act');
    var O2 = OilActor.alloc();
    GAMEMODEL.gameSession.gameWorld.putInLane(O2,3000,2);
    this.gameSession.gameWorld.addActor(O2,'act');
    var O3 = OilActor.alloc();
    GAMEMODEL.gameSession.gameWorld.putInLane(O3,3500,0);
    this.gameSession.gameWorld.addActor(O3,'act');

    var C2 = CinderActor.alloc();
    GAMEMODEL.gameSession.gameWorld.putInLane(C2,5000,0);
    this.gameSession.gameWorld.addActor(C2,'act');

    var D = DropperActor.alloc();
    GAMEMODEL.gameSession.gameWorld.putInLane(D,2500,1);
    this.gameSession.gameWorld.addActor(D,'act');


    this.gameSession.gamePlayer = this.gameSession.gameWorld.gamePlayer;

    var actlist = this.gameSession.gameWorld.gameActors;
    for(var i in actlist) {
        var A = actlist[i];
//        if(A instanceof CinderActor)   console.log('drop cinder '+A.position.x+' '+A.lane+' id '+A.ranID);
//        if(A instanceof OilActor)    console.log('drop oil '+A.position.x+' '+A.lane+' id '+A.ranID);
//        if(A instanceof BlockActor)   console.log('drop car '+A.position.x+' '+A.lane+' id '+A.ranID);
    }

    console.log('loaded game');

};


