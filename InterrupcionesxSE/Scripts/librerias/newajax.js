var contents = '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)';
/**
* Eval script fragment
* @return String
*/
String.prototype.evalScript = function()
{
        return (this.match(new RegExp(contents, 'img')) || []).evalScript();
};
/**
* strip script fragment
* @return String
*/
String.prototype.stripScript = function()
{
        return this.replace(new RegExp(contents, 'img'), '');
};
/**
* extract script fragment
* @return String
*/
String.prototype.extractScript = function()
{
        var matchAll = new RegExp(contents, 'img');
        return (this.match(matchAll) || []);
};
/**
* Eval scripts
* @return String
*/
Array.prototype.evalScript = function(extracted)
{
				var s=this.map(function(sr){
				var sc=(sr.match(new RegExp(contents, 'im')) || ['', ''])[1];
				//if(window.ActiveXObject && window.execScript){
				if(window.execScript){
				    //alert('execscript');
					window.execScript(sc);
				}
				else
				{
			      //alert('timeout');		
				  window.setTimeout(sc,0);
				}
				});
				return true;
};
/**
* Map array elements
* @param {Function} fun
* @return Function
*/
Array.prototype.map = function(fun)
{
        if(typeof fun!=="function"){return false;}
        var i = 0, l = this.length;
        for(i=0;i<l;i++)
        {
                fun(this[i]);
        }
        return true;
};  

function AJAX2(){
	var ajaxs = ["XHTML 1.0","Msxml2.XMLHTTP","Msxml2.XMLHTTP.4.0","Msxml2.XMLH TTP.5.0","Msxml2.XMLHTTP.3.0","Microsoft.XMLHTTP"];
	var ajax = false;
	for(var i=0 ; !ajax && i<ajaxs.length ; i++){
		try{ 
			ajax = new ActiveXObject(ajaxs[i]); 
		}
		catch(e) { 
			ajax = false; 
		}
	}
	if(!ajax && typeof XMLHttpRequest!='undefined') {
		ajax = new XMLHttpRequest();
	}
	return ajax;
}

function getPagina(pagina,capa){
	/* PARA EL CASO DEL GIF REDONDO
	if(!sw){
	  document.getElementById(capa).innerHTML = "<br><br><br><center><img src='imagenes/loading.gif' style='width:100px; height:100px;'><br><label style='font-family:arial; font-size:12px; color:#6E6E6E'>Cargando...</label></center>"; 
	}
	
	if(!sw){
	  document.getElementById(capa).innerHTML = "<br><br><br><center><img src='imagenes/loading.gif'></center>"; 
	}
	*/
	var ajax = AJAX2(); 
	if(!ajax){
		document.getElementById(capa).innerHTML = "Error: El navegador no acepta ActiveX. No se pudo cargar la pagina.";
		return false;
	}

	ajax.open("GET",pagina,true);
	
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) { 
		   var scs=ajax.responseText.extractScript();
      //document.getElementById(capa).innerHTML=ajax.responseText.stripScript();
	  document.getElementById(capa).innerHTML=ajax.responseText;
      scs.evalScript();  
		}
	}
	
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send(null);
}