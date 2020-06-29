var gameMain = function(game){
	TEMPO = 120;
	allInstruments = [];	
	
	chosenInstrument = 0;
	
	cloud_n = 0;
	schemes = ['DEFAULT',  'W E R T Y', 'U I O P A', 'S D F G H', 'S D F G H', 'J K L Z X', 'C V B N M', '1 2 3 4 5'];
};

gameMain.prototype = {
    create: function(){
    	bg = game.add.sprite(0, 0, 'bg');
    	
    	makey = game.add.sprite(70, 20, 'makey');
    	
		keys = ['up', 'down', 'right', 'left', 'space', 'click'];
		sprites = [];
		
		for (k = 0; k < keys.length; k++){
			sprite = game.add.sprite(0, 0, keys[k]);
			sprite.alpha = 0;
			sprites.push(sprite);
			sprites[k].inputEnabled = true;
			sprites[k].events.onInputDown.add(testSounds, this, k);
		}

		offSets();
		assignKeys();
		loadInstruments();

        this.add.text(850, 30, 'Choose Instrument:', {
	        font: '32px', fill: '#0ff', fontWeight: 'bold', align: 'center'
	    });
        
        useClick = this.add.text(70, 480, '* Plug in your Makeymakey with a USB 2.0 adapter\n * Instruments play pentatonic notes, tap the input images to test sounds \n * Reamp click to Q to have it play random notes', {
	        font: '24px', fill: '#ffa'
	    });
        
        changeCloud = this.add.text(70, 420, '- Change keyboard Scheme (' + schemes[cloud_n] + ') -', {
	        font: '32px', fill: '#fff', fontWeight: 'bold'
	    });
		changeCloud.inputEnabled = true;
		changeCloud.events.onInputDown.add(function(){
			if (cloud_n < 6){
				cloud_n++;
			}
			else{
				cloud_n = 0;
			}
			changeCloud.text = '- Change keyboard Scheme (' + schemes[cloud_n] + ') -';
		}, this);
	    
	    instruLabels = [];
	    
		for (t = 0; t < allInstruments.length; t++){
			
			instruName = allInstruments[t].key.charAt(0).toUpperCase() + allInstruments[t].key.slice(1);
			
			if (t < allInstruments.length / 2){
		        label = this.add.text(850, 100 + t * 60, instruName, {
		            font: '42px', fill: 'white', fontWeight: 'normal', align: 'center'
		        });
			}
			else{
		        label = this.add.text(1000, 100 + t * 60 - allInstruments.length / 2 * 60, instruName, {
		            font: '42px', fill: 'white', fontWeight: 'normal', align: 'center'
		        });	
			}
	        instruLabels.push(label);
			instruLabels[t].inputEnabled = true;
			instruLabels[t].events.onInputDown.add(chooseSound, this);
        }
        
		chooseSound(instruLabels[0]);
    },
    update: function(){  	
    	for (n = 0; n < allcloudArrays[cloud_n].length; n++){
			if (allcloudArrays[cloud_n][n].isDown){
				playSound(n);
			}
	    }
	    if (QKey.isDown){
	    	playSound(game.rnd.integerInRange(0,4));
	    }
    }
};

function testSounds(_this, _k){
	playSound(soundId.indexOf(_this.key));
}

function chooseSound(_this){
	for (t = 0; t < allInstruments.length; t++){
		instruLabels[t].fill = '#fff';
    }
    _this.fill = 'yellow';
    
    chosenInstrument = instruLabels.indexOf(_this);
}

function playSound(_n){
	if (allCloudResets[cloud_n][_n]){
		_instru = allInstruments[chosenInstrument];
		
		lightKey(sprites[_n]);
		
		try{
			_instru.play(_n + 1, 0.5);
		} catch(e){ _instru.play(game.rnd.integerInRange(1, 5), 0.5); }		
		

		allCloudResets[cloud_n][_n] = false;
		
		setTimeout(function(){
			allCloudResets[cloud_n][_n] = true;
		}, 60000 / TEMPO);
	}
}

function lightKey(_this){
	game.add.tween(_this).to( { alpha: 1 }, 300 - TEMPO, "Linear", true);
	
	setTimeout(function(){
		game.add.tween(_this).to( { alpha: 0 }, 300 - TEMPO, "Linear", true);
	}, 60000 / TEMPO);
	
	game.add.tween(makey).to( { alpha: 0.7 }, 300 - TEMPO, "Linear", true);
	
	setTimeout(function(){
		game.add.tween(makey).to( { alpha: 1 }, 300 - TEMPO, "Linear", true);
	}, 60000 / TEMPO);
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

    allInstruments = [vibes, harp, pan, xylo, glock, metals, log, pizz, kalimba, oud, drums, bass, tuba];   
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
	
	cloud2Array = [wKey, eKey, rKey, tKey, yKey]; // C D E G A
	cloud2resets = [true, true, true, true, true];
	
	// CLOUD 3 -  U I O P A
	uKey = game.input.keyboard.addKey(Phaser.Keyboard.U);
	iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
	pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
	aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	
	cloud3Array = [uKey, iKey, oKey, pKey, aKey]; // C D E G A
	cloud3resets = [true, true, true, true, true];
	
	// CLOUD 4 - S D F G H
	sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
	gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
	hKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
	
	cloud4Array = [sKey, dKey, fKey, gKey, hKey]; // C D E G A
	cloud4resets = [true, true, true, true, true];
	
	// CLOUD 5 - J K L Z X
	jKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
	kKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
	lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
	zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
	
	cloud5Array = [jKey, kKey, lKey, zKey, xKey]; // C D E G A
	cloud5resets = [true, true, true, true, true];
	
	// CLOUD 6 - C V B N M
	cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
	vKey = game.input.keyboard.addKey(Phaser.Keyboard.V);
	bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
	nKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
	mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
	
	cloud6Array = [cKey, vKey, bKey, nKey, mKey]; // C D E G A
	cloud6resets = [true, true, true, true, true];
	
	// CLOUD 7 - 1 2 3 4 5
	_Key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	_Key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	_Key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	_Key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
	_Key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
	
	cloud7Array = [_Key1, _Key2, _Key3, _Key4, _Key5]; // C D E G A
	cloud7resets = [true, true, true, true, true];
	
	allcloudArrays = [cloud1Array, cloud2Array, cloud3Array, cloud4Array, cloud5Array, cloud6Array, cloud7Array];
	allCloudResets = [cloud1resets, cloud2resets, cloud3resets, cloud4resets, cloud5resets, cloud6resets, cloud7resets];

	soundId = ['up', 'down', 'right', 'left', 'space', 'click'];
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