////////////////////////////////////////////
//ZMIENNE GLOBALNE- MASTER DIV

	var PQ_MasterDiv = {}		//Nadrzędny element tworzący div z interfacem, jedyna zmienna zewnętrzna

//Inicjalizacja
	
	PQ_MasterDiv = document.createElement("div");
	document.querySelector('body').appendChild(PQ_MasterDiv);
	
	PQ_MasterDiv.setAttribute("class","masterDiv");
	PQ_MasterDiv.setAttribute("id","masterDiv");
	PQ_MasterDiv.style.width = innerWidth+"px";
	PQ_MasterDiv.style.height = innerHeight+"px";
	PQ_MasterDiv.style.backgroundColor = "black";
	PQ_MasterDiv.style.position = "fixed";
	PQ_MasterDiv.style.top = "0px";
	PQ_MasterDiv.style.left = "0px";
	PQ_MasterDiv.style.margin = "0px";
	PQ_MasterDiv.style.padding = "0px";
	PQ_MasterDiv.style.overflowX = "hidden";
	PQ_MasterDiv.style.overflowY = "hidden";		
	PQ_MasterDiv.style.zIndex = 0;