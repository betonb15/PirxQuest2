////////////////////////////////////////////
//ZMIENNE GLOBALNE

	var PQ_GameLoop = {};						//Główny interwał gry
	var PQ_MaxFrameRate = 40;					//Maksymalna liczba FPS
	var PQ_RedrawTimer = 0;						//Liczba ms rysowania nowej klatki
	
////////////////////////////////////////////
//Głowna pętla

	function Redraw(){
		var StartTime = new Date();
						
		//Połącz z serwerem
		PQ_Xhttp.SerwerQuery("test.php","dt=0",function(a){});
		
		//Pokaż kursor
		//Mouse.DrawCursor();				
		//Rysowanie buffora na głównej canvie
		//PQ_DrawOutput.Draw();
		
		
		//To musi być resetowane na samym końcu pętli
		//Mouse.ScrollUp = false;
		//Mouse.ScrollDown = false;
		var StopTime = new Date();
		PQ_RedrawTimer = 1000*(StopTime.getSeconds()-StartTime.getSeconds())+(StopTime.getMilliseconds()-StartTime.getMilliseconds());
		if (PQ_RedrawTimer < (1000/PQ_MaxFrameRate)){PQ_RedrawTimer = 1000/PQ_MaxFrameRate;}
	}
	
////////////////////////////////////////////
//START
	
	new Particle('ship',2,'smoke1',0,0,0,0,0,0,0,0,0,1,0,10,10,1000,1);
	new Particle('ship',2,'smoke1',0,0,0,0,0,0,0,0,0,1,0,10,10,1000,1);
	new Particle('server',2,'ship1_all',0,0,0,0,0,0,0,0,0,1,0,10,10,1000,1);
	new Particle('server',2,'ship1_all',0,0,0,0,0,0,0,0,0,1,0,10,10,1000,1);
	new Particle('client',2,'missile1',0,0,0,0,0,0,0,0,0,1,0,10,10,1000,1);
	new Particle('client',2,'missile1',0,0,0,0,0,0,0,0,0,1,0,10,10,1000,1);
	
	PQ_GameLoop = setInterval(Redraw,1000/PQ_MaxFrameRate);