var gameMain = function(game){
	allInstruments = [];
	gui = null;	

	config = {};
	cloud_n = 0;
	note_n = 0;
	
	notWatched = true;

	schemes = ['DEFAULT',  'W E R T Y', 'U I O P A', 'S D F G H', 'S D F G H', 'J K L Z X', 'C V B N M', '1 2 3 4 5'];
	
	songs = {
		'Default': 'None',
		'Twinkle': [0, 0, 7, 7, 9, 9, 7, 5, 5, 4, 4, 2, 2, 0],
		'macdonald': [7, 7, 7, 2, 4, 4, 2, 11, 11, 9, 9, 7],
		'Susanna': [0, 2, 4, 7, 7, 9, 7, 4, 0, 2, 4, 4, 2, 0, 2, 0, 2, 4, 7, 7, 9, 7, 4, 0, 2, 4, 4, 2, 2, 0]
	};
	
	notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
};

gameMain.prototype = {
    create: function(){
    	bg = game.add.sprite(0, 0, 'bg');
    	
    	makey = game.add.sprite(0, 0, 'makey');
    	makey.x = game.world.centerX - makey.width / 2;
    	makey.y = game.world.centerY - makey.height / 2 + 110;

		keys = ['up', 'down', 'right', 'left', 'space', 'click'];
		sprites = [];
		
		for (k = 0; k < keys.length; k++){
			sprite = game.add.sprite(0, 0, keys[k]);
			sprite.alpha = 0;
			sprites.push(sprite);
			sprites[k].inputEnabled = true;
			sprites[k].events.onInputDown.add(testSounds, this, k);
		}

		loadInstruments();
		offSets();
		assignKeys();

		config = {
			INSTRUMENT: 0,
			SONG: 'None',
			UP: 0,
			DOWN: 2,
			RIGHT: 4,
			LEFT: 7,
			SPACE: 9,
			METRONOME: 120,
			OUTPUTS: 0,
			UNLOCK: function(){ watchAd(); }
		};
		    	
    	rTxt = this.add.text(makey.x + 325, makey.y + 150, notes[config.RIGHT], {
	        font: '24px', fill: '#000000', 
	    });
    	lTxt = this.add.text(makey.x + 33, makey.y + 150, notes[config.LEFT], {
	        font: '24px', fill: '#000000', 
	    });
    	uTxt = this.add.text(makey.x + 118, makey.y + 50, notes[config.UP], {
	        font: '24px', fill: '#000000', 
	    });
    	dTxt = this.add.text(makey.x + 118, makey.y + 240, notes[config.DOWN], {
	        font: '24px', fill: '#000000', 
	    });
    	sTxt = this.add.text(makey.x + 432, makey.y + 50, notes[config.SPACE], {
	        font: '24px', fill: '#000000', 
	    });

        useClick = this.add.text(20, 880, "* Plug your MakeyMakey to a mobile devcie using an USB 2.0 adapter\n* Choose an instrument & tempo, try out a song or choose specific notes\n* Tap the makey inputs on the image above to test the sounds\n* Click doesn't receive a note (used by the UI), Q plays random notes\n* Reamp at makeymakey.com/pages/remap", {
	        font: '24px', fill: '#ffa', 
	    });
	    useClick.x = game.world.centerX - useClick.width / 2;
	    
	    startGUI();
		
		setTimeout(function(){
			initAd();
			
	        try{
	            window.plugins.insomnia.keepAwake();
	        } catch(e){}
	        try{
	           StatusBar.hide();
	        } catch(e){}
        }, 1000); 
    },
    update: function(){ 
    	for (n = 0; n < allcloudArrays[config.OUTPUTS].length; n++){
			if (allcloudArrays[config.OUTPUTS][n].isDown){
				playSound(n);
			}
	    }
	    if (QKey.isDown){
	    	playSound(game.rnd.integerInRange(0,4));
	    }
    }
};

