document.addEventListener("deviceready", start, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

document.addEventListener("backbutton", function (e) {
    e.preventDefault();
}, false);
document.addEventListener("menubutton", function (e) {
    e.preventDefault();
}, false);
document.addEventListener("searchbutton", function (e) {
    e.preventDefault();
}, false);

//window.onload = start;

function start(){ 
    WIDTH = 850; 
    HEIGHT = 1100; 

    FACTOR = 5;
    
    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "game");    
      
  	loadJson();
  	
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Game", gameMain);
    
    game.state.start("Boot");  
}

var boot = function(game){};
 
boot.prototype = {
    create: function(){
        game.stage.backgroundColor = '#053340';

        this.scale.maxWidth = w;
        this.scale.maxHeight = h;
        
        this.scale.forceOrientation(true, false);

        game.state.start('Preloader');
    }
};

function loadJson(){
	audioVibes = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioHarp = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioBass = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioPizz = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioTuba = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioDrums = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false }
        }
	};
	
	audioOud = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioGlock = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	audioKalimba = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioLog = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioMetals = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false }
        }
	};
	
	audioXylo = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
	
	audioPan = {
	    spritemap: {
	        1 : { start: 0, end: FACTOR, loop: false },
	        2 : { start: FACTOR, end: FACTOR*2, loop: false },
	        3 : { start: FACTOR*2, end: FACTOR*3, loop: false },
	        4 : { start: FACTOR*3, end: FACTOR*4, loop: false },
	        5 : { start: FACTOR*4, end: FACTOR*5, loop: false },
	        6 : { start: FACTOR*5, end: FACTOR*6, loop: false },
	        7 : { start: FACTOR*6, end: FACTOR*7, loop: false },
	        8 : { start: FACTOR*7, end: FACTOR*8, loop: false },
	        9 : { start: FACTOR*8, end: FACTOR*9, loop: false },
	        10 : { start: FACTOR*9, end: FACTOR*10, loop: false },
	        11 : { start: FACTOR*10, end: FACTOR*11, loop: false },
	        12 : { start: FACTOR*11, end: FACTOR*12, loop: false },
	        13 : { start: FACTOR*12, end: FACTOR*13, loop: false }
        }
	};
}

function onPause(){
    game.paused = true;
}

function onResume(){
    game.paused = false;
    setTimeout(function(){
        try{
        	window.plugins.insomnia.keepAwake();
            StatusBar.hide();
        }catch(e){}   
    }, 500);
}
