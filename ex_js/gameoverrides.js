GAMEMODEL.update = function() {
    if(this.gameCamera != null && this.gameSession.gamePlayer != null) {
        this.gameCamera.updatePosition( this.gameSession.gamePlayer.absPosition );
    }
};
GAMEMODEL.readInput = function(inputobj)
{
    if(this.gameCamera != null)
    {
        var keyids = GAMECONTROL.keyIDs;    
        if(keyids['KEY_DASH'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      this.gameCamera.zoomOut();
        }
        if(keyids['KEY_EQUALS'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      this.gameCamera.zoomIn();           
        }

        if(keyids['KEY_M'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      GAMEMUSIC.toggleAudio();            
        }
        if(keyids['KEY_N'] == inputobj.keyID)
        {
            keyused = true;
            if(!inputobj.keypress)      GAMEMUSIC.nextAudio();          
        }
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
        if(keyids['KEY_COMMA'] == inputobj.keyID)
        {
            keyused = true;
//          if(!inputobj.keypress)      GAMEMUSIC.filterDown();         
        }
        if(keyids['KEY_PERIOD'] == inputobj.keyID)
        {
            keyused = true;
//          if(!inputobj.keypress)      GAMEMUSIC.filterUp();           
        }

        var playShots = function(type, rounds, interval, random, random2) {
            if (typeof random == 'undefined')   random=0;
            if (typeof random2 == 'undefined')  random2=0;
            var time = GAMEMUSIC.audioContext.currentTime;
            for (var i = 0; i < rounds; i++) {
                var source = GAMESOUNDS.makeSource(type,0.1);
                source.playbackRate.value = 1 + Math.random() * random2;
                source.start(time + i * interval + Math.random() * random);
            }
            
        }
        if(keyids['KEY_1'] == inputobj.keyID) {
            keyused = true;
            if(!inputobj.keypress)      playShots(0,3,0.1);
        }
        if(keyids['KEY_2'] == inputobj.keyID) {
            keyused = true;
            if(!inputobj.keypress)      playShots(1,3,0.1);
        }
        if(keyids['KEY_3'] == inputobj.keyID) {
            keyused = true;
            if(!inputobj.keypress)      playShots(0,10,0.05);
        }

        if(keyids['KEY_4'] == inputobj.keyID) {
            keyused = true;
            if(!inputobj.keypress)      playShots(0, 10, 0.08, 0.05);
        }
        if(keyids['KEY_5'] == inputobj.keyID) {
            keyused = true;
            if(!inputobj.keypress)      playShots(1, 10, 0.08, 0, 1);
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
    /*
    this.gameCamera.displaySize = {w:800,h:600};
    this.gameCamera.baseSize = {w:800,h:600};
    
    
    var area1 = GameArea.alloc();
    area1.size = {w:1400,h:750};
    area1.updatePosition();
    this.gameAreas[0] = area1;
    /**/
    this.gameSession.gameWorld = GameWorld.alloc();
    this.gameSession.gameWorld.load();
    this.gameSession.gameWorld.size = {w:1400,h:750};


    
    var C = CharActor.alloc();
    C.updatePosition({x:200,y:100});

    this.gameSession.gameWorld.addActor(C,'act');
    this.gameSession.gameWorld.gamePlayer = C;

    for(var i=0; i<20; i++)
    {
        var O = OctActor.alloc();
        
            var randX = Math.random()*(this.gameSession.gameWorld.size.w-200) +100;
            var randY = Math.random()*(this.gameSession.gameWorld.size.h-200) +100;

        O.updatePosition({x:randX,y:randY});
    
        this.gameSession.gameWorld.addActor(O,'act');
    }

    this.gameSession.gamePlayer = this.gameSession.gameWorld.gamePlayer;

    console.log('loaded game');
/*
    area1.activeActors.push(C);
    this.gamePlayers[0] = C;

    
    for(var i=0; i<20; i++)
    {
        var O = OctActor.alloc();
        
            var randX = Math.random()*(area1.size.w-200) +100;
            var randY = Math.random()*(area1.size.h-200) +100;

        O.updatePosition({x:randX,y:randY});
    
        area1.activeActors.push(O);


    }


//    this.gameScreens.load();

/*	this.gameScreens = GameScreenManager.alloc();
        this.gameScreens.load();
        
        
        this.gameScreens.screens[0] = GameScreen.alloc();
        this.gameScreens.screens[0].draw = function() {
        
                if(GAMEMODEL.playingGame)               return;
                if(GAMEMODEL.gameMode != 0)             return;
                
		GAMEVIEW.context.globalAlpha=1.0;
		GAMEVIEW.clearDrawMods();


		GAMEVIEW.context.fillStyle = "#000066";
		GAMEVIEW.context.fillRect( 0, 0, GAMEVIEW.screen.w, GAMEVIEW.screen.h );

		GAMEVIEW.context.fillStyle = "#FFFFFF";
		GAMEVIEW.context.fillRect( 30, 30, GAMEVIEW.screen.w-60, GAMEVIEW.screen.h-60 );



		var font = "34pt Arial";
		GAMEVIEW.drawModifiers.color = "#000000";

		var txtPt = {x:(GAMEVIEW.screen.w/2),y:210};
		GAMEVIEW.drawText(txtPt, "Test Framework v "+GAMEMODEL.version, font, true, true);
//		txtPt.x += 30;
		txtPt.y += 120;
 		font = "bold 38pt Arial";
 		GAMEVIEW.drawModifiers.color = "#000000";
		GAMEVIEW.drawText(txtPt, "FoodZilla mini edition!", font, true, true);


		GAMEVIEW.drawModifiers.color = "#FFFFFF";
		GAMEVIEW.clearDrawMods();
        
        };
        
        this.gameScreens.screens[0].readInput = function(kInput) {
                if(GAMEMODEL.playingGame)               return;
                if(GAMEMODEL.gameMode != 0)             return;

                if(!kInput.keyPress && kInput.keyID == GAMECONTROL.keyIDs['KEY_SPACEBAR'])	
                {
                        GAMEMODEL.startGame();
                }
                else if(!kInput.keyPress && kInput.keyID == GAMECONTROL.keyIDs['KEY_Q'])		
                {

                }
                else
                {
                        if(!kInput.keyPress && kInput.keyID == GAMECONTROL.keyIDs['KEY_1'])		GAMEMODEL.gameDiff = 1;
                        if(!kInput.keyPress && kInput.keyID == GAMECONTROL.keyIDs['KEY_2'])		GAMEMODEL.gameDiff = 2;
                        if(!kInput.keyPress && kInput.keyID == GAMECONTROL.keyIDs['KEY_3'])		GAMEMODEL.gameDiff = 3;
                }
        };




        this.gameScreens.screens[1] = GameScreen.alloc();
        this.gameScreens.screens[1].draw = function() {
            if(!GAMEMODEL.playingGame)               return;

            var font = "14pt Arial";
        
            font = "16pt Arial";
            GAMEVIEW.drawModifiers.color = "#FFFFFF";
            GAMEVIEW.drawText({x:(60),y:(GAMEVIEW.screen.h-30)}, ("Points: "), font, true, true);

            GAMEVIEW.clearDrawMods();
        };




        this.gameScreens.screens[2] = GameScreen.alloc();
        this.gameScreens.screens[2].draw = function() {
            if(!GAMEMODEL.playingGame)               return;

            if(GAMEMODEL.gameWorld.paused)
            {
                GAMEVIEW.context.fillStyle = "#FFFFFF";
                GAMEVIEW.context.globalAlpha=0.7;
                GAMEVIEW.context.fillRect( 0, 0, GAMEVIEW.screen.w, GAMEVIEW.screen.h );
                GAMEVIEW.context.globalAlpha=1.0;
                GAMEVIEW.clearDrawMods();	

                var font = "24pt Arial";
                GAMEVIEW.drawModifiers.color = "#FF0000";
                GAMEVIEW.setWorldPt( (GAMEVIEW.screen.w/2), (GAMEVIEW.screen.h-60) );
                GAMEVIEW.drawText(GAMEVIEW.worldPt, ("PAUSED"), font, true, true);
            }
        };  /**/
};


