define([], function () {

	var item_eventos_sein = `
		<li class="dropdown">
		  <a href="#" role="button" class="dropdown-toggle item-menu" data-subcontainer="" id="btn_menuevents" data-toggle="dropdown" aria-haspopup="true">
		    <img src="img/menuevents.png" >
		    <span class="notvisible" id="lbl_numevents" class="lbl-numevents"></span>
		  </a>
		  <ul class="dropdown-menu container-evento" id='lst_events_preview'>              
		    <li class="lbl-evento-btn text-center" id="li_vermas_events">
		      <hr> 
		      <a href="#" class="btn-vermas" data-toggle="modal" data-target="#wg_eventscoes"> Ver más</a>
		    </li>
		  </ul>
		</li>`;

	var item_capas = `
		<li>
		  <a href="#" role="button" class="item-menu" data-subcontainer="#wg_lyl_sein">
		    <img src="img/menulayers.png" data-toggle="tooltip" data-placement="left" title='Capas de Información'>
		  </a>
		</li> `;

	var item_consulta_avanzada = `
		<li>
		  <a href="#" role="button" class="item-menu" data-subcontainer="#wg_search_advanced">
		    <img src="img/menusearch.png" data-toggle="tooltip" data-placement="left" title='Consulta Avanzada'>
		  </a>
		</li>`;


	var item_herramientas_default = `
		<li class="dropdown">
		  <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true">  
		    <img src="img/menutool.png">
		  </a>
		  <ul class="dropdown-menu">		    
		    <li><a class="dropdown-item item-menu modo2d" data-subcontainer="#wg_medir2d" href="#"><img src="img/widget/medir.png" alt="medir"> Medir</a></li>
		    <li><a class="dropdown-item item-menu" data-subcontainer="#wg_searchxy" href="#"><img src="img/widget/buscarXY.png" alt="buscarxy"> Buscar Coordenada</a></li>
		    <li><a class="dropdown-item item-menu" data-subcontainer="#wg_streetview" href="#" id="btn_menusv"><img src="img/widget/pegman-md.png"> Street View</a> </li>		    
		  </ul>
		</li> `;

	var item_informes = `
		<li>
		  <a href="#" role="button" class="item-menu" data-subcontainer="#wg_reports">
		    <img src="img/menureports.png" data-toggle="tooltip" data-placement="left" title='Informes'>
		  </a>
		</li> `;

	var item_mapabase = `
		<li data-toggle="tooltip" data-placement="left" title="Mapa Base">
		  <a href="#" id="btn_mapbase" class="item-menu" data-subcontainer="#wg_basemap">
		    <img src="img/widget/mapbase.png">
		  </a>
		</li>`;

	var item_ayuda = `
		<li class="dropdown" >
			<a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true">
				<img src="img/menuhelp.png">
			</a>
			<ul class="dropdown-menu">
				<li><a class="dropdown-item" href="docs/manual_usuario.pdf" target="_blank">Manual de usuario</a></li>
				<li><a class="dropdown-item notvisible" href="docs/manual_admin.pdf" target="_blank" id="li_manualadmin">Manual de usuario Admin</a></li>
			</ul>
		</li>`;

	var item_admin = `
		<li>
			<a id='link_admin' href="view/admin.html?${Cookies.get('token')}" role="button" class="item-menu" target="_blank">
				<img src="img/goadmin2.png" data-toggle="tooltip" data-placement="left" title='Administrar Usuarios'>
			</a>
		</li> `;


	/* Item Herramientas */

	var tool_area_influencia = `
		<li>
			<a class="dropdown-item item-menu" data-subcontainer="#wg_buffer" href="#">
				<img src="img/widget/buffer.png" alt="área de influencia"> Área de Influencia
			</a>
		</li>`;

	var tool_dibujar = `
		<li>
			<a class="dropdown-item item-menu modo2d" data-subcontainer="#wg_draw" href="#">
				<img src="img/widget/draw.png" alt="dibujar">  Dibujar Figura
			</a>
		</li>`;

	var tool_medir = ` 
		<li>
			<a class="dropdown-item item-menu modo2d" data-subcontainer="#wg_medir2d" href="#">
				<img src="img/widget/medir.png" alt="medir"> Medir
			</a>
		</li>`;

	var tool_buscar_xy = `
		<li>
			<a class="dropdown-item item-menu" data-subcontainer="#wg_searchxy" href="#">
				<img src="img/widget/buscarXY.png" alt="buscarxy"> Buscar Coordenada
			</a>
		</li>`;

	var tool_streetview = `
		<li>
			<a class="dropdown-item item-menu" data-subcontainer="#wg_streetview" href="#" id="btn_menusv">
				<img src="img/widget/pegman-md.png"> Street View
			</a>
		</li>`;

	var tool_perfil_long = `
		<li>
			<a class="dropdown-item item-menu" data-subcontainer="" href="#" id="btn_menuperfillong"> 
		  		<img src="img/widget/elevation-profile.png"> Perfil Longitudinal
		  	</a> 
		</li>`;

	var tool_aniadir_capa = `
		<li>
			<a class="dropdown-item item-menu" data-subcontainer="#wg_addlayer" href="#" id="btn_menusv">
				<img src="img/widget/addData.ico"> Conectar/Cargar Capa Externa
			</a> 
		</li>`;

	var tool_imprimir = `
		<li>
			<a class="dropdown-item item-menu modo2d" data-subcontainer="#wg_print" href="#">
				<img src="img/widget/printer.png"> Imprimir
			</a> 
		</li>`;



	function getNewMainMenu(arr_permisos, arr_permisos_tools) {
		let menu = item_capas;
		let item_tools = item_herramientas_default;

		if (arr_permisos_tools.length > 0) {
			let auxtools = '';
			if (arr_permisos_tools.indexOf('AreaInfluencia') != -1) {
				auxtools = tool_area_influencia;
			}
			if (arr_permisos_tools.indexOf('Dibujar') != -1) {
				auxtools += tool_dibujar;
			}
			// add public auxtools
			auxtools += tool_medir + tool_buscar_xy + tool_streetview;

			if (arr_permisos_tools.indexOf('PerfilLong') != -1) {
				auxtools += tool_perfil_long;
			}
			if (arr_permisos_tools.indexOf('AniadirCapa') != -1) {
				auxtools += tool_aniadir_capa;
			}
			if (arr_permisos_tools.indexOf('Imprimir') != -1) {
				auxtools += tool_imprimir;
			}
			let $li_tools = $('#li_tools');
			$('.ul-tools', $li_tools).html(auxtools)
			item_tools = $li_tools[0].outerHTML;
		}

		if (arr_permisos.indexOf('EventosSein') != -1) {
			menu = item_eventos_sein + menu;
		}
		if (arr_permisos.indexOf('ConsultaAvanzada') != -1) {
			menu += item_consulta_avanzada;
		}
		//add item Herramientas construído previamente
		menu += item_tools;

		if (arr_permisos.indexOf('Informes') != -1) {
			menu += item_informes;
		}
		if (arr_permisos.indexOf('MapaBase') != -1) {
			menu += item_mapabase;
		}
		if (arr_permisos.indexOf('ManualUsuario') != -1) {
			menu += item_ayuda;
		}
		if (arr_permisos.indexOf('Admin') != -1) {
			menu += item_admin;
		}

		return menu;
	}


	return {
		getNewMainMenu: function (arr_permisos, arr_permisos_tools) {
			return getNewMainMenu(arr_permisos, arr_permisos_tools);
		}
	}

});

/* REVISADO ♣ */