function startGUI(){
    gui = new dat.GUI({ width: 300 });
  
    gui.add(config, 'INSTRUMENT', 
    { "Vibes": 0, "Harp": 1, "Pan Flute" : 2, "Xylophone": 3, "Glock": 4, "Metal Percussions": 5, "Log": 6,
    "Pizzicato": 7, "Kalimba": 8, "Oud": 9, "Drums": 10, "Bass Guitar": 11, "Tuba": 12  }).name('Instrument') ;

    gui.add(config, 'SONG', 
    { 'None': 'None', 'Twinkle': 'Twinkle', 'macdonald': 'macdonald', 'Susanna': 'Susanna'}).name('Song');

    gui.add(config, 'OUTPUTS', 
    { 'DEFAULT': 0, 'W E R T Y': 1, 'U I O P A': 2, 'S D F G H': 3, 'J K L Z X': 4, 'C V B N M': 5, '1 2 3 4 5': 6}).name('Outputs');
    
    gui.add(config, 'METRONOME', 60, 360).name('Metronome BPM').step(5);
    
    unlockBtn = gui.add(config, 'UNLOCK').name('* Unlock notes change & support development (one ad) *');

    document.getElementsByClassName('dg')[1].style.cssFloat = 'left';
    document.getElementsByClassName('property-name')[4].style.width = '300px';
}

function testSounds(_this, _k){
	playSound(soundId.indexOf(_this.key));
}

function playSound(_n){
	if (allCloudResets[config.OUTPUTS][_n]){
		_instru = allInstruments[config.INSTRUMENT];
		
		lightKey(sprites[_n]);
		
		if (allInstruments.indexOf(allInstruments[config.INSTRUMENT]) > -1){
			if (config.SONG == 'None'){
				if (allInstruments[config.INSTRUMENT] != metals && allInstruments[config.INSTRUMENT] != drums){
					_instru.play(parseInt(config[Object.keys(config)[_n + 2]]) + 1, 1); // _n + 2 is the index of the pressed key in the config object
				}
				else{
					_instru.play(_n + 1);
				}
			}
			else{
				if (note_n < songs[config.SONG].length){
					_instru.play(songs[config.SONG][note_n] + 1, 1);
					note_n++;
				}
				else{
					note_n = 0;
				}
			}
		}

		allCloudResets[config.OUTPUTS][_n] = false;
		
		setTimeout(function(){
			allCloudResets[config.OUTPUTS][_n] = true;
		}, 60000 / config.METRONOME);
	}
}

function lightKey(_this){
	game.add.tween(_this).to( { alpha: 1 }, 400 - config.METRONOME, "Linear", true);
	
	setTimeout(function(){
		game.add.tween(_this).to( { alpha: 0 }, 400 - config.METRONOME, "Linear", true);
	}, 60000 / config.METRONOME);
	
	game.add.tween(makey).to( { alpha: 0.7 }, 400 - config.METRONOME, "Linear", true);
	
	setTimeout(function(){
		game.add.tween(makey).to( { alpha: 1 }, 400 - config.METRONOME, "Linear", true);
	}, 60000 / config.METRONOME);
}

function loadInstruments(){
	vibes = game.add.audioSprite('vibes'); 
	harp = game.add.audioSprite('harp'); 
	pizz = game.add.audioSprite('pizz'); 
	drums = game.add.audioSprite('drums'); 
	bass = game.add.audioSprite('bass');
	oud = game.add.audioSprite('oud');
	tuba = game.add.audioSprite('tuba');
	pan = game.add.audioSprite('pan');
	xylo = game.add.audioSprite('xylo');
	glock = game.add.audioSprite('glock');
	metals = game.add.audioSprite('metals');
	log = game.add.audioSprite('log');
	kalimba = game.add.audioSprite('kalimba');

    allInstruments = [vibes, harp, pan, xylo, glock, metals, log, pizz, kalimba];   
}

