define([
  "js/core/services",
  "js/core/menu", 

], function(
  Services,
  Menu,

) {

	// LAYERS (SECTORES)
	var __mil_operacion = Services.getMilOperacion();
	var __mil_alerta = Services.getMilAlerta();
	var __mil_proyectos = Services.getMilProyectos();

	var __mil_datmosf = Services.getMilDA();
	var __mil_pi = Services.getMilPI();
	var __mil_drone = Services.getMilDrone();
	var __mil_event = Services.getMilER();
	var __mil_pe = Services.getMilPE();
	var __mil_concesionelectrica = Services.getMilConcesionElectrica();
	var __gru_extra = Services.getGruExtra();

	var __gru_catografico = Services.getGruCartografico();
	var __gru_externo = Services.getGruExterno();
	var __gru_aniadido = Services.getGruAniadido();


	// VARIABLES PARA PERMISOS 
	var __sectorsallowed = [__mil_operacion];
	var __permisos_layers = ['SistemasOperacion'];
	var __permisos_generals = [];
	var __permisos_tools = [];
	var __permisos_actionsgroup = [];
	var __permisos_others = [];
	

	verifyLogin();

	function verifyLogin() {
	  let user = Cookies.get('user');
	  if (typeof user === 'undefined') {
	    hideUserMenu();
	  } else {
	    let isadmin = (Cookies.get('isadmin') || Cookies.get('issuperadmin')) ? true : false;
	    if (isadmin) {
	    	fillPermisosAdmin();
	    	$('#link_admin').attr('href', `admin.html?${Cookies.get('token')}`);
	    } else {
	      	fillPermisosUser();
	    }
	    showUserMenu(user);
	    loadNewMainMenu();
	  }
	}

	function fillPermisosAdmin(){
		__gru_extra.addMany([__mil_pe, __mil_concesionelectrica, __mil_drone, __mil_datmosf, __mil_pi, __mil_event]);
		__sectorsallowed = [__gru_aniadido, __gru_externo, __gru_catografico, __gru_extra, __mil_proyectos, __mil_alerta, __mil_operacion];
		__permisos_layers = ["SistemasOperacion", "SistemasAlerta", "Proyectos", "EventosRelevantes", "DescargasAtmosfericas", "PlanInversiones", "InformacionGrafica", "Cartografia", "FuentesExternas", "ConcesoriaElectrica", 'PuntoEntrega' ];
		__permisos_actionsgroup = ["BuscarCapa", "BuscarGrupo", "FiltrarPeriodo", "FiltrarEmpresa", "BusquedaUbigeo", "OtrosDocsIndicadores", "Informes", "EventosSein", 'FiltrarPETension', 'FiltrarPECliente', 'SearchPE'];
		__permisos_generals = ["Admin", "EventosSein", "ConsultaAvanzada", "Informes", "MapaBase", "ManualUsuario"];
		__permisos_tools = ["AreaInfluencia", "Dibujar", "PerfilLong", "AniadirCapa", "Imprimir"];
		__permisos_others = ["ExportarTabla", "AccionesPopup"];
	}

	function fillPermisosUser() {	

	  //Permisos de Capas de información	  
	  if (Cookies.get('lyr_sa')) {
	    __sectorsallowed.unshift(__mil_alerta);
	    __permisos_layers.push('SistemasAlerta');
	  }
	  if (Cookies.get('lyr_pr')) {
	    __sectorsallowed.unshift(__mil_proyectos);
	    __permisos_layers.push('Proyectos');
	  }
	  // Para capas ubicadas dentro del grupo Extras
	  if (Cookies.get('lyr_er') || Cookies.get('lyr_da') || Cookies.get('lyr_pi') || Cookies.get('lyr_ig') || Cookies.get('lyr_pe') || Cookies.get('lyr-ce')) {
	    __sectorsallowed.unshift(__gru_extra);

	    if (Cookies.get('lyr_er')) {
	      __gru_extra.add(__mil_event);
	      __permisos_layers.push('EventosRelevantes');
	    }
	    if (Cookies.get('lyr_da')) {
	      __gru_extra.add(__mil_datmosf);
	      __permisos_layers.push('DescargasAtmosfericas');
	    }
	    if (Cookies.get('lyr_pi')) {
	      __gru_extra.add(__mil_pi);
	      __permisos_layers.push('PlanInversiones');
	    }
	    if (Cookies.get('lyr_ig')) {
	      __gru_extra.add(__mil_drone);
	      __permisos_layers.push('InformacionGrafica');
		}
		if (Cookies.get('lyr_pe')){
			__gru_extra.add(__mil_pe);
			__permisos_layers.push('PuntoEntrega');
		}
		if (Cookies.get('lyr_ce')){
			__gru_extra.add(__mil_concesionelectrica);
			__permisos_layers.push('ConcesoriaElectrica');
		}
	  }
	  if (Cookies.get('lyr_ca')) {
	    __sectorsallowed.unshift(__gru_catografico);
	    __permisos_layers.push('Cartografia');
	  }
	  if (Cookies.get('lyr_fe')) {
	    __sectorsallowed.unshift(__gru_externo);
	    __permisos_layers.push('FuentesExternas');
	  }

	  // Permisos de Acciones de grupo (widgets de Grupo de capas)
	  if (Cookies.get('gru_bcap')) {
	    __permisos_actionsgroup.push('BuscarCapa');
	  }
	  if (Cookies.get('gru_bgru')) {
	    __permisos_actionsgroup.push('BuscarGrupo');
	  }
	  if (Cookies.get('gru_fper')) {
	    __permisos_actionsgroup.push('FiltrarPeriodo');
	  }
	  if (Cookies.get('gru_femp')) {
	    __permisos_actionsgroup.push('FiltrarEmpresa');
	  }
	  if (Cookies.get('gru_bubi')) {
	    __permisos_actionsgroup.push('BusquedaUbigeo');
	  }
	  if (Cookies.get('gru_bind')) {
	    __permisos_actionsgroup.push('OtrosDocsIndicadores');
	  }
	  if (Cookies.get('gru_ften')) {
	    __permisos_actionsgroup.push('FiltrarPETension');
	  }
	  if (Cookies.get('gru_fcli')) {
	    __permisos_actionsgroup.push('FiltrarPECliente');
	  }
	  if (Cookies.get('gru_bpe')) {
	    __permisos_actionsgroup.push('SearchPE');
	  }		

	  // Informes y Eventos Coes: se añade según permisos generales en Menu	  

	  // Permisos de Widgets Generales del Menu principal
	  if (Cookies.get('menu_evts')) {
	    __permisos_generals.push('EventosSein');
	    __permisos_actionsgroup.push('EventosSein');
	  }
	  if (Cookies.get('menu_cava')) {
	    __permisos_generals.push('ConsultaAvanzada');
	  }
	  if (Cookies.get('menu_info')) {
	    __permisos_generals.push('Informes');
	    __permisos_actionsgroup.push('Informes');
	  }
	  if (Cookies.get('menu_base')) {
	    __permisos_generals.push('MapaBase');
	  }
	  if (Cookies.get('menu_manu')) {
	    __permisos_generals.push('ManualUsuario');
	  }

	  // Permisos de Widgets del Menu Herramientas
	  if (Cookies.get('tool_inf')) {
	    __permisos_tools.push('AreaInfluencia');
	  }
	  if (Cookies.get('tool_dib')) {
	    __permisos_tools.push('Dibujar');
	  }
	  if (Cookies.get('tool_pl')) {
	    __permisos_tools.push('PerfilLong');
	  }
	  if (Cookies.get('tool_lyr')) {
	    __permisos_tools.push('AniadirCapa');
	    __sectorsallowed.unshift(__gru_aniadido);
	  }
	  if (Cookies.get('tool_imp')) {
	    __permisos_tools.push('Imprimir');
	  }

	  // Otros Permisos
	  if (Cookies.get('otro_exp')) {
	  	__permisos_others.push('ExportarTabla');
	  } 
	  if (Cookies.get('otro_aap')) {
	  	__permisos_others.push('AccionesPopup');
	  } 
	}

	function loadNewMainMenu(){
		let newmenu = Menu.getNewMainMenu(__permisos_generals, __permisos_tools); 
		$('#ul_menu').html(newmenu); 
		//mostrar/ocultar directamente DOM en función de los permisos
		(__permisos_generals.indexOf('Admin') != -1) ? $('#div_menu #li_manualadmin').removeClass('notvisible').addClass('visible') : '';
	}

	function showUserMenu(username){
		$('#btn_login').removeClass("visible").addClass("notvisible");
		$('#menu_logged').removeClass("notvisible").addClass("visible");
		$('.item-protected').removeClass("notvisible").addClass("visible");
		$('#name_user').text(username);
	}

	function hideUserMenu(){
		$('#menu_logged').removeClass("visible").addClass("notvisible");
		$('#btn_login').removeClass("notvisible").addClass("visible");
		$('.item-protected').removeClass("visible").addClass("notvisible");
		$('#name_user').text('');
	}


	return {
		getSectorsAllowed: function(){
			return __sectorsallowed;
		}, 
		getPermisosLayers: function(){
			return __permisos_layers;
		}, 
		getPermisosGenerals: function(){
			return __permisos_generals;
		},
		getPermisosTools: function(){
			return __permisos_tools;
		},
		getPermisosActionsgroup: function(){
			return __permisos_actionsgroup;
		},
		getPermisosOthers: function(){
			return __permisos_others;
		}
	}

});

/* REVISADO ♣ */