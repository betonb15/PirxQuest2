////////////////////////////////////////////
//ZMIENNE GLOBALNE
	
	var PQ_Xhttp = {};								//Objekt XMLHttpRequest
	var PQ_QuietLogs = true;						//false - drukowane są zapytania i odpowiedzi serwera

////////////////////////////////////////////
//Objekt XMLHttpRequest

	//Inicjalizacja
	if(window.XMLHttpRequest){
		PQ_Xhttp = new XMLHttpRequest();
		//PQ_DebugOutput.addLine("Utworzono XMLHttpRequest.");
	}else if(window.ActiveXObject){
		PQ_Xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		//PQ_DebugOutput.addLine("Utworzono XMLHttpRequest.");
	}
	
	//Dodatkowe pola
	PQ_Xhttp.OpenConnection = 0;				//Liczba wykonanych prób połączenia z serwerem
	PQ_Xhttp.SuccesfullConnection = 0;			//Liczba otrzymanych odpowiedź z serwera
	
	//Dodatkowe metody
	PQ_Xhttp.SerwerQuery = function(URL,DataPacked,ExecuteFunction){
		this.OpenTime = new Date();
		this.open("POST",URL,false);
		if(!PQ_QuietLogs){
			//PQ_DebugOutput.addLine("Serwer @"+URL+" pytanie : "+DataPacked);
		}
		PQ_Xhttp.ConnectionIndex++;
		this.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.send(DataPacked);
		this.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200) {
				ExecuteFunction(this.responseText);
				PQ_Xhttp.SuccesfullConnection++;
				if(!PQ_QuietLogs){
					//PQ_DebugOutput.addLine("Serwer @"+URL+" odpowiedział : "+this.responseText);
				}
			}
		}
	}