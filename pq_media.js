////////////////////////////////////////////
//ZMIENNE GLOBALNE

	PQ_Pictures = [];			//Tablica zawierająca wszystkie załadowane tekstury

//////////////////////////////////////////////////////////////////////////////////////////////////////
//DZWIĘKI
var GlobalVolume = 1;

function Sound(src) {
	this.SoundTable = [];
	this.Source = src;
	this.Volume = GlobalVolume;			
	
	this.AddSound = function(){
		var i = this.SoundTable.length;
		this.SoundTable[i] = document.createElement("audio");
		this.SoundTable[i].src = this.Source;
		this.SoundTable[i].setAttribute("preload", "auto");
		this.SoundTable[i].setAttribute("controls", "none");
		this.SoundTable[i].style.display = "none";
		document.body.appendChild(this.SoundTable[i]);
	}
	
	this.Play = function(x,y){
		var PlayFlag = false;
		var HearRadius = 2800;
		var L = Math.sqrt((SHIP.x-x)*(SHIP.x-x)+(SHIP.y-y)*(SHIP.y-y));
		var Qv = /*(HearRadius/10+1)/(L+1);*/(HearRadius-L)/HearRadius;
		//Add_Cmd_Text('Sound Volume = '+Qv);
		if(Qv<0){Qv=0;}
		if((Qv>0)&&(L<HearRadius)){
			if(Qv>1){Qv=1;}
			for(var i=0;i<this.SoundTable.length;i++){
				if(this.SoundTable[i].ended){
					this.SoundTable[i].volume = this.Volume*Qv;							
					this.SoundTable[i].play();
					PlayFlag = true;
					break;
				}
			}
			if((!PlayFlag)&&(this.SoundTable.length<4)){
				this.AddSound();
				this.SoundTable[this.SoundTable.length-1].volume = this.Volume*Qv;
				this.SoundTable[this.SoundTable.length-1].play();
			}
		}
	}    
}

/*var SN_Default = new Sound('sounds/none.mp3');

var SN_MissileStart1 = new Sound('sounds/missilestart1.mp3');
var SN_MissileStart2 = new Sound('sounds/missilestart2.mp3');
var SN_MissileStart3 = new Sound('sounds/missilestart3.mp3');
var SN_MissileStart4 = new Sound('sounds/missilestart4.mp3');

var SN_Explosion1 = new Sound('sounds/explosion1.mp3');
var SN_Explosion2 = new Sound('sounds/explosion2.mp3');
var SN_Explosion3 = new Sound('sounds/explosion3.mp3');

var SN_Ricochet1 = new Sound('sounds/ricochet.mp3');

var SN_GunFire1 = new Sound('sounds/gunfire1.mp3');
var SN_GunFire2 = new Sound('sounds/gunfire2.mp3');
var SN_GunFire3 = new Sound('sounds/gunfire3.mp3');
var SN_GunFire4 = new Sound('sounds/gunfire4.mp3');
var SN_GunFire5 = new Sound('sounds/gunfire5.mp3');
var SN_GunFire6 = new Sound('sounds/gunfire6.mp3');
var SN_GunFire7 = new Sound('sounds/gunfire7.mp3');
var SN_GunFire8 = new Sound('sounds/gunfire8.mp3');

var SN_LaserFire1 = new Sound('sounds/laserfire1.mp3');
var SN_Electricity1 = new Sound('sounds/electricity1.mp3');
var SN_Electricity2 = new Sound('sounds/electricity2.mp3');*/

//////////////////////////////////////////////////////////////////////////////////////////////////////
//TEKSTURY

