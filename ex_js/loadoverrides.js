
GAMESOUNDS.load = function(context) {
  this.gameSFX = ['sounds/effects/SFX/monster_change_medium_to_fast.ogg',
                          'sounds/effects/SFX/monster_change_slow_to_medium.ogg',
                          'sounds/effects/SFX/monster_full_throttle_A.ogg',
                          'sounds/effects/SFX/monster_full_throttle_B.ogg',
                          'sounds/effects/SFX/monster_rev_burst.ogg',
                          'sounds/effects/SFX/monster_speed_fast.ogg',
                          'sounds/effects/SFX/monster_speed_idle.ogg',
                          'sounds/effects/SFX/monster_speed_medium.ogg',
                          'sounds/effects/SFX/monster_speed_slow_A.ogg',
                          'sounds/effects/SFX/monster_speed_slow_B.ogg'];
};
GAMEMUSIC.load = function(domain) {
  this.gameSongs[0] = "music/07_from_the_legend_of_zelda_-_triforce_of_the_gods_hyrule_castle.mp3";
  this.gameSongs[1] = "music/08_from_the_legend_of_zelda_-_triforce_of_the_gods_legend_of_zelda_theme.mp3";
};
GAMEVIEW.loadTextures = function()
{
    this.loadImg(0, "images/car/tire_map.png");
    this.loadImg(1, "images/car/monster_red2.png");

    this.loadImg(2, "images/ITEMS/barrel.png");
    this.loadImg(3, "images/ITEMS/cinder_block.png");
    this.loadImg(4, "images/ITEMS/oil_spill.png");

    this.loadImg(10, "images/foreground_large.png");
    this.loadImg(11, "images/foreground1.png");
    this.loadImg(12, "images/background_large.png");
    this.loadImg(13, "images/background.png");

    this.loadImg(30, "images/OBJECTS/car_new_aston.png");
    this.loadImg(31, "images/OBJECTS/car_half_crushed_aston.png");
    this.loadImg(32, "images/OBJECTS/car_fully_crushed_aston.png");
    this.loadImg(33, "images/OBJECTS/car_new_truck.png");
    this.loadImg(34, "images/OBJECTS/car_half_crushed_truck.png");
    this.loadImg(35, "images/OBJECTS/car_fully_crushed_truck.png");
    this.loadImg(36, "images/OBJECTS/car_new_beetle.png");
    this.loadImg(37, "images/OBJECTS/car_half_crushed_beetle.png");
    this.loadImg(38, "images/OBJECTS/car_fully_crushed_beetle.png");
    this.loadImg(39, "images/OBJECTS/car_new_police.png");
    this.loadImg(40, "images/OBJECTS/car_half_crushed_police.png");
    this.loadImg(41, "images/OBJECTS/car_fully_crushed_police.png");


    return true;
};
GAMEANIMATIONS.loadTextureFrames = function()
{
//  GAMEANIMATIONS.loadTextureFrameFromGrid = function(imgNum, size, xmax, ymax, w, h, imgW, imgH, keyPt, pixelBuffer)
    var X;  var Y;  var W;  var H;  var keypt = {};

    this.loadTextureFrameFromGrid(0,  24,  24,1,  116,116,  116*24,116, {x:58,y:58}, {x:0,y:0});
    this.loadTextureFrameFromGrid(1,  1,  1,1,  375,375,  375,375, {x:188,y:150}, {x:0,y:0});

    this.loadTextureFrameFromGrid(2,  1,  1,1,  96,163,  96,163, {x:48,y:81.5}, {x:0,y:0});
    this.loadTextureFrameFromGrid(3,  1,  1,1,  250,250,  250,250, {x:125,y:125}, {x:0,y:0});
    this.loadTextureFrameFromGrid(4,  1,  1,1,  150,150,  150,150, {x:75,y:75}, {x:0,y:0});

    this.loadTextureFrameFromGrid(10,  Math.ceil((16000/25)*(1575/25)),  (16000/25),(1575/25),  25,25,  16000,1575, {x:12.5,y:12.5}, {x:0,y:0});
    this.loadTextureFrameFromGrid(11,  Math.ceil((4000/25)*(400/40)),  (4000/25),Math.ceil(400/40),  25,40,  4000,400, {x:12.5,y:20}, {x:0,y:0});
    this.loadTextureFrameFromGrid(12,  Math.ceil((16000/25)*(705/25)),  (16000/25),(1575/25),  25,25,  16000,1575, {x:12.5,y:12.5}, {x:0,y:0});
    this.loadTextureFrameFromGrid(13,  Math.ceil((4000/25)*(176/16)),  (4000/25),(176/16),  25,16,  4000,176, {x:12.5,y:8}, {x:0,y:0});

    this.loadTextureFrameFromGrid(30,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(31,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(32,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(33,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(34,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(35,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(36,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(37,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(38,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(39,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(40,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});
    this.loadTextureFrameFromGrid(41,  1,  1,1,  300,150,  300,150, {x:150,y:75}, {x:0,y:0});

    var frame;

/*
    loadTextureFrameFromGrid(int imgNum, int size, int xmax, int ymax, int w, int h, int imgW, int imgH, Vector2D keypoint, Vector2D pixelBuffer);
    addToTextureFrameFromGrid(int imgNum, int start, int end, int xstart, int xmax, int ystart, int ymax, int w, int h, int imgW, int imgH, Vector2D pixelBuffer);
/**/
    return true;
};
GAMEANIMATIONS.loadAnimations = function()
{
    this.collections[0] = AnimationCollection.alloc();
    this.collections[10] = AnimationCollection.alloc();
    this.collections[11] = AnimationCollection.alloc();
    this.collections[20] = AnimationCollection.alloc();
    this.collections[21] = AnimationCollection.alloc();
    this.collections[22] = AnimationCollection.alloc();
    this.collections[23] = AnimationCollection.alloc();
    this.collections[30] = AnimationCollection.alloc();
/*
    loadSequenceForCollection(int collNum,   int SeqNum, int frameCount, 
      int imgNum, int ticksPerFrame,   int imgFrameStart, int imgFrameStep=1, Vector2D scale ); 
/**/
    this.loadSequenceForCollection(10,  0,1,  1,  600,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(10,  1,24,  0,  45,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(10,  2,24,  0,  30,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(10,  3,24,  0,  15,  0,1, {w:0.5,h:0.5});

    this.loadSequenceForCollection(11,  0,1,  2,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(11,  1,1,  3,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(11,  2,1,  4,  6000000,  0,1, {w:1,h:0.5});

    this.loadSequenceForCollection(20,  0,Math.ceil((16000/25)*(1575/25)),  10,  6000000,  0,1, {w:1,h:1});
    this.loadSequenceForCollection(21,  0,Math.ceil((4000/25)*(400/40)),  11,  6000000,  0,1, {w:1,h:1});
    this.loadSequenceForCollection(22,  0,Math.ceil((16000/25)*(705/25)),  12,  6000000,  0,1, {w:1,h:1});
    this.loadSequenceForCollection(23,  0,Math.ceil((4000/25)*(176/16)),  13,  6000000,  0,1, {w:1,h:1});

    this.loadSequenceForCollection(30,  0,1,  30,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  1,1,  31,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  2,1,  32,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  3,1,  33,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  4,1,  34,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  5,1,  35,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  6,1,  36,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  7,1,  37,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  8,1,  38,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  9,1,  39,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  10,1,  40,  6000000,  0,1, {w:0.5,h:0.5});
    this.loadSequenceForCollection(30,  11,1,  41,  6000000,  0,1, {w:0.5,h:0.5});
/**/
/*

    this.loadSequenceForCollection(0,  8,3,  11,  240,  1,1, {w:1,h:1});
        this.collections[0].sequenceSet[8].frameSet[1].imgFrameNum = 4;
        this.collections[0].sequenceSet[8].frameSet[2].imgFrameNum = 7;
    this.loadSequenceForCollection(0,  9,3,  11,  240,  5,1, {w:1,h:1});
        this.collections[0].sequenceSet[9].frameSet[1].imgFrameNum = 8;
        this.collections[0].sequenceSet[9].frameSet[2].imgFrameNum = 11;
    this.loadSequenceForCollection(0,  10,3,  11,  240,  6,1, {w:1,h:1});
        this.collections[0].sequenceSet[10].frameSet[1].imgFrameNum = 9;
        this.collections[0].sequenceSet[10].frameSet[2].imgFrameNum = 10;
    this.loadSequenceForCollection(0,  11,3,  11,  240,  5,1, {w:1,h:1});
        this.collections[0].sequenceSet[11].frameSet[1].imgFrameNum = 8;
        this.collections[0].sequenceSet[11].frameSet[2].imgFrameNum = 11;

    this.loadSequenceForCollection(0,  12,4,  11,  30,  1,1, {w:1,h:1});
        this.collections[0].sequenceSet[12].frameSet[1].imgFrameNum = 2;
        this.collections[0].sequenceSet[12].frameSet[1].scale = {w:1.5,h:1.5};
        this.collections[0].sequenceSet[12].frameSet[2].imgFrameNum = 0;
        this.collections[0].sequenceSet[12].frameSet[3].imgFrameNum = 2;

    this.loadSequenceForCollection(0,  13,1,  11,  600,  12,1, {w:1,h:1});
    
    
//  this.collections[1] = AnimationCollection.alloc();
//  this.loadSequenceForCollection(1,  0,2*4,  12,  600,  0,1, {w:1,h:1});

    this.collections[2] = AnimationCollection.alloc();
    this.loadSequenceForCollection(2,  0,2*4,  13,  600,  0,1, {w:1,h:1});

    this.collections[3] = AnimationCollection.alloc();
    this.loadSequenceForCollection(3,  0,1,  10,  6000,  17,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  1,1,  10,  6000,  10,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  2,1,  10,  6000,  3,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  3,1,  10,  6000,  10,1, {w:1,h:1});

    this.loadSequenceForCollection(3,  4,7,  10,  150,  14,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  5,7,  10,  150,  7,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  6,7,  10,  150,  0,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  7,7,  10,  150,  7,1, {w:1,h:1});

    this.loadSequenceForCollection(3,  8,9,  10,  75,  36,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  9,9,  10,  75,  27,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  10,6,  10,  100,  21,1, {w:1,h:1});
    this.loadSequenceForCollection(3,  11,9,  10,  75,  27,1, {w:1,h:1});
    /**/
    return true;
};


