////////////////////////////////////////////
//ZMIENNE GLOBALNE

	var PQ_ShipsParticles = [];									//Tablica zawierająca wszystkie obiekty typu statek
	var PQ_SerwerParticles = [];								//Tablica zawierająca wszystkie obiekty aktualizowane przez serwer
	var PQ_ClientParticles = [];								//Tablica zawierająca wszystkie obiekty aktualizowane lokalnie na maszynie klienta
		PQ_ClientParticles.MaxParticles = 5000;					//Maksymalna liczba cząstek na maszynie klienta
	var PQ_DrawOrder = [];										//Wszystkie obiekty ułożone w kolejności rysowania, warstwy
	for(var i=0;i<19;i++){
		PQ_DrawOrder[i] = [];
	}	
	
	var PQ_Particles = {ShipsParticles:PQ_ShipsParticles,		//Wszystkie powyższe tablice razem
						SerwerParticles:PQ_SerwerParticles,
						ClientParticles:PQ_ClientParticles
						}
						
	//Dodatkowe metody
	PQ_ClientParticles.Add = function(P){
		this.push(P);
		if (this.length > this.MaxParticles){
			this.shift();
		}
	}

////////////////////////////////////////////
//Klasy

	function Particle(typ,DrawOrder,sprite,x,y,vx,vy,Fx,Fy,angle,rot,mass,scale,dscale,live,maxLive,killTime,opacity){	
		//this.Output = PQ_DrawBuffor;							//Canva na której bedzie rysowany obiekt
		
		this.Ind = 0;											//Indeks objektu w tabeli globalnej					(U)
		this.DrawOrder = DrawOrder;								//Na której warstwie połozony jest obiekt			(U)
		this.typ = typ;											//Typ objektu										(U)
		
		//Ustalenie konkretnego sprita na podstawie typu, przypisanie obiektu do tabeli
		if(this.typ==='ship'){
			PQ_ShipsParticles[this.Ind]=this;
			PQ_DrawOrder[this.DrawOrder][PQ_DrawOrder[this.DrawOrder].length] = this;
		}
		if(this.typ==='client'){
			PQ_ClientParticles[PQ_ClientParticles.length]=this;
			PQ_DrawOrder[this.DrawOrder][PQ_DrawOrder[this.DrawOrder].length] = this;			
		}
		if(this.typ==='server'){
			PQ_SerwerParticles[this.Ind]=this;
			PQ_DrawOrder[this.DrawOrder][PQ_DrawOrder[this.DrawOrder].length] = this;			
		}
		//Ładowanie sprita
		this.sprite = PQ_Picture(sprite);
		
		//Ustalenie tekstu wyświetlanego
		this.textOut = 'test';
		
		this.x = x;												//Położenie na x 									(U)
		this.y = y;												//Położenie na y 									(U)
		this.vx = vx;											//Prędkość na x
		this.vy = vy;											//Prędkość na y
		this.V = Math.sqrt(this.vx*this.vx+this.vy*this.vy);	//Wielkość wypadkowej prędkości
		this.Fx = Fx;											//Wektor siły na x
		this.Fy = Fy;											//Wektor siły na y
		this.F = Math.sqrt(this.Fx*this.Fx+this.Fy*this.Fy);	//Wielkośc wypadkowej siły
		this.angle = angle;										//Kąt obrotu objektu 								(U)
		this.rot = rot;											//Zmiana kąta obrotu dla objektu
		this.mass = mass;										//Masa objektu 										(U)
		this.scale = scale;										//Skala objektu 									(U)
		this.dscale = dscale;									//Zmian skali new_scale = scale+dscale
		
		this.live = live;										//Obecna pula wytrzymałości 						(U)
		this.maxLive = maxLive;									//Maksymalna pula wytrzymałości 					(U)
		this.liveTime = 0;										//Czas życia obiektu w ms od chwili stworzenia 		(U)
		this.killTime = killTime;								//Czas do zniszczenia obiektu obiektu w ms 			(U)
		this.opacity = opacity;									//Przeźroczystość obiektu 1.00 --> nieprzeźroczysty (U)
		
		this.destroyed = false;									//Czy objekt został zniszczony? 					(U)
				
		this.Draw = function(){
			this.Output.save();	
			this.Output.globalAlpha = this.opacity;
			this.Output.translate(this.x,this.y);
			this.Output.rotate(this.angle);
			this.Output.scale(this.scale,this.scale);
			this.Output.translate(-this.sprite.naturalWidth/2,-this.sprite.naturalHeight/2);				
			if(this.sprite!==undefined){this.Output.drawImage(this.sprite,0,0);}
			this.Output.font = "15px Arial";
			this.Output.fillStyle = "white";
			this.Output.textAlign = "center";
			if(this.textOut!==undefined){this.Output.fillText(this.textOut,0,0);}
			this.Output.restore();
		}
	}