function PQ_Picture(src) {
	var flag = true;
	if(src===''){
		return undefined;
		flag = false;
	}
	src = window.location.href+"graphics/"+src+".png";
	for(var i=0;i<PQ_Pictures.length;i++){
		if(PQ_Pictures[i].src === src){
			return PQ_Pictures[i];
			flag = false;
			break;
		}
	}
	if(flag){
		var IMG = document.createElement("img");
		IMG.src = src;
		//IMG.setAttribute("id","pic"+Math.round(Math.random()*1000000));
		IMG.style.display = "none";
		document.body.appendChild(IMG);
		PQ_Pictures[PQ_Pictures.length] = IMG
		return IMG;
	}
}

/*var SP_smoke1 = new Picture('graphics/smoke1.png');
var SP_smoke2 = new Picture('graphics/smoke2.png');
var SP_smoke3 = new Picture('graphics/smoke3.png');
var SP_smoke4 = new Picture('graphics/smoke4.png');
var SP_spark1 = new Picture('graphics/spark1.png')
var SP_damage1 = new Picture('graphics/damage1.png');
var SP_ship1 = new Picture('graphics/ship1_all.png');
var SP_missile1 = new Picture('graphics/missile1.png');
var SP_missile2 = new Picture('graphics/missile2.png');
var SP_missile3 = new Picture('graphics/missile3.png');
var SP_missile4 = new Picture('graphics/missile4.png');
var SP_missile5 = new Picture('graphics/missile5.png');
var SP_frag1 = new Picture('graphics/frag1.png');

var SP_ship_part1P = new Picture('graphics/ship1/part1P.png');
var SP_ship_part2P = new Picture('graphics/ship1/part2P.png');
var SP_ship_part3P = new Picture('graphics/ship1/part3P.png');
var SP_ship_part4P = new Picture('graphics/ship1/part4P.png');
var SP_ship_part5P = new Picture('graphics/ship1/part5P.png');
var SP_ship_part6P = new Picture('graphics/ship1/part6P.png');
var SP_ship_part7P = new Picture('graphics/ship1/part7P.png');
var SP_ship_part8P = new Picture('graphics/ship1/part8P.png');
var SP_ship_part9P = new Picture('graphics/ship1/part9P.png');
var SP_ship_part10P = new Picture('graphics/ship1/part10P.png');
var SP_ship_part11P = new Picture('graphics/ship1/part11P.png');
var SP_ship_part12P = new Picture('graphics/ship1/part12P.png');
var SP_ship_part13P = new Picture('graphics/ship1/part13P.png');
var SP_ship_part14P = new Picture('graphics/ship1/part14P.png');
var SP_ship_part15P = new Picture('graphics/ship1/part15P.png');
var SP_ship_part16P = new Picture('graphics/ship1/part16P.png');
var SP_ship_part17P = new Picture('graphics/ship1/part17P.png');
	
var SP_ship_part1L = new Picture('graphics/ship1/part1L.png');
var SP_ship_part2L = new Picture('graphics/ship1/part2L.png');
var SP_ship_part3L = new Picture('graphics/ship1/part3L.png');
var SP_ship_part4L = new Picture('graphics/ship1/part4L.png');
var SP_ship_part5L = new Picture('graphics/ship1/part5L.png');
var SP_ship_part6L = new Picture('graphics/ship1/part6L.png');
var SP_ship_part7L = new Picture('graphics/ship1/part7L.png');
var SP_ship_part8L = new Picture('graphics/ship1/part8L.png');
var SP_ship_part9L = new Picture('graphics/ship1/part9L.png');
var SP_ship_part10L = new Picture('graphics/ship1/part10L.png');
var SP_ship_part11L = new Picture('graphics/ship1/part11L.png');
var SP_ship_part12L = new Picture('graphics/ship1/part12L.png');
var SP_ship_part13L = new Picture('graphics/ship1/part13L.png');
var SP_ship_part14L = new Picture('graphics/ship1/part14L.png');
var SP_ship_part15L = new Picture('graphics/ship1/part15L.png');
var SP_ship_part16L = new Picture('graphics/ship1/part16L.png');
var SP_ship_part17L = new Picture('graphics/ship1/part17L.png');*/