function assignKeys(){
	QKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);	
	
	//wKey = game.input.keyboard.addKey(Phaser.Keyboard.W); // instead of activepointer which is used in the UI
	
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);			
	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	cloud1Array = [upKey, downKey, rightKey, leftKey, spaceKey];
	cloud1resets = [true, true, true, true, true];
	
	// CLOUD 2 - W E R T Y
	wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
	rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	tKey = game.input.keyboard.addKey(Phaser.Keyboard.T);
	yKey = game.input.keyboard.addKey(Phaser.Keyboard.Y);
	 
	cloud2Array = [wKey, eKey, rKey, tKey, yKey];
	cloud2resets = [true, true, true, true, true];
	
	// CLOUD 3 -  U I O P A
	uKey = game.input.keyboard.addKey(Phaser.Keyboard.U);
	iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
	pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
	aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	
	cloud3Array = [uKey, iKey, oKey, pKey, aKey];
	cloud3resets = [true, true, true, true, true];
	
	// CLOUD 4 - S D F G H
	sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
	gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
	hKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
	
	cloud4Array = [sKey, dKey, fKey, gKey, hKey];
	cloud4resets = [true, true, true, true, true];
	
	// CLOUD 5 - J K L Z X
	jKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
	kKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
	lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
	zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
	
	cloud5Array = [jKey, kKey, lKey, zKey, xKey];
	cloud5resets = [true, true, true, true, true];
	
	// CLOUD 6 - C V B N M
	cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
	vKey = game.input.keyboard.addKey(Phaser.Keyboard.V);
	bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
	nKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
	mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
	
	cloud6Array = [cKey, vKey, bKey, nKey, mKey];
	cloud6resets = [true, true, true, true, true];
	
	// CLOUD 7 - 1 2 3 4 5
	_Key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	_Key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	_Key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	_Key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
	_Key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
	
	cloud7Array = [_Key1, _Key2, _Key3, _Key4, _Key5];
	cloud7resets = [true, true, true, true, true];
	
	allcloudArrays = [cloud1Array, cloud2Array, cloud3Array, cloud4Array, cloud5Array, cloud6Array, cloud7Array];
	allCloudResets = [cloud1resets, cloud2resets, cloud3resets, cloud4resets, cloud5resets, cloud6resets, cloud7resets];

	soundId = ['up', 'down', 'right', 'left', 'space', 'click'];
}

function watchAd(){
	if (notWatched){
	    gui.add(config, 'UP', 
	    { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}).name('UP note').onFinishChange(updateText);
	     
	    gui.add(config, 'DOWN', 
	    { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}).name('DOWN note').onFinishChange(updateText);
	     
	    gui.add(config, 'RIGHT', 
	    { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}).name('RIGHT note').onFinishChange(updateText);
	    
	    gui.add(config, 'LEFT', 
	    { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}).name('LEFT note').onFinishChange(updateText);    
	    
	    gui.add(config, 'SPACE', 
	    { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}).name('SPACE note').onFinishChange(updateText);
		
		gui.remove(unlockBtn);
		
		notWatched = false;
		
		AdMob.showInterstitial();
	}
}

function updateText(){
	rTxt.text = notes[config.RIGHT];
	lTxt.text = notes[config.LEFT];
	uTxt.text = notes[config.UP];
	dTxt.text = notes[config.DOWN];
	sTxt.text = notes[config.SPACE];
}

function initAd(){
    admobid = {
        interstitial: 'ca-app-pub-9795366520625065/5937422115'
    };

  	if(AdMob) AdMob.prepareInterstitial({
  		adId: admobid.interstitial, 
  		autoShow: false
  	});
}

function offSets(){	
	sprites[0].x = makey.x + 151;
	sprites[0].y = makey.y + 34;
	
	sprites[1].x = makey.x + 152;
	sprites[1].y = makey.y + 176;
	
	sprites[2].x = makey.x + 214;
	sprites[2].y = makey.y + 117;
	
	sprites[3].x = makey.x + 61;
	sprites[3].y = makey.y + 118;
	
	sprites[4].x = makey.x + 372;
	sprites[4].y = makey.y + 85;
	sprites[4].scale.set(1.05, 1.05);
	
	sprites[5].x = makey.x + 537;
	sprites[5].y = makey.y + 85;
	sprites[5].scale.set(1.05, 1.05);
}