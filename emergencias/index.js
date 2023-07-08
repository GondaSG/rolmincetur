let map, view;
let isOffice = true;
let codeUbigeo = "";

require([
    "esri/core/urlUtils",
    "esri/Map",
    "esri/config",
    "esri/views/MapView",
    "esri/WebMap",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Editor",
	  "esri/widgets/Search",
	  "esri/widgets/Home",
    "esri/widgets/Legend",
    "esri/widgets/LayerList"
    ], (
        urlUtils,
        Map,
        esriConfig,
        MapView,
        WebMap,
        FeatureLayer,
        QueryTask,
        Query,
        Expand,
        BasemapGallery, 
        Editor,
		    Search,
		    Home,
        Legend,
        LayerList
        ) => {
        
        _proxyurl = "https://gisem.osinergmin.gob.pe/proxy_developer/proxy.ashx";
        //_proxyurl = "";
        $(document).ready(function(){          

          var url_informales = "https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/survey123_8c161cbdf65e4ed894b34df0c7b3c70b_results/FeatureServer/0";
         
          let editor, features;
          map = new Map({
              basemap: "osm"
          });

          view = new MapView({
              container: "map",
              map: map,
              center: [-74.049, -8.185],
              zoom: 5
          });          
          
          //PROXY//
          //Descomentar para producción//
          //urlUtils.addProxyRule({
          //    urlPrefix: "https://services5.arcgis.com/oAvs2fapEemUpOTy",
          //    proxyUrl: _proxyurl
          //});

          // Adds widget base map
          //let basemapGallery = new BasemapGallery({
          //  view: view
          //});
          //const MeExpand = new Expand({
          //    view: view,
          //    content: basemapGallery,
          //    expanded: false,
          //    expandTooltip: 'Mapas Base'
          //});
          //view.ui.add(MeExpand, 'top-left'); 
          //
			    //// Adds widget home
          var homeWidget = new Home({
            view: view
          });
          
          view.ui.add(homeWidget, "top-left");
          
          let layerList = new LayerList({
            view: view
          });
          layerListExpand = new Expand({
              expandIconClass: "esri-icon-layer-list", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
              // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
              view: view,
              content: layerList
          });
          // Adds widget below other elements in the top left corner of the view
          view.ui.add(layerListExpand, "top-left");

          let legend = new Legend({
            view: view
          });
          legendExpand = new Expand({
              expandIconClass: "esri-icon-legend", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
              // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
              view: view,
              content: legend
          });
          view.ui.add(legendExpand, "top-left");

          const editThisAction = {
            title: "Editar feature",
            id: "edit-this",
            className: "esri-icon-edit"
          };
    
          // Create a popupTemplate for the featurelayer and pass in a function to set its content and specify an action to handle editing the selected feature
          // Creacion de featureClass a editar
          const template = {
            title: "Local Informal",
            content: [
                {
                  type: "fields", // FieldsContentElement
                  fieldInfos: [
                    {
                      fieldName: "selected_sector",
                      visible: true,
                      label: "Tipo de Establecimiento"
                    },
                    {
                      fieldName: "fecha_y_hora_evento",
                      visible: true,
                      label: "Dirección"
                    },
                    {
                      fieldName: "selected_tipos",
                      visible: true,
                      label: "Código Suministro"
                    },
                    {
                      fieldName: "estado",
                      visible: true,
                      label: "Estado"
                    },
                    {
                      fieldName: "selected_departamento",
                      visible: true,
                      label: "Comentarios"
                    },
                    {
                      fieldName: "selected_provincia",
                      visible: true,
                      label: "Estado"
                    },
                    {
                      fieldName: "selected_distrito",
                      visible: true,
                      label: "Comentarios"
                    }
                  ]
                },
                {
                  type: "text", // TextContentElement
                  text: "Imagenes"
                },
                {
                  type: "attachments" // AttachmentsContentElement
                }
              ],
            actions: [editThisAction]
          };

          const featureLayer = new FeatureLayer({
              title: 'Registro de Emergencias',
              url: url_informales,
              outFields: ["*"],
              //popupTemplate: template
              popupTemplate: {
                title: "Registro de Emergencias",
                content: "<div style='font-size:18px;text-align: center;'>ESTADO: {selected_estado}</div> <br/> "+
                "<div style='font-size:18px;text-align: center;'> <a href='arcgis-survey123://?itemID=11c6cf25311b446b9eefdc0de0a6d78f&amp;field:selected_sector={selected_sector}&amp;field:selected_tipos={selected_tipos}&amp;field:selected_fuente={selected_fuente}&amp;field:selected_ubigeo={selected_ubigeo}&amp;field:selected_departamento={selected_departamento}&amp;field:selected_provincia={selected_provincia}&amp;field:selected_distrito={selected_distrito}&amp;field:selected_estado={selected_estado}&amp;field:descripcion={descripcion}&amp;field:codigo={codigo}&amp;field:fecha_y_hora_registro={fecha_y_hora_registro}&amp;field:oficina_regional={oficina_regional}&amp;field:unidad={unidad}&amp;field:nivel_del_evento={nivel_del_evento}&amp;field:coord_x={coord_x}&amp;field:coord_y={coord_y}&amp;field: _djrealurl='  "+
                " style='color:blue;background:yellow;'> Abrir formulario de seguimiento de incidencias </a> </div> <br/> "+
                "<div style='font-size:10px;'> <span style='color:red;'>SECTOR:</span> {selected_sector} <br/> "+
                "<span style='color:red;'>FECHA Y HORA EVENTO:</span> {fecha_y_hora_evento} <br/> "+
                "<span style='color:red;'>TIPO DE EVENTO:</span> {selected_tipos} <br/> "+
                "<span style='color:red;'>DEPARTAMENTO:</span> {selected_departamento} <br/> "+
                "<span style='color:red;'>PROVINCIA:</span> {selected_provincia} <br/> "+
                "<span style='color:red;'>DISTRITO:</span> {selected_distrito} <br/></div> ",
                actions: [editThisAction]
              }
          });

          map.add(featureLayer);
          
          $("#map").css("height", "100%");

          view.when(() => {                
              editor = new Editor({
                allowedWorkflows: ["update"],
                view: view,
                container: document.createElement("div"),
                layerInfos: [{
                  layer: featureLayer,
                  formTemplate: {
                    elements: [
                    {
                      type: "field",
                      fieldName: "selected_sector",
                      label: "SECTOR",
                      hint: "SECTOR"
                    },
                    {
                      type: "field",
                      fieldName: "fecha_y_hora_evento",
                      label: "FECHA Y HORA DEL EVENTO",
                      hint: "FECHA Y HORA DEL EVENTO"
                    },
                    {
                      type: "field",
                      fieldName: "selected_tipos",
                      label: "TIPO DE EVENTO",
                      hint: "TIPO DE EVENTO"
                    },
                    {
                      type: "field",
                      fieldName: "selected_estado",
                      label: "ESTADO",
                      hint: "ESTADO"
                    },
                    {
                      type: "field",
                      fieldName: "selected_departamento",
                      label: "DEPARTAMENTO",
                      hint: "DEPARTAMENTO"
                    },
                    {
                      type: "field",
                      fieldName: "selected_provincia",
                      label: "PROVINCIA",
                      hint: "PROVINCIA"
                    },
                    {
                      type: "field",
                      fieldName: "selected_distrito",
                      label: "DISTRITO",
                      hint: "DISTRITO"
                    },
                    {
                      type: "field",
                      fieldName: "oficina_regional",
                      label: "OFICINA REGIONAL",
                      hint: "OFICINA REGIONAL"
                    },
                    {
                      type: "field",
                      fieldName: "unidad",
                      label: "UNIDAD",
                      hint: "UNIDAD"
                    },
                    {
                      type: "field",
                      fieldName: "nivel_del_evento",
                      label: "CRITICIDAD",
                      hint: "CRITICIDAD"
                    }
                  ]
                  }
                }]
              });
      
              // Execute each time the "Edit feature" action is clicked
              function editThis() {
                if (!editor.viewModel.activeWorkFlow) {
                  view.popup.visible = false;
                  editor.startUpdateWorkflowAtFeatureEdit(view.popup.selectedFeature);
                  view.ui.add(editor, "top-right");
                  view.popup.spinnerEnabled = false;
                  //var geometry = view.popup.selectedFeature.geometry;
                  //var query = new QueryTask({ url: urlOficinasRegionales });
                  //var params = new Query;
                  //params.where = "1=1";
                  //params.returnGeometry = true;
                  //params.outFields = ["*"];
                  //params.geometry = geometry;
                  //query.execute(params).then(function(response) {
                  //  if (response.features.length > 0) {
                  //    
                  //  }
                  //})                  
                }
      
                // then grab it from the DOM stack
                setTimeout(() => {
                  let arrComp = editor.domNode.getElementsByClassName("esri-editor__back-button esri-interactive");
                  if (arrComp.length === 1) {
                    arrComp[0].setAttribute("title", "Cancel edits, return to popup");
                    arrComp[0].addEventListener('click', (evt) => {
                      evt.preventDefault();
                      view.ui.remove(editor);
                      view.popup.open({
                        features: features
                      });
                    });
                  }
                }, 150);
              }
              view.popup.on("trigger-action", (event) => {
                if (event.action.id === "edit-this") {
                  editThis();
                }
              });
      
          });
          // Fin de featureClass a editar
	
			    view.ui.add('btnDelete', "top-right");
          $("#btnDelete").on('click', function() { 
            if (editor == null)
              return;
            view.ui.remove(editor);
            features.forEach((feature) => {
                  feature.popupTemplate = template;
              });
              if (features) {
                  view.popup.open({
                      features: features
                  });
              }
              editor.viewModel.cancelWorkflow();
          });
    
          // Watch when the popup is visible
          view.popup.watch("visible", (event) => {
            if (editor.viewModel.state === "editing-existing-feature") {
                  view.popup.close();
              } else {
                  features = view.popup.features;
              }
          });

          featureLayer.on("apply-edits", (event) => {
            view.ui.remove(editor);
            features.forEach((feature) => {
                feature.popupTemplate = template;
            });
            //if (features) {
            //    view.popup.open({
            //        features: features
            //    });
            //}
            event.result.then(
              function(value) { 
                console.log(value);
                alert("Se ha modificado correctamente"); 
              },
              function(error) { /* code if some error */ }
              );
            
            editor.viewModel.cancelWorkflow();
          });


          //var layer = {
          //  url: urlOficinasRegionales,
          //  title: "",
          //  index: 0
          //}
          //var layer_oficinas = createFeatureLayer(layer, "1=1");
          //map.add(layer_oficinas, 0);

          //function createFeatureLayer(layer, where){
          //  let featureLayer = new FeatureLayer({
          //      url: layer.url,
          //      title: layer.title,
          //      index: layer.index,
          //      uurl:layer.url,
          //      outFields: ["*"],
          //      definitionExpression: where
          //  });
          //  return featureLayer;
          //}          

        });
    });