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
          var title = 'Registro de Emergencias';
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

          const searchWidget = new Search({
            view: view,
            sources : [
             {
                layer: new FeatureLayer({
                  url: url_informales,
                  outFields: ["*"]
                }),
                searchFields: ["codigo"],
                displayField: "codigo",
                exactMatch: false,
                outFields: ["*"],
                name: title,
                placeholder: "Código",
                maxResults: 6,
                maxSuggestions: 6,
                suggestionsEnabled: true,
                minSuggestCharacters: 0
              }]
          });
          // Adds the search widget below other elements in
          // the top left corner of the view
          view.ui.add(searchWidget, {
            position: "top-left",
            index: 0
          });
          //			    //// Adds widget home
          var homeWidget = new Home({
            view: view
          });          
          view.ui.add(homeWidget, "top-left");
          
          let layerList = new LayerList({
            view: view
          });
          layerListExpand = new Expand({
              expandIconClass: "esri-icon-layer-list", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
              view: view,
              content: layerList
          });
          view.ui.add(layerListExpand, "top-left");

          let legend = new Legend({
            view: view
          });
          legendExpand = new Expand({
              expandIconClass: "esri-icon-legend", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
              view: view,
              content: legend
          });
          view.ui.add(legendExpand, "top-left");

          const editThisAction = {
            title: "Editar",
            id: "edit-this",
            className: "esri-icon-edit"
          };
    
          // Create a popupTemplate for the featurelayer and pass in a function to set its content and specify an action to handle editing the selected feature
          // Creacion de featureClass a editar
          const template = {
            title: title,
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
              title: title,
              url: url_informales,
              outFields: ["*"],
              //popupTemplate: template
              popupTemplate: {
                title: title,
                content: "<div style='font-size:18px;text-align: center;'>ESTADO: {selected_estado}</div> <br/> "+
                "<div style='font-size:18px;text-align: center;'> <a href='https://survey123.arcgis.com/share/11c6cf25311b446b9eefdc0de0a6d78f?field:selected_sector={selected_sector}&field:selected_tipos={selected_tipos}&field:selected_fuente={selected_fuente}&field:selected_ubigeo={selected_ubigeo}&field:selected_departamento={selected_departamento}&field:selected_provincia={selected_provincia}&field:selected_distrito={selected_distrito}&field:selected_estado={selected_estado}&field:descripcion={descripcion}&field:codigo={codigo}&field:fecha_y_hora_registro={fecha_y_hora_registro}&field:oficina_regional={oficina_regional}&field:unidad={unidad}&field:nivel_del_evento={nivel_del_evento}&field:coord_x={coord_x}&field:coord_y={coord_y}"+
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
                      fieldName: "nivel_del_evento",
                      label: "CRITICIDAD",
                      hint: "CRITICIDAD"
                    },
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
                    arrComp[0].setAttribute("title", "Cancel edición, retornar to popup");
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
                alert("Se ha modificado correctamente"); 
              },
              function(error) { /* code if some error */ }
              );
            
            editor.viewModel.cancelWorkflow();
          });
          const valores = window.location.search;
          if (valores != ""){
            const urlParams = new URLSearchParams(valores);
            var cod = urlParams.get('cod');
            if (cod){
               featureLayer.queryFeatures().
               then( function (results) {
                const result = results.features.find(t => t.attributes.codigo == cod);
                if (result) {
                  console.log(result);
                  view.goTo({
                    target:result.geometry,
                    zoom: 20
                  })
                    .then(function () {                     
                      view.popup.open({
                        features: [result],
                        updateLocationEnabled: true
                      });
                    })
                    .catch(function(error) {
                      if (error.name != "AbortError") {
                        console.error(error);
                      }
                    });
                }
              })
            }
          }
        });
    });