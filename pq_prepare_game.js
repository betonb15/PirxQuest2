////////////////////////////////////////////
//ZMIENNE GLOBALNE
	var PQ_Version = "0.2.0.1";									//Wersja gry
	var PQ_Inputs = new PQcontrolInputs(undefined,undefined);	//Inicjalizacja myszki i klawiatury

////////////////////////////////////////////
//Tworzenie Canvy bufora

	//Inicjacja
	/*PQ_CanvaBuffor = document.createElement("canvas");
	PQ_CanvaBuffor.setAttribute("width",PQ_CanvaWidth);
	PQ_CanvaBuffor.setAttribute("height",PQ_CanvaHeight);	
	PQ_DrawBuffor = PQ_CanvaBuffor.getContext("2d");

	//Dodatkowe metody
	PQ_DrawBuffor.Clear = function(){
		this.fillStyle = '#000000';
		this.fillRect(0,0,PQ_DrawOutput.canvas.clientWidth,PQ_DrawOutput.canvas.clientHeight);
		
		this.font = "12px Arial";
		this.fillStyle = "white";
		this.textAlign = "left";			
		this.fillText("Pirx Quest v"+PQ_Version+" © Rafał Sputowski "+(new Date).getFullYear(),1,14);
	}
	
	
////////////////////////////////////////////
//Tworzenie Canvy głównej

	//Inicjacja
	PQ_CanvaOutput = document.createElement("canvas");
	PQ_CanvaOutput.style.position = "fixed";
	PQ_CanvaOutput.style.top = 0;
	PQ_CanvaOutput.style.left = 0;	
	PQ_CanvaOutput.setAttribute("width",PQ_CanvaWidth);
	PQ_CanvaOutput.setAttribute("height",PQ_CanvaHeight);
	PQ_CanvaOutput.setAttribute("controls", "none");
	PQ_CanvaOutput.setAttribute("tabindex", "1");//To jest potrzebne żeby można było przejąć zdarzenie onkeyup/down
	PQ_CanvaOutput.style.cursor = "none";
	PQ_CanvaOutput.oncontextmenu = function(){return false;};
	document.body.appendChild(PQ_CanvaOutput);	
	PQ_DrawOutput = PQ_CanvaOutput.getContext("2d");

	//Dodatkowe metody
	PQ_DrawOutput.Draw = function(){
		this.drawImage(PQ_CanvaBuffor,0,0);
	}*/
	
////////////////////////////////////////////
//Inicjalizacja

	//Tworzenie okien
	
	var Okno1 = new PQwindow(document.body,50,100,300,400,"OKNO TESTOWE 1",document.body.PQcontrolInputs);
	document.body.PQcontrolInputs.mouseDebugOutput = Okno1.windowContent;
	
	
	//Przywitanie
	//PQ_DebugOutput.addLine("PirxQuest "+PQ_Version+"<br>");
	//PQ_DebugOutput.addLine("© Rafał Sputowski "+(new Date).getFullYear());
	//PQ_DebugOutput.addLine("Welcome "+window.location.href);