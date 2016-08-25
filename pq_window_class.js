////////////////////////////////////////////
//ZMIENNE GLOBALNE	

	var PQ_windowHeadFontFamily = "Calibri";
	
////////////////////////////////////////////
//Klasy podrzędne

//Kolory
function color(R,G,B){
	this.R = R;
	this.G = G;
	this.B = B;
	
	this.getRGB = function(){
		if((this.R<256)&&(this.R>-1)&&(this.G<256)&&(this.G>-1)&&(this.B<256)&&(this.B>-1)){
			return "rgb("+this.R+","+this.G+","+this.B+")";
		}else{
			return "none";
		}
	}
} 

////////////////////////////////////////////
//Klasa pq_window2_class

var PQWindowId = 1;											//Unikatowy przedrostek dla nowego okna

function PQwindow(windowParent,x,y,w,h,title,control){
	//////////////////////////////////////////////
	//Parametry ogólne
	//Parametry prywatne
	var windowId = PQWindowId++;								//Unikatowe Id dla okna
	//parametry publiczne			
	this.PQcontrolInputs = control;								//Myszka i klawiatura
	//Akcesory
	this.windowId = function(){
		return windowId;
	}
	
	//////////////////////////////////////////////
	//Okno główne
	//Parametry prywatne
	var paramBodyX = x;											//Położenie bezwzględne w poziomie licząc od lewej krawędzi ekranu
	var paramBodyY = y;											//Położenie bezwzględne w pionie licząc od górnej krawędzi ekranu
	var paramBodyWidth = w;										//Szerokość okna
	var paramBodyLastWidth = 200;								//Ostatnia zapisana szerokość okna - do minimalizacji
	var paramBodyMinWidth = 200;								//Minimalna szerokośc okna
	var paramBodyHeight = h;									//Wysokość okna
	var paramBodyLastHeight = h;								//Ostatnia zapisana wysokość okna - do minimalizacji
	var paramBodyMinHeight = 200;								//Minimalna wysokośc okna
	var paramBodyBorderWidth = 5;								//Szerokość obramowania
	var paramBodyBorderStyle = "solid";							//Styl obramowania
	var paramBodyBorderColor = new color(79,129,189);			//Kolor obramowania
	var paramBodyBackgroundColor = new color(-255,255,255);		//Kolor tła	
	
	var paramContentBackgroundColor = new color(255,255,255);	//Kolor tła zawartości okna
	var paramContentFontColor = new color(0,0,0);				//Kolor czcionki zawartości okna
	var paramContentFontSize = 12;								//Wysokość czcionki zawartości okna
	
	//Parametry publiczne
	this.bodyContent = [];										//Tablica obiektów związanych z oknem
	this.windowBody = {};										//Obiekt DOM okna głównego	
	//Metody prywatne
	
	//Metody publiczne
	this.bodyX = function(param){
		if(param===undefined){
			return paramBodyX;
		}else{
			paramBodyX = param;
			this.windowBody.style.left = paramBodyX+"px";
			if(this.windowResizer!==undefined){this.windowResizer.style.left = this.bodyX(undefined)+this.bodyWidth(undefined)+2*this.bodyBorderWidth(undefined)-10+"px";}
		}
	}
	this.bodyY = function(param){
		if(param===undefined){
			return paramBodyY;
		}else{
			paramBodyY = param;
			this.windowBody.style.top = paramBodyY+"px";
			if(this.windowResizer!==undefined){this.windowResizer.style.top = this.bodyY(undefined)+this.bodyHeight(undefined)+2*this.bodyBorderWidth(undefined)-10+"px";}
		}
	}	
	this.bodyWidth = function(param){
		if(param===undefined){
			return paramBodyWidth;
		}else{
			paramBodyWidth = param;
			this.windowBody.style.width = paramBodyWidth+"px";
			if(this.windowResizer!==undefined){this.windowResizer.style.left = this.bodyX(undefined)+this.bodyWidth(undefined)+2*this.bodyBorderWidth(undefined)-10+"px";}
		}
	}	
	this.bodyHeight = function(param){
		if(param===undefined){
			return paramBodyHeight;
		}else{
			paramBodyHeight = param;
			this.windowBody.style.height = paramBodyHeight+"px";
			if(this.windowResizer!==undefined){this.windowResizer.style.top = this.bodyY(undefined)+this.bodyHeight(undefined)+2*this.bodyBorderWidth(undefined)-10+"px";}
		}
	}
	this.bodyBorderWidth = function(param){
		if(param===undefined){
			return paramBodyBorderWidth;
		}else{
			paramBodyBorderWidth = param;
			this.windowBody.style.border = paramBodyBorderWidth+"px "+paramBodyBorderStyle+" "+paramBodyBorderColor.getRGB();
			if(this.windowResizer!==undefined){this.windowResizer.style.left = this.bodyX(undefined)+this.bodyWidth(undefined)+2*this.bodyBorderWidth(undefined)-10+"px";}
			if(this.windowResizer!==undefined){this.windowResizer.style.top = this.bodyY(undefined)+this.bodyHeight(undefined)+2*this.bodyBorderWidth(undefined)-10+"px";}
		}
	}
	this.bodyBorderStyle = function(param){
		if(param===undefined){
			return paramBodyBorderStyle;
		}else{
			paramBodyBorderStyle = param;
			this.windowBody.style.border = paramBodyBorderWidth+"px "+paramBodyBorderStyle+" "+paramBodyBorderColor.getRGB();
		}
	}
	this.bodyBorderColor = function(param){
		if(param===undefined){
			return paramBodyBorderColor;
		}else{
			paramBodyBorderColor = param;
			this.windowBody.style.border = paramBodyBorderWidth+"px "+paramBodyBorderStyle+" "+paramBodyBorderColor.getRGB();
		}
	}		
	this.bodyBackgroundColor = function(param){
		if(param===undefined){
			return paramBodyBackgroundColor;
		}else{
			paramBodyBackgroundColor = param;
			this.windowBody.style.backgroundColor = paramBodyBackgroundColor.getRGB();
		}
	}		
	//Zdarzenia
	this.draging = function(x,y){
		this.bodyX(paramBodyX+x);
		this.bodyY(paramBodyY+y);
	}
	
	//Dodanie obiektu DOM
	this.windowBody = document.createElement("div");
	windowParent.appendChild(this.windowBody);
	//Ustalenie prywatnych parametrów obiektu DOM
	this.bodyX(x);											
	this.bodyY(y);											
	this.bodyWidth(w);										
	this.bodyHeight(h);		
	this.bodyBorderWidth(paramBodyBorderWidth);								
	this.bodyBorderStyle(paramBodyBorderStyle);							
	this.bodyBorderColor(paramBodyBorderColor);			
	this.bodyBackgroundColor(paramBodyBackgroundColor);	
	//Ustalenie publicznych parametrów obiektu DOM	
	this.windowBody.setAttribute("class","windowBody");
	this.windowBody.setAttribute("id",this.windowId()+"_windowBody");
	this.windowBody.style.position = "fixed";
	this.windowBody.style.padding = "0px";
	this.windowBody.style.overflowX = "hidden";
	this.windowBody.style.overflowY = "hidden";		
	this.windowBody.style.zIndex = 1;
	//Odwołanie do instancji obiektu
	this.windowBody.PQwindow = this;
	
	//////////////////////////////////////////////
	//Nagłówek okna
	//Parametry prywatne	
	var paramHeadTitle = title;									//Tytuł nagłówka
	var paramHeadBackgroundColor = new color(79,129,189);		//Kolor tła nagłówka
	var paramHeadFontColor = new color(255,255,255);			//Kolor czcionki nagłówka
	var paramHeadFontSize = 15;									//Wysokość czcionki w nagłówku	
	//Parametry publiczne
	this.windowHead = {};										//Obiekt DOM nagłówka
	this.headContent = [];										//Tablica obiektów związanych z nagłówkiem
	//Metody prywatne

	//Metody publiczne
	this.headTitle = function(param){
		if(param===undefined){
			return paramHeadTitle;
		}else{
			paramHeadTitle = param;
			this.windowHead.innerHTML = paramHeadTitle;
		}
	}	
	this.headBackgroundColor = function(param){
		if(param===undefined){
			return paramHeadBackgroundColor;
		}else{
			paramHeadBackgroundColor = param;
			this.windowHead.style.backgroundColor = paramHeadBackgroundColor.getRGB();
		}
	}
	this.headFontColor = function(param){
		if(param===undefined){
			return paramHeadFontColor;
		}else{
			paramHeadFontColor = param;
			this.windowHead.style.color = paramHeadFontColor.getRGB();
		}
	}	
	//Dodanie obiektu DOM
	this.windowHead = document.createElement("div");
	this.windowBody.appendChild(this.windowHead);	
	//Ustalenie prywatnych parametrów obiektu DOM
	this.headTitle(paramHeadTitle);
	this.headBackgroundColor(paramHeadBackgroundColor);
	this.headFontColor(paramHeadFontColor);	
	//Ustalenie publicznych parametrów obiektu DOM	
	this.windowHead.setAttribute("class","windowHead");
	this.windowHead.setAttribute("id",this.windowId()+"_windowHead");
	this.windowHead.style.padding = "3px";
	this.windowHead.style.overflowX = "hidden";
	this.windowHead.style.overflowY = "hidden";		
	this.windowHead.style.width = "100%";		
	this.windowHead.style.fontSize = paramHeadFontSize+"px";	
	this.windowHead.style.fontWeigth = "bold";	
	this.windowHead.style.fontFamily = PQ_windowHeadFontFamily;	
	//Odwołanie do instancji obiektu
	this.windowHead.PQwindow = this;
	//Metody publiczne DOM
	this.windowHead.dblClick = function(){
		if(this.PQwindow.windowContent.style.display==="none"){
			this.PQwindow.bodyHeight(paramBodyLastHeight);
			this.PQwindow.bodyWidth(paramBodyLastWidth);
			this.PQwindow.windowContent.style.display = "block";
			this.PQwindow.windowResizer.style.display = "block";
		}else{
			paramBodyLastHeight = this.PQwindow.bodyHeight(undefined);
			paramBodyLastWidth = this.PQwindow.bodyWidth(undefined);
			this.PQwindow.bodyHeight(22);			
			this.PQwindow.bodyWidth(paramBodyMinWidth);			
			this.PQwindow.windowContent.style.display = "none";
			this.PQwindow.windowResizer.style.display = "none";
		}	
	}
	this.windowHead.mouseDown = function(){
		this.PQcontrolInputs.mouseDragedItems[this.PQcontrolInputs.mouseDragedItems.length] = this;
	}
	this.windowHead.draging = function(dX,dY){
		this.PQwindow.bodyX(this.PQwindow.bodyX(undefined)+dX);
		this.PQwindow.bodyY(this.PQwindow.bodyY(undefined)+dY);
	}
	//Zdarzenia
	this.PQcontrolInputs.mouseAddEvent("dblclick",this.windowHead,function(){this.dblClick();});
	this.PQcontrolInputs.mouseAddEvent("mousedown",this.windowHead,function(){this.mouseDown();});
	
	//////////////////////////////////////////////
	//Resizer okna
	//Dodanie obiektu DOM
	this.windowResizer = document.createElement("div");
	this.windowBody.appendChild(this.windowResizer);	
	//Ustalenie prywatnych parametrów obiektu DOM

	//Ustalenie publicznych parametrów obiektu DOM	
	this.windowResizer.setAttribute("class","windowResizer");
	this.windowResizer.setAttribute("id",this.windowId()+"_windowResizer");
	this.windowResizer.style.position = "fixed";
	this.windowResizer.style.left = this.bodyX(undefined)+this.bodyWidth(undefined)+2*this.bodyBorderWidth(undefined)-10+"px";
	this.windowResizer.style.top = this.bodyY(undefined)+this.bodyHeight(undefined)+2*this.bodyBorderWidth(undefined)-10+"px";
	this.windowResizer.style.padding = "0px";
	this.windowResizer.style.overflowX = "hidden";
	this.windowResizer.style.overflowY = "hidden";		
	this.windowResizer.style.width = "10px";		
	this.windowResizer.style.height = "10px";		
	this.windowResizer.style.cursor = "nwse-resize";
	this.windowResizer.style.backgroundColor = "none";
	//Odwołanie do instancji obiektu
	this.windowResizer.PQwindow = this;	
	//Metody publiczne DOM
	this.windowResizer.mouseDown = function(){
		this.PQcontrolInputs.mouseDragedItems[this.PQcontrolInputs.mouseDragedItems.length] = this;
	}	
	this.windowResizer.draging = function(dX,dY){
		if((this.PQwindow.bodyWidth(undefined)+dX)>paramBodyMinWidth){this.PQwindow.bodyWidth(this.PQwindow.bodyWidth(undefined)+dX);}
		if((this.PQwindow.bodyHeight(undefined)+dX)>paramBodyMinHeight){this.PQwindow.bodyHeight(this.PQwindow.bodyHeight(undefined)+dY);}
	}	
	//Zdarzenia
	//this.PQcontrolInputs.mouseAddEvent("dblclick",this.windowResizer,function(){this.dblClick();});
	this.PQcontrolInputs.mouseAddEvent("mousedown",this.windowResizer,function(){this.mouseDown();});
	
	//////////////////////////////////////////////
	//Treści okna
	//this.windowContent = [];								//Tablica obiektów związanych z treścią okna	
	//Dodanie obiektu DOM
	this.windowContent = document.createElement("div");
	this.windowBody.appendChild(this.windowContent);	
	//Ustalenie prywatnych parametrów obiektu DOM

	//Ustalenie publicznych parametrów obiektu DOM	
	this.windowContent.setAttribute("class","windowContent");
	this.windowContent.setAttribute("id",this.windowId()+"_windowContent");
	this.windowContent.style.padding = "3px";
	this.windowContent.style.overflowX = "hidden";
	this.windowContent.style.overflowY = "auto";		
	this.windowContent.style.width = "100%";		
	this.windowContent.style.height = "100%";		
	this.windowContent.style.fontSize = paramContentFontSize+"px";	
	this.windowContent.style.fontWeigth = "normal";	
	this.windowContent.style.fontFamily = PQ_windowHeadFontFamily;	
	this.windowContent.style.color = paramContentFontColor.getRGB();	
	this.windowContent.style.backgroundColor = paramContentBackgroundColor.getRGB();	
	//Odwołanie do instancji obiektu
	this.windowContent.PQwindow = this;	
	//Metody publiczne
	this.windowContent.showText = function(str){
		this.innerHTML = str;
	}
	this.windowContent.addLine = function(str){
		this.inneHTML =+ str;
	}
	
}

	