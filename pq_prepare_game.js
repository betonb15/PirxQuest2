////////////////////////////////////////////
//ZMIENNE GLOBALNE
	var PQ_Version = "0.2.0.1";									//Wersja gry
	var PQ_Inputs = new PQcontrolInputs(undefined,undefined);	//Inicjalizacja myszki i klawiatury

////////////////////////////////////////////
//Tworzenie Canvy bufora

	//Inicjacja
	var PQ_CanvaBuffor = document.createElement("canvas");
	PQ_CanvaBuffor.setAttribute("width",innerWidth+"px");
	PQ_CanvaBuffor.setAttribute("height",innerHeight+"px");	
	var PQ_DrawBuffor = PQ_CanvaBuffor.getContext("2d");

	//Dodatkowe metody
	PQ_DrawBuffor.Clear = function(){
		this.fillStyle = '#000000';
		this.fillRect(0,0,PQ_DrawOutput.canvas.clientWidth,PQ_DrawOutput.canvas.clientHeight);
		
		this.font = "12px Arial";
		this.fillStyle = "white";
		this.textAlign = "left";			
		this.fillText("Pirx Quest v"+PQ_Version+" © Rafał Sputowski "+(new Date).getFullYear(),1,14);
		this.fillText("Pirx Quest v"+PQ_Version+" © Rafał Sputowski "+(new Date).getFullYear(),1,29);
	}
	
////////////////////////////////////////////
//Tworzenie Canvy głównej

	//Inicjacja
	var PQ_CanvaOutput = document.createElement("canvas");
	PQ_CanvaOutput.style.position = "fixed";
	PQ_CanvaOutput.style.top = 0;
	PQ_CanvaOutput.style.left = 0;	
	PQ_CanvaOutput.setAttribute("width",innerWidth+"px");
	PQ_CanvaOutput.setAttribute("height",innerHeight+"px");
	PQ_CanvaOutput.setAttribute("controls", "none");
	PQ_CanvaOutput.setAttribute("id", "Game_Canvas");
	PQ_CanvaOutput.style.cursor = "none";
	PQ_CanvaOutput.oncontextmenu = function(){return false;};
	PQ_CanvaOutput.style.zIndex = 1;
	PQ_MasterDiv.appendChild(PQ_CanvaOutput);	
	var PQ_DrawOutput = PQ_CanvaOutput.getContext("2d");
	PQ_DrawOutput.PQcontrolInputs = PQ_MasterDiv.PQcontrolInputs;
	
	//Dodatkowe metody
	PQ_DrawOutput.Draw = function(){
		this.drawImage(PQ_CanvaBuffor,0,0);
		this.PQcontrolInputs.mouseDrawCursor(this);
	}
	
////////////////////////////////////////////
//Inicjalizacja

	//Tworzenie okien	
	var Okno1 = new PQwindow(PQ_MasterDiv,50,100,300,400,"OKNO TESTOWE 1",PQ_MasterDiv.PQcontrolInputs);
	PQ_MasterDiv.PQcontrolInputs.mouseDebugOutput = Okno1.windowContent;
	
	
	//Przywitanie
	/*var Okno2 = new PQwindow(PQ_MasterDiv,450,100,300,400,"OKNO TESTOWE 2",PQ_MasterDiv.PQcontrolInputs);	
	Okno2.windowContent.addLine("PirxQuest "+PQ_Version+"<br>");
	Okno2.windowContent.addLine("© Rafał Sputowski "+(new Date).getFullYear());
	Okno2.windowContent.addLine("Welcome "+window.location.href);*/