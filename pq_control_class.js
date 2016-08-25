////////////////////////////////////////////
//ZMIENNE GLOBALNE	
	

	
////////////////////////////////////////////
//Klasa PQinputs
	
	function PQcontrolInputs(mouseTextOutput,keyboardTextOutput){
		//Parametry publiczne
		this.mouseX = 0;										//Położenie kursora na X
		this.mouseY = 0;										//Położenie kursora na Y
		this.mouseLastX = 0;									//Poprzednie położenie kursora na X
		this.mouseLastY = 0;									//Poprzednie położenie kursora na Y
		this.mouseLeft = false;									//Wciśnięty lewy przycisk myszy
		this.mouseRight = false;								//Wciśnięty przwy przycisk myszy
		this.mouseMiddle = false;								//Wciśnięty środkowy przycisk myszy
		this.mouseScrollUp = false;								//Skroll w górę
		this.mouseScrollDown = false;							//Skroll w dół
		this.mouseDragedItems = [];								//Obiekty które prezciąga mysz
		this.mouseDebugOutput = mouseTextOutput;				//Element kontrolowany przez mysz
		
		this.keyboardKeyPressed = '';							//Wciśnięty klawisz klawiatury
		this.keyboardDebugOutput = keyboardTextOutput;			//Wyjście tekstowe dla klawiatury
		
		//Metody publiczne
		this.mouseDX = function(){								//Zmiana położenia kursora na X
			return (this.mouseX - this.mouseLastX);
		}		
		this.mouseDY = function(){								//Zmiana położenia kursora na Y
			return (this.mouseY - this.mouseLastY);
		}
		
		this.mouseAddEvent = function(eventName,input,execute){
			input.PQcontrolInputs = this;
			input.addEventListener(eventName,execute)
		}		
		this.mouseGetStatus = function(input){
			if((input.PQcontrolInputs.mouseDebugOutput!==undefined)&&((input.PQcontrolInputs.mouseDebugOutput.showText!==undefined))){
			var str = "Mouse current pos: ["+input.PQcontrolInputs.mouseX+","+input.PQcontrolInputs.mouseY+"]<br/>Mouse last pos: ["+input.PQcontrolInputs.mouseLastX+","+input.PQcontrolInputs.mouseLastY+"]<br/>Mouse change: ["+input.PQcontrolInputs.mouseDX()+","+input.PQcontrolInputs.mouseDY()+"]<br/>Mouse buttons: [L="+input.PQcontrolInputs.mouseLeft.toString()+",M="+input.PQcontrolInputs.mouseMiddle.toString()+",R="+input.PQcontrolInputs.mouseRight.toString()+"]<br/>Mouse scroll: [Up: "+input.PQcontrolInputs.mouseScrollUp.toString()+",Down: "+input.PQcontrolInputs.mouseScrollDown.toString()+"]<br/>Draged items:"
				for(var i=0;i<input.PQcontrolInputs.mouseDragedItems.length;i++){
					str += "<br/>ID: "+input.PQcontrolInputs.mouseDragedItems[i].id.toString();
				}	
				str += "<br/>Cursor wskazuje: "+event.target.id;
				input.PQcontrolInputs.mouseDebugOutput.showText(str);				
			}
		}
		this.mouseMove = function(input){
			input.PQcontrolInputs.mouseLastX = input.PQcontrolInputs.mouseX;
			input.PQcontrolInputs.mouseLastY = input.PQcontrolInputs.mouseY;			
			input.PQcontrolInputs.mouseX = event.clientX;
			input.PQcontrolInputs.mouseY = event.clientY;
			input.PQcontrolInputs.mouseGetStatus(input);
			for(var i=0;i<this.mouseDragedItems.length;i++){
				if(this.mouseDragedItems[i].draging!==undefined){
					this.mouseDragedItems[i].draging(this.mouseDX(),this.mouseDY());
				}
			}
		}
		this.mouseDown = function(input){
			if (event.button == 0){//wciśnięcie lewego klawisza myszy
				input.PQcontrolInputs.mouseLeft = true;
				input.PQcontrolInputs.mouseGetStatus(input);
				//input.PQcontrolInputs.mouseDragedItems[input.PQcontrolInputs.mouseDragedItems.length] = event.target;				
			}
			if (event.button == 1){//wciśnięcie scrolla
				input.PQcontrolInputs.mouseMiddle = true;
				input.PQcontrolInputs.mouseGetStatus(input);
			}
			if (event.button == 2){//wciśnięcie prawego klawisza myszy
				input.PQcontrolInputs.mouseRight = true;
				input.PQcontrolInputs.mouseGetStatus(input);
			}
			input.PQcontrolInputs.mouseGetStatus(input);
		}
		this.mouseUp = function(input){
			if (event.button == 0){//puszczenie lewego klawisza myszy
				input.PQcontrolInputs.mouseLeft = false;
				input.PQcontrolInputs.mouseGetStatus(input);							
			}
			if (event.button == 1){//puszczenie scrolla
				input.PQcontrolInputs.mouseMiddle = false;
				input.PQcontrolInputs.mouseGetStatus(input);
			}
			if (event.button == 2){//puszczenie prawego klawisza myszy
				input.PQcontrolInputs.mouseRight = false;
				input.PQcontrolInputs.mouseGetStatus(input);
			}
			input.PQcontrolInputs.mouseDragedItems = [];
			input.PQcontrolInputs.mouseGetStatus(input);
		}
		this.mouseWheel = function(input){
			if (event.wheelDelta < 0){//Scroll w górę
				input.PQcontrolInputs.mouseScrollUp = true;
				input.PQcontrolInputs.mouseScrollDown = false;
			} 
			if (event.wheelDelta > 0){//Scroll w dół
				input.PQcontrolInputs.mouseScrollUp = false;
				input.PQcontrolInputs.mouseScrollDown = true;
			}
			input.PQcontrolInputs.mouseGetStatus(input);			
		}
		
		//Podpięcie zdarzeń myszy
		this.mouseAddEvent("mousemove",document.querySelector('body'),function(){document.querySelector('body').PQcontrolInputs.mouseMove(this);});
		this.mouseAddEvent("mousedown",document.querySelector('body'),function(){document.querySelector('body').PQcontrolInputs.mouseDown(this);});
		this.mouseAddEvent("mouseup",document.querySelector('body'),function(){document.querySelector('body').PQcontrolInputs.mouseUp(this);});
		this.mouseAddEvent("mousewheel",document.querySelector('body'),function(){document.querySelector('body').PQcontrolInputs.mouseWheel(this);});		
	}