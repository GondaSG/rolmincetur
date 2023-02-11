define([
	"esri/Graphic"
], function (
	Graphic
) {

	var __view = __globspace.view,

		__isinited_streetview = false,
		__svpanorama = '',
		__svservice = '',

		__isactive_btnmark = false,
		__gra_placemarker = {},
		__symbolsv = {
			type: "picture-marker",
			url: "img/widget/blueArrow4.png",
			width: "24px",
			height: "24px",
			angle: 270
		};


	$('#div_menu').on('click', '#btn_menusv', function () {
		__isinited_streetview == false ? initStreetView() : '';
	});


	$('#wg_streetview').on('click', '#btn_markstreet', function () {
		$(this).toggleClass('active desactive');
		$('#div_view').toggleClass('active-click desactive-click');
		let $msg_instruc = $('.message-instruction-sv');
		if ($(this).hasClass('active')) {
			__isactive_btnmark = true;
			$msg_instruc.css('visibility', 'visible');
			$(this).addClass('parpadea').attr('title', 'Desactivar click en el mapa');
		} else {
			__isactive_btnmark = false;
			$msg_instruc.css('visibility', 'hidden');
			$(this).removeClass('parpadea').attr('title', 'Activar click en el mapa');
		}
	});

	__view.on("click", function (event) {
		if (event.button === 0 && __isactive_btnmark) {
			loadPanorama(event.mapPoint);
		}
	});

	function initStreetView() {
		let panooptions = {
			linksControl: false,
			panControl: false,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
			enableCloseButton: false
		};
		__svpanorama = new google.maps.StreetViewPanorama(document.getElementById('container_streetview'), panooptions);
		__svservice = new google.maps.StreetViewService();
		__isinited_streetview = true;
	}

	function loadPanorama(mappoint) {
		__isinited_streetview == false ? initStreetView() : '';
		let latylng = {
			lat: mappoint.latitude,
			lng: mappoint.longitude
		};
		let $containersv = $('#container_streetview').css('display', 'block');
		let $msg_noresult = $('.message-noresults-sv').css('display', 'none');

		__svservice.getPanorama({
			location: latylng,
			radius: 50
		}, function (data, status) {
			if (status === 'OK') {
				if (__isactive_btnmark) $('#btn_markstreet').click();
				__svpanorama.setPosition(latylng); // ó __svpanorama.setPano(data.location.pano);    
				__svpanorama.setVisible(true);
			} else {
				$containersv.css('display', 'none');
				$msg_noresult.css('display', 'block');
				__svpanorama.setVisible(false);
				__view.graphics.remove(__gra_placemarker);
				status == 'ZERO_RESULTS' ? console.error('Street View no disponible en esta ubicación') : console.error('ERROR UNKNOWN - Street View no disponible en esta ubicación');
			}
		});

		//event position changed
		__svpanorama.addListener('position_changed', function () {
			if (__view.graphics.items.length === 0) {
				__gra_placemarker = new Graphic({
					geometry: mappoint,
					symbol: __symbolsv
				});
				__view.graphics.add(__gra_placemarker);
			}
			let panoposition = __svpanorama.getPosition();
			mappoint.latitude = panoposition.lat();
			mappoint.longitude = panoposition.lng();
			__gra_placemarker.geometry = mappoint;
		});

		//event rotation changed 
		__svpanorama.addListener('pov_changed', function () {
			let panopov = __svpanorama.getPov();
			__symbolsv.angle = panopov.heading;
			__gra_placemarker.symbol = __symbolsv;
		});
	}


	//Evento lanzado para abrir mensaje de confirmación al querer cerrar
	$("#wg_streetview").on('click', '.btn-close', function (e) {
		$('#lbl_titletool').text('Street View');
		$('#modalcleartool').modal('show');
		$('#btn_yescleartool').removeClass().addClass('btn-confirm wg-streetview');
	});

	//Evento lanzado al confirmar el cerrar (limpiar)  
	$('#modalcleartool').on('click', '#btn_yescleartool.wg-streetview', function (event) {
		clearAllOperation();
		$('#modalcleartool').modal('hide');
		$('#btn_yescleartool').removeClass('wg-streetview');

		$('#wg_streetview').removeClass("visible").addClass("notvisible");
	});


	function clearAllOperation() {
		__view.graphics.remove(__gra_placemarker);
		let $btn_markstreet = $('#btn_markstreet');
		if ($btn_markstreet.hasClass('active')) {
			$btn_markstreet.click();
		}
	}

	/**************** RETURN FUNCIONES ******************** */
	return {
		loadPanorama: function (mappoint) {
			return loadPanorama(mappoint);
		}
	}

});

/* REVISADO ♠ */