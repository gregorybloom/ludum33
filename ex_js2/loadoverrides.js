
GAMEMODEL.load = function()
{
    this.gameScreens.load();

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


