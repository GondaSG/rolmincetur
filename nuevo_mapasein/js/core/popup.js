define([
  "js/helper",
  "js/core/services",
  "js/core/permission",

  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/Graphic",
], function (
  Helper,
  Services,
  Permission,

  QueryTask,
  Query,
  Graphic
) {

  
  // Urls de servicios detalles para PE
  var __url_pe_contrato = Services.getUrlPEContrato();
  var __url_pe_interrupcion = Services.getUrlPEInterrupcion();
  var __url_pe_tension = Services.getUrlPETension();

  // Variables de Permisos
  var __permisos_others = Permission.getPermisosOthers();

  const __proxy = ''; // 'https://proxycorsnodejs.herokuapp.com/';

  const __url_path_img = 'https://gisem.osinergmin.gob.pe/NewMapaSEIN/Graficos/Fotos/';

  //################################### DEFINICIÓN DE CAMPOS DE CADA POPUP ############################################ 


   const f_ficha = 'FICHA';
  /**
   * Operacion
   */

  // Centrales hidroelecticas
  const f_oper_chidroelectrica_tipocentral = 'TIPO_CENTRAL';
  const f_oper_chidroelectrica_nombre = 'NOMBRE';
  const f_oper_chidroelectrica_fotografia = 'FOTO';
  const f_oper_chidroelectrica_empresa = 'EMPRESA';
  const f_oper_chidroelectrica_ubicacion = 'REGION_GEOGRAFICA';
  const f_oper_chidroelectrica_potencianominal = 'POT_INST';
  const f_oper_chidroelectrica_tipo = 'TIPO_TURBINA';
  const f_oper_chidroelectrica_fuente = 'FUENTE_ENER';
  const f_oper_chidroelectrica_salto = 'SALTO';
  const f_oper_chidroelectrica_nrounidades = 'NRO_UNIDADES';
  const f_oper_chidroelectrica_aniopoc = 'PCO_ANIO';

  // Centrales termicas
  const f_oper_ctermica_tipocentral = 'TIPO_CENTRAL';
  const f_oper_ctermica_nombre = 'NOMBRE';
  const f_oper_ctermica_fotografia = 'FOTO';
  const f_oper_ctermica_empresa = 'EMPRESA';
  const f_oper_ctermica_ubicacion = 'DEPARTAMENTO';
  const f_oper_ctermica_potencianominal = 'POT_INST';
  const f_oper_ctermica_tipo = 'TIPO_TURBINA';
  const f_oper_ctermica_fuente = 'FUENTE_ENER';
  const f_oper_ctermica_nrounidades = 'NRO_UNIDADES';
  const f_oper_ctermica_aniopoc = 'PCO_ANIO';

  // Centrales eolica existentes - Centrales biomasa existentes - Centales solar existentes - adicionalmente Centales Hidroelectricas
  const f_oper_ceolica_biomasa_solar_tipocentral = 'TIPO_CENTRAL';
  const f_oper_ceolica_biomasa_solar_nombre = 'NOMBRE';
  const f_oper_ceolica_biomasa_solar_fotografia = 'FOTO';
  const f_oper_ceolica_biomasa_solar_empresa = 'EMPRESA';
  const f_oper_ceolica_biomasa_solar_potencianominal = 'POT_INST';
  const f_oper_ceolica_biomasa_solar_montoinv = 'MONTO_INV';
  const f_oper_ceolica_biomasa_solar_firmacontrato = 'FIRMA_CONTRATO';
  const f_oper_ceolica_biomasa_solar_aniopoc = 'PCO_ANIO';

  // Subestaciones - todos     
  const f_oper_set_nombre = 'NOMBRE';
  const f_oper_set_fotografia = 'IMAGEN';
  const f_oper_set_empresa = 'EMPRESA';
  const f_oper_set_ubicacion = 'REGION_GEOGRAFICA';
  const f_oper_set_aniopoc = 'PCO_ANIO';
  const f_oper_set_nrotrafos = 'TRANSFORMADORES';
  const f_oper_set_codigo = 'COD_SE';
  // (TABLA DE TRANFORMADORES)
  const f_trf_codset = 'COD_SE';
  const f_trf_codtrf = 'COD_TRSNF';
  const f_trf_tipotrf = 'TIPO_TRANSF';
  const f_trf_anio = 'ANIO';
  const f_trf_relacion = 'RELACION';
  const f_trf_potencia = 'POTENCIA';
  const f_trf_posicion = 'POS';

  // Lineas de transmision - todos
  const f_oper_lt_nombre = 'NOMBRE';
  const f_oper_lt_fotografia = 'IMAGEN';
  const f_oper_lt_codlinea = 'COD_LINEA';
  const f_oper_lt_empresa = 'EMPRESA';
  const f_oper_lt_tensionnom = 'TENSION_NOM';
  const f_oper_lt_regiongeografica = 'REGION_GEOGRAFICA';
  const f_oper_lt_nroternas = 'NRO_TERNAS';
  const f_oper_lt_longitud = 'LONGITUD';
  const f_oper_lt_nrosoporte = 'NRO_SOPORTES';
  const f_oper_lt_pcoanio = 'PCO_ANIO';
  const f_oper_lt_materialsoport = 'MATERIA_SO';
  const f_oper_lt_corriente = 'CORRIENTE';
  const f_oper_lt_tiposoporte = 'TIPO_SOPOR';
  const f_oper_lt_potencianom = 'POTENCIA_NOM';
  const f_oper_lt_materialconduct = 'MAT_CODUC';

  const f_oper_estructura_tipo = 'TIPO'; 
  const f_oper_estructura_altura = 'ALTURA';
  const f_oper_estructura_ncircuito = 'NUM_CIRCUITOS';
  const f_oper_estructura_funcion = 'FUNCION';
  const f_oper_estructura_codlinea = 'COD_LINEA';
  const f_oper_estructura_codestructura = 'COD_ESTRUCTURA';

  /**
   * Sistemas en Alerta
   */

  // Unidades de Generacion criticas
  const f_alert_ugc_nombrecg = 'NOMBRE';
  const f_alert_ugc_fotografia = 'FOTO';
  const f_alert_ugc_empresa = 'EMPRESA';
  const f_alert_ugc_potencia = 'POT_INST';
  const f_alert_ugc_nrounidades = 'NRO_UNIDADES';
  const f_alert_ugc_tipocentral = 'TIPO_CENTRAL';
  const f_alert_ugc_idcg = 'ID_CG';
  // detalle
  const f_alert_ugc_det_idcg = 'ID_CG';
  const f_alert_ugc_det_codug = 'UNIDAD_GEN';
  const f_alert_ugc_det_nombreug = 'UNIDAD_GEN';
  const f_alert_ugc_det_nombrecg = 'NOMBRE';
  const f_alert_ugc_det_anio = 'ANIO';
  const f_alert_ugc_det_periodo = 'PERIODO';
  const f_alert_ugc_det_mes = 'MES';
  const f_alert_ugc_det_tifm = 'TIFM';
  const f_alert_ugc_det_tolerancia = 'TOLERANCIA';


  // Transformadores sobrecargados    
  const f_alert_ts_nombre = 'NOMBRE';
  const f_alert_ts_fotografia = 'IMAGEN';
  const f_alert_ts_empresa = 'EMPRESA';
  const f_alert_ts_region = 'REGION_GEOGRAFICA';
  const f_alert_ts_tension = 'TENSION';
  const f_alert_ts_codset = 'COD_SE';
  // detalle
  const f_alert_ts_det_codset = 'COD_SE';
  const f_alert_ts_det_codtrf = 'TRANSFORMADOR1';
  const f_alert_ts_det_nombreset = 'NOMBRE';
  const f_alert_ts_det_empresa = 'EMPRESA';
  const f_alert_ts_det_potencia = 'POT_PRI_1';
  const f_alert_ts_det_relacion = 'RELACION';
  const f_alert_ts_det_anio = 'ANIO';
  const f_alert_ts_det_periodo = 'PERIODO';
  const f_alert_ts_det_mes = 'MES';
  const f_alert_ts_det_fu = 'FU';


  // Transformadores criticos
  const f_alert_tc_nombre = 'NOMBRE';
  const f_alert_tc_fotografia = 'IMAGEN';
  const f_alert_tc_empresa = 'EMPRESA';
  const f_alert_tc_region = 'REGION_GEOGRAFICA';
  const f_alert_tc_tension = 'TENSION_NOM';
  const f_alert_tc_codset = 'COD_SE';
  // detalle
  const f_alert_tc_det_codset = 'COD_SE';
  const f_alert_tc_det_codtrf = 'TRANSFORMADOR1';
  const f_alert_tc_det_nombreset = 'NOMBRE';
  const f_alert_tc_det_relacion = 'RELACION';
  const f_alert_tc_det_empresa = 'EMPRESA';
  const f_alert_tc_det_anio = 'ANIO';
  const f_alert_tc_det_tfe = 'TFE';
  const f_alert_tc_det_indise = 'INDISE';
  const f_alert_tc_det_toltfe = 'TOL_TFE';
  const f_alert_tc_det_tolindise = 'TOL_INDISE';


  // Asociadas a sistemas electricos criticos
  const f_alert_sec_nombre = 'NOMBRE';
  const f_alert_sec_fotografia = 'IMAGEN';
  const f_alert_sec_empresa = 'EMPRESA';
  const f_alert_sec_region = 'REGION_GEOGRAFICA';
  const f_alert_sec_tension = 'TENSION_NOM';
  const f_alert_sec_codset = 'COD_SE';
  // detalle 
  const f_alert_sec_det_codset = 'COD_SE';
  const f_alert_sec_det_codsec = 'COD_SIST_E';
  const f_alert_sec_det_empresa = 'EMPRESA';
  const f_alert_sec_det_namesec = 'SIST_ELECT';
  const f_alert_sec_det_sectortipico = 'ST_2014';
  const f_alert_sec_det_nrousuarios = 'N_USUARIOS';
  const f_alert_sec_det_saifitotal = 'SAIFI_TOTA';
  const f_alert_sec_det_saiditotal = 'SAIDI_TOTA';
  const f_alert_sec_det_saifitransmision = 'SAIFI_TRAN';
  const f_alert_sec_det_saiditransmision = 'SAIDI_TRAN';
  const f_alert_sec_det_anio = 'ANIO';
  //problemas y soluciones
  const f_alert_sec_det_problematica = 'PROBLEMATICA';
  const f_alert_sec_det_solpit2013 = 'SOL_PIT2013_2017';
  const f_alert_sec_det_solpit2017 = 'SOL_PIT2017_2021';
  const f_alert_sec_det_solcoes = 'SOL_COES';
  const f_alert_sec_det_solminem = 'SOL_MINEM';
  const f_alert_sec_det_solempresa = 'SOL_EMPRESA';


  // Lineas congestionadas
  const f_alert_ltcong_nombre = 'NOMBRE';
  const f_alert_ltcong_fotografia = 'IMAGEN';
  const f_alert_ltcong_empresa = 'EMPRESA';
  const f_alert_ltcong_region = 'REGION_GEOGRAFICA';
  const f_alert_ltcong_tension = 'TENSION_NOM';
  const f_alert_ltcong_longitud = 'LONGITUD';
  const f_alert_ltcong_codlinea = 'COD_LINEA';
  // detalle
  const f_alert_ltcong_det_codlinea = 'COD_LINEA';
  const f_alert_ltcong_det_nombre = 'NOMBRE';
  const f_alert_ltcong_det_empresa = 'EMPRESA';
  const f_alert_ltcong_det_anio = 'ANIO';
  const f_alert_ltcong_det_periodo = 'PERIODO';
  const f_alert_ltcong_det_mes = 'MES';
  const f_alert_ltcong_det_fu = 'FU';


  // Lineas Criticas
  const f_alert_ltcrit_nombre = 'NOMBRE';
  const f_alert_ltcrit_fotografia = 'IMAGEN';
  const f_alert_ltcrit_empresa = 'EMPRESA';
  const f_alert_ltcrit_region = 'REGION_GEOGRAFICA';
  const f_alert_ltcrit_tension = 'TENSION_NOM';
  const f_alert_ltcrit_longitud = 'LONGITUD';
  const f_alert_ltcrit_codlinea = 'COD_LINEA';
  // detalle
  const f_alert_ltcrit_det_codlinea = 'COD_LINEA';
  const f_alert_ltcrit_det_nombre = 'NOMBRE';
  const f_alert_ltcrit_det_empresa = 'EMPRESA';
  const f_alert_ltcrit_det_anio = 'ANIO';
  const f_alert_ltcrit_det_tlf = 'TLF';
  const f_alert_ltcrit_det_indisl = 'INDISL';
  const f_alert_ltcrit_det_toleranciastfl = 'TOLERANCIAS_TFL';
  const f_alert_ltcrit_det_toleranciasindisl = 'TOLERANCIAS_INDISL';


  /**
   * Proyectadas
   */

  // Centras Hidroelectrica -- adicionalmente centrales termicas y centrales no convencionales(todos)
  const f_proy_chidroelectrica_tipocentral = 'TIPO_CENTRAL';
  const f_proy_chidroelectrica_nombre = 'NOMBRE';
  const f_proy_chidroelectrica_fotografia = 'FOTO';
  const f_proy_chidroelectrica_empresa = 'EMPRESA';
  const f_proy_chidroelectrica_potencianominal = 'POT_INST';
  const f_proy_chidroelectrica_montoinv = 'MONTO_INV';
  const f_proy_chidroelectrica_firmacontrato = 'FIRMA_CONTRATO';
  const f_proy_chidroelectrica_aniopoc = 'PCO_ANIO';

  // Subestaciones
  const f_proy_set_nombre = 'NOMBRE';
  const f_proy_set_fotografia = 'IMAGEN';
  const f_proy_set_empresa = 'EMPRESA';
  const f_proy_set_ubicación = 'REGION_GEOGRAFICA';
  const f_proy_set_aniopoc = 'PCO_ANIO';
  const f_proy_set_nrotrafos = 'TRANSFORMADORES';

  // Lineas T. 
  const f_proy_lt_nombre = 'NOMBRE';
  const f_proy_lt_fotografia = 'IMAGEN';
  const f_proy_lt_empresa = 'EMPRESA';
  const f_proy_lt_tension = 'TENSION_NOM';
  const f_proy_lt_longitud = 'LONGITUD';
  const f_proy_lt_inversion = 'MONTO_INV';
  const f_proy_lt_fechacontrato = 'FIRMA_CONTRATO';
  const f_proy_lt_aniopoc = 'PCO_ANIO';


  /**
   *  Eventos relevantes
   */

  //Subestaciones 
  const f_er_set_nombre = 'NOMBRE';
  const f_er_set_fotografia = 'IMAGEN';
  const f_er_set_empresa = 'EMPRESA';
  const f_er_set_ubicacion = 'REGION_GEOGRAFICA';
  const f_er_set_tension = 'TENSION_NOM';
  const f_er_set_codset = 'NOMBRE';
  // detalle
  const f_er_set_det_idse = 'ID_SE';
  const f_er_set_det_codset = 'NOMBRE';
  const f_er_set_det_evento = 'EVENTO';
  const f_er_set_det_comentario = 'COMENTARIOS';
  const f_er_set_det_inicio = 'FECHA_INI';
  const f_er_set_det_fin = 'FECHA_FIN';
  const f_er_set_det_demandaafectada = 'DEMANDA_AFEC';
  const f_er_set_det_origendata = 'ORIGEN_DATA';
  const f_er_set_det_anio = 'ANIO';
  const f_er_set_det_semana = 'SEMANA';

  // Lineas de transmision
  const f_er_lt_nombre = 'NOMBRE';
  const f_er_lt_fotografia = 'IMAGEN';
  const f_er_lt_empresa = 'EMPRESA';
  const f_er_lt_ubicacion = 'REGION_GEOGRAFICA';
  const f_er_lt_tension = 'TENSION_NOM';
  const f_er_lt_longitud = 'LONGITUD';
  const f_er_lt_codlinea = 'NOMBRE';
  //detalle
  const f_er_lt_det_codlinea = 'NOMBRE';
  const f_er_lt_det_evento = 'EVENTO';
  const f_er_lt_det_comentario = 'COMENTARIOS';
  const f_er_lt_det_inicio = 'FECHA_INI';
  const f_er_lt_det_fin = 'FECHA_FIN';
  const f_er_lt_det_demandaafectada = 'DEMANDA_AFEC';
  const f_er_lt_det_origendata = 'ORIGEN_DATA';
  const f_er_lt_det_anio = 'ANIO';
  const f_er_lt_det_semana = 'SEMANA';

  // Centrales
  const f_er_c_tipocentral = 'TIPO_CENTRAL';
  const f_er_c_nombre = 'NOMBRE';
  const f_er_c_fotografia = 'FOTO';
  const f_er_c_empresa = 'EMPRESA';
  const f_er_c_potencia = 'POT_INST';
  const f_er_c_nrounidades = 'NRO_UNIDADES';
  const f_er_c_cod = 'NOMBRE';
  // detalle
  const f_er_c_det_cod = 'NOMBRE';
  const f_er_det_evento = 'EVENTO';
  const f_er_c_det_comentario = 'COMENTARIOS';
  const f_er_c_det_inicio = 'FECHA_INI';
  const f_er_c_det_fin = 'FECHA_FIN';
  const f_er_c_det_demandaafectada = 'DEMANDA_AFEC';
  const f_er_c_det_origendata = 'ORIGEN_DATA';
  const f_er_c_det_anio = 'ANIO';
  const f_er_c_det_semana = 'SEMANA';


  /**
   *  Plan de Inversiones
   */

  // PI - Subestaciones
  const f_pi_set_nombre = 'NOMBRE';
  const f_pi_set_empresa = 'EMPRESA';
  const f_pi_set_ubicacion = 'REGION_GEOGRAFICA';
  const f_pi_set_aniopoc = 'PCO_ANIO';
  const f_pi_set_nrotrafos = 'TRANSFORMADORES';

  // PI - Lineas
  const f_pi_lt_nombre = 'NOMBRE';
  const f_pi_lt_empresa = 'EMPRESA';
  const f_pi_lt_tension = 'TENSION_NOM';
  const f_pi_lt_longitud = 'LONGITUD';
  const f_pi_lt_inversion = 'MONTO_INV';
  const f_pi_lt_fechacontrato = 'FIRMA_CONTRATO';
  const f_pi_lt_aniopoc = 'PCO_ANIO';
  

  /**
   *  Descargas Atmosfericas
   */

  // Descargas atmosfericas
  const f_da_coorda = 'ID_EV';
  const f_da_fecha = 'FECHA';
  const f_da_intensidad = 'INTENSIDAD';
  const f_da_tipo = 'TIPO_INSTALACION';


  /**
   * Informacion grafica
   */

  // Drones
  const f_ig_drone_nombre = 'NOMBRE';
  const f_ig_drone_empresa = 'EMPRESA';
  const f_ig_drone_tipoinstalacion = 'TIPO_INSTALACIÓN';
  const f_ig_drone_url = 'URL';


  /**
   * Puntos de entrega - Calidad
   */

  // Puntos de entrega
  const f_pe_nombre = 'NOMBRE_PE';
  const f_pe_cliente = 'CLIENTE';
  const f_pe_propietario = 'PROPIETARIO';
  const f_pe_tension = 'TENSION_NOM_OP';
  const f_pe_subestacion = 'NOM_SUB';
  const f_pe_niveltension = 'NIVEL_TENSION';
  const f_pe_idpe = 'ID_PE';
  const f_pe_img = 'GRAFICO';

  const f_pe_det_pe_suministrador = 'SUMINISTRADOR';
  const f_pe_det_pe_cliente = 'CLIENTE';
  const f_pe_det_pe_fechainicio = 'VC_INICIO';
  const f_pe_det_pe_fechafin = 'VC_FIN';
  const f_pe_det_pe_niveltension = 'NIVEL_TENSION';
  const f_pe_det_pe_titularbarra = 'TITULAR_BARRA';
  const f_pe_det_pe_tension = 'TENSION_NOM_OP';
  const f_pe_det_pe_id = 'ID_PE';
  
  const f_pe_det_int_fechainicio = 'INT_INICIO';
  const f_pe_det_int_fechafin = 'INT_FIN';
  const f_pe_det_int_tipo = 'TIPO_INT';
  const f_pe_det_int_causa = 'CAUSA_INT';
  const f_pe_det_int_codosi = 'CODOSI';
  const f_pe_det_int_cliente = 'CLIENTE';
  const f_pe_det_int_suministros = 'SUMINISTRADOR';
  const f_pe_det_int_observacion = 'OBSERVACION';
  const f_pe_det_int_idpe = 'ID_PE'
  
  const f_pe_det_t_suministrador = 'SUMINISTRADORES';
  const f_pe_det_t_cliente = 'CLIENTE';
  const f_pe_det_t_marca = 'MARCA';
  const f_pe_det_t_serie = 'SERIE';
  const f_pe_det_t_fechainicio = 'MED_INICIO';
  const f_pe_det_t_fechafin = 'MEDICION_FIN';
  const f_pe_det_t_intevaluado = 'INT_EVAL';
  const f_pe_det_t_tension = 'TENSION_NOM_OP';
  const f_pe_det_t_tipopunto = 'TIPO_P';
  const f_pe_det_t_tolerancia = 'TOL';
  const f_pe_det_t_inttolerancia = 'INT_TOL';
  const f_pe_det_t_resultado = 'RESULTADO';
  const f_pe_det_t_idpe = 'ID_PE';
  const f_pe_det_t_idpeten = 'ID_PE_TEN';
  const f_pe_det_t_mes = 'MES';
  const f_pe_det_t_anio = 'ANIO';
  

  //################################### DEFINICIÓN DE POPUP TEMPLATES ############################################

  /**
   * Operacion
   */

  //Centrales Hidroelectricas   
  let _pop_oper_chidroelectrica = {
    title: `{${ f_oper_chidroelectrica_tipocentral}}: {${ f_oper_chidroelectrica_nombre}}`,
    outFields: ['*'],
    content: getContentOperCHidroelectrica

  }

  function getContentOperCHidroelectrica(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_oper_chidroelectrica_potencianominal] != null ? feature[f_oper_chidroelectrica_potencianominal] = Number(feature[f_oper_chidroelectrica_potencianominal]).toFixed(2): '';

    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Centrales/${ feature[f_oper_chidroelectrica_fotografia] }" alt="imagen centrales hidroéletrico">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td>${ feature[f_oper_chidroelectrica_empresa] }</td>
                        <th> Ubicación </th>
                        <td>${ feature[f_oper_chidroelectrica_ubicacion] }</td>
                    </tr>
                    <tr>
                        <th> Potencia Instalada </th>
                        <td>${ feature[f_oper_chidroelectrica_potencianominal] } MW</td>
                        <th> Tipo </th>
                        <td>${ feature[f_oper_chidroelectrica_tipo] }</td>
                    </tr>
                    <tr>
                        <th> Fuente </th>
                        <td>${ feature[f_oper_chidroelectrica_fuente] }</td>
                        <th> Salto </th>
                        <td>${ feature[f_oper_chidroelectrica_salto] } m</td>
                    </tr>
                    <tr>
                        <th> N° Unidades </th>
                        <td>${ feature[f_oper_chidroelectrica_nrounidades] }</td>
                        <th> Año POC </th>
                        <td>${ feature[f_oper_chidroelectrica_aniopoc] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }

  //Centrales Termicas
  let _pop_oper_ctermica = {
    title: `{${ f_oper_ctermica_tipocentral}} {${ f_oper_ctermica_nombre}}`,
    outFields: ['*'],
    content: getContentOperCTermica
  }

  function getContentOperCTermica(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_oper_ctermica_potencianominal] != null ? feature[f_oper_ctermica_potencianominal] = Number(feature[f_oper_ctermica_potencianominal]).toFixed(2): '';
    
    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Centrales/${ feature[f_oper_ctermica_fotografia] }" alt="imagen central térmica">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td colspan="3">${ feature[f_oper_ctermica_empresa] }</td>
                    </tr>
                    <tr>
                        <th> Ubicación </th>
                        <td>${ feature[f_oper_ctermica_ubicacion] } </td>
                        <th> Potencia Instalada </th>
                        <td>${ feature[f_oper_ctermica_potencianominal] } MW</td>
                    </tr>
                    <tr>
                        <th> Tipo </th>
                        <td> ${ feature[f_oper_ctermica_tipo] }</td> 
                        <th> Fuente </th>
                        <td>${ feature[f_oper_ctermica_fuente] }</td>
                    </tr>
                    <tr>
                        <th> N° Unidades </th>
                        <td>${ feature[f_oper_ctermica_nrounidades] }</td>
                        <th> Año POC </th>
                        <td>${ feature[f_oper_ctermica_aniopoc] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }

  // Centrales Eolica, Centrales Biomasa, Centrales Solar  - adicionalmente  Centrales Hidroelectricas
  let _pop_oper_ceolica_biomasa_solar = {
    title: `{${ f_oper_ceolica_biomasa_solar_tipocentral}} {${ f_oper_ceolica_biomasa_solar_nombre}}`,
    outFields: ['*'],
    content: getContentOperCEolicaBiomasaSolar
  }

  function getContentOperCEolicaBiomasaSolar(target) {
    let feature = target.graphic.attributes;
    // campos tipo fecha - sobreescribir con su correspondiente formateado
    feature[f_oper_ceolica_biomasa_solar_firmacontrato] =  Helper.getFormatDate(feature[f_oper_ceolica_biomasa_solar_firmacontrato], 'DD/MM/YYYY');    
    
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_oper_ceolica_biomasa_solar_potencianominal] != null ? feature[f_oper_ceolica_biomasa_solar_potencianominal] = Number(feature[f_oper_ceolica_biomasa_solar_potencianominal]).toFixed(2): '';
    feature[f_oper_ceolica_biomasa_solar_montoinv] != null ? feature[f_oper_ceolica_biomasa_solar_montoinv] = Number(feature[f_oper_ceolica_biomasa_solar_montoinv]).toFixed(2): '';

    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Centrales/${ feature[f_oper_ceolica_biomasa_solar_fotografia] }" alt="imagen de central">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td colspan="3">${ feature[f_oper_ceolica_biomasa_solar_empresa] }</td>
                    </tr>
                    <tr>
                        <th> Potencia Instalada </th>
                        <td>${ feature[f_oper_ceolica_biomasa_solar_potencianominal] } MW</td>
                        <th> Monto de Inversión </th>
                        <td> ${ feature[f_oper_ceolica_biomasa_solar_montoinv] } millones </td>
                    </tr>
                    <tr>
                        <th> Firma de Contrato </th>
                        <td> ${ feature[f_oper_ceolica_biomasa_solar_firmacontrato] } </td>
                        <th> Año POC </th>
                        <td>${ feature[f_oper_ceolica_biomasa_solar_aniopoc] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }

  // Subestaciones - todos  
  let _pop_oper_set = {
    title: `S.E. {${f_oper_set_nombre}}`,
    outFields: ['*'],
    content: getContentOperSet
  }

  function getContentOperSet(target) {
    let feature = target.graphic.attributes;
    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Subestaciones/${ feature[f_oper_set_fotografia] }" alt="imagen de la subestación">
                        </td>
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td>${ feature[f_oper_set_empresa] }</td>
                        <th> Ubicación </th>
                        <td>${ feature[f_oper_set_ubicacion] }</td>
                    </tr>
                    <tr>
                        <th> Año POC </th>
                        <td> ${ feature[f_oper_set_aniopoc] } </td>
                        <th> N° Trafos </th>
                        <td>${ feature[f_oper_set_nrotrafos] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }

  // Linea transmision - todos
  let _pop_oper_lt = {
    title: `{${f_oper_lt_nombre}} {${f_oper_lt_codlinea}}`,
    outFields: ['*'],
    content: getContentOperLT
  }

  function getContentOperLT(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_oper_lt_longitud] != null ? feature[f_oper_lt_longitud] = Number(feature[f_oper_lt_longitud]).toFixed(2): '';
    feature[f_oper_lt_potencianom] != null ? feature[f_oper_lt_potencianom] = Number(feature[f_oper_lt_potencianom]).toFixed(2): '';
    (feature[f_oper_lt_tensionnom] != null && (feature[f_oper_lt_tensionnom].toString()).indexOf('.') != -1 ) ? feature[f_oper_lt_tensionnom] = Number(feature[f_oper_lt_tensionnom]).toFixed(2): '';

    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Lineas/${ feature[f_oper_lt_fotografia] }" alt="imagen de la línea">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td>${ feature[f_oper_lt_empresa] }</td>
                        <th> Tensión </th>
                        <td>${ feature[f_oper_lt_tensionnom] } kV</td>
                    </tr>
                    <tr>
                        <th> Ubicación </th>
                        <td>${ feature[f_oper_lt_regiongeografica] }</td>
                        <th> N° Ternas </th>
                        <td>${ feature[f_oper_lt_nroternas] }</td>
                    </tr>
                    <tr>
                        <th> Longitud </th>
                        <td>${ feature[f_oper_lt_longitud] } Km</td>
                        <th> N° Soporte </th>
                        <td>${ feature[f_oper_lt_nrosoporte] }</td>
                    </tr>
                    <tr>
                        <th> Año POC </th>
                        <td> ${ feature[f_oper_lt_pcoanio] } </td>
                        <th> Materail Soporte </th>
                        <td>${ feature[f_oper_lt_materialsoport] }</td>
                    </tr>
                    <tr>
                        <th> Corriente Máxima </th>
                        <td>${ feature[f_oper_lt_corriente] } A</td>
                        <th> Tipo Soporte </th>
                        <td>${ feature[f_oper_lt_tiposoporte] }</td>
                    </tr>
                    <tr>
                        <th> Potencia Nominal </th>
                        <td>${ feature[f_oper_lt_potencianom] } MW</td>
                        <th> Material Conductor </th>
                        <td>${ feature[f_oper_lt_materialconduct] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }


  // estructuras
  let _pop_oper_estructura = {
    title: `{${f_oper_estructura_codlinea}} - Estructura {${ f_oper_estructura_codestructura }}`,
    outFields: ['*'],
    content: getContentOperEstructura
  }

  function getContentOperEstructura(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_oper_estructura_altura] != null ? feature[f_oper_estructura_altura] = Number(feature[f_oper_estructura_altura]).toFixed(2): '';

    // obtener el label del codigo de tipo 
    feature[f_oper_estructura_tipo] = getTypeEstructura(feature[f_oper_estructura_tipo]);

    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <th> Tipo </th>
                        <td>${ feature[f_oper_estructura_tipo] }</td>
                        <th> Altura </th>
                        <td>${ feature[f_oper_estructura_altura] } </td>
                    </tr>
                    <tr>
                        <th> N° Circuitos </th>
                        <td>${ feature[f_oper_estructura_ncircuito] }</td>
                        <th> Función </th>
                        <td>${ feature[f_oper_estructura_funcion] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }

  function getTypeEstructura(codtype) {
    let labeltype = '';
    switch (codtype) {
      case 'AC':
        labeltype = 'Postes de concreto y acero';
        break;
      case 'PC':
        labeltype = 'Postes de concreto';
        break;
      case 'PM':
        labeltype = 'Postes de madera';
        break;
      case 'TA':
        labeltype = 'Postes de acero';
        break;
      case 'AM':
        labeltype = 'Postes de madera y acero';
        break;
      case 'SS':
        labeltype = 'Instalación subterránea';
        break;
      case 'SE':
        labeltype = 'Sin estrura o red';
        break;
      
      default:
        labeltype = codtype;
        break;
    }
    
    return labeltype;
  }


  /**
   * Sistemas en Alerta
   */

  // Unidades de Generacion criticas
  let _pop_alert_ugc = {
    title: `{${f_alert_ugc_tipocentral}} - {${f_alert_ugc_nombrecg}} `,
    outFields: ['*'],
    content: getContentAlertUGC
  }

  function getContentAlertUGC(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_alert_ugc_potencia] != null ? feature[f_alert_ugc_potencia] = Number(feature[f_alert_ugc_potencia]).toFixed(2): '';

    let url_serviciodetalle = target.graphic.sourceLayer.url_serviciodetalle;
    let sql = `(${f_alert_ugc_det_idcg} = ${feature[f_alert_ugc_idcg]})`;
    let sqlperiod = '';
    let titleperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;

    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;
    typeof filterperiodo === 'undefined' ? '' : titleperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.titleperiod;
    sqlperiod != '' ? sql = `${sql} and ${sqlperiod}` : '';

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();
    _qparams.where = sql;
    _qparams.outFields = [f_alert_ugc_det_idcg, f_alert_ugc_det_codug, f_alert_ugc_det_nombreug];
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    return _queryt.execute(_qparams).then(function (response) {
      let data = response.features;
      let auxlength = data.length;
      let children = `<tr><th colspan="4">Unidades de Generación Críticas ${titleperiod} </th></tr>`;
      for (let i = 0; i < auxlength; i++) {
        let featurechild = data[i].attributes;
        let actions = '';
        if (__permisos_others.indexOf('AccionesPopup') != -1) {
          actions = `
                        <td colspan='3'>  
                            <span> Ver Evolución de Indicador: </span>   
                            <button data-cod_ug ='${featurechild[f_alert_ugc_det_codug]}' class="btn-alert-ugc-chart btn btn-sm btn-outline-info btn-popaction min-graphic" title="Indicador en gráfico"><span class="icon-bar-chart"></span></button>
                            <button data-cod_ug ='${featurechild[f_alert_ugc_det_codug]}' class="btn-alert-ugc-grid btn btn-sm btn-outline-info btn-popaction" title="Indicador en tabla"><span class="icon-table2"></span></button>
                        </td>`;
        }

        children += `
                <tr>
                    <td style="text-align: center;">
                        <span class="badge badge-info" style="font-size: 13px; margin-right: 5px;">${featurechild[f_alert_ugc_det_nombreug]}</span> 
                    </td>  
                    ${actions}
                </tr>`;
      }

      let content = `
                <div>
                    <table width=100%>
                        <tbody>
                            <tr>
                                <td colspan="4" style="text-align: center;"> 
                                    <img src="${__url_path_img}Centrales/${ feature[f_alert_ugc_fotografia] }" alt="imagen de centrales">
                                </td> 
                            </tr>
                            <tr>
                                <th> Empresa </th>
                                <td colspan="3">${ feature[f_alert_ugc_empresa] }</td>
                            </tr>
                            <tr>
                                <th> Potencia </th>
                                <td>${ feature[f_alert_ugc_potencia] } MW</td>
                                <th> N° Unidades </th>
                                <td>${ feature[f_alert_ugc_nrounidades] }</td>
                            </tr>
                        </tbody>
                    </table>

                    <table width=100% class="mt-2 tbl-detalle" >
                        <tbody>  
                            ${children}
                        </tbody>
                    </table>
                </div>`;
      return content;
    }).catch(function (error) {
      Helper.showError(error);
    });
  }

  // Transformadores sobrecargados
  let _pop_alert_ts = {
    title: `S.E. {${f_alert_ts_nombre}}`,
    outFields: ['*'],
    content: getContentAlerTS
  }

  function getContentAlerTS(target) {
    let feature = target.graphic.attributes;
    let url_serviciodetalle = target.graphic.sourceLayer.url_serviciodetalle;
    let sql = `(${f_alert_ts_det_codset} = '${feature[f_alert_ts_codset]}')`;
    let sqlperiod = '';
    let titleperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;

    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;
    typeof filterperiodo === 'undefined' ? '' : titleperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.titleperiod;
    sqlperiod != '' ? sql = `(${sql}) and ${sqlperiod}` : '';

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();
    _qparams.where = sql;
    _qparams.outFields = [f_alert_ts_det_codset, f_alert_ts_det_codtrf];
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    return _queryt.execute(_qparams).then(function (response) {
      let data = response.features;
      let auxlength = data.length;
      let children = `<tr><th colspan="4">Transformadores Sobrecargados ${titleperiod}</th></tr>`;
      for (let i = 0; i < auxlength; i++) {
        let featurechild = data[i].attributes;
        let actions = '';
        if (__permisos_others.indexOf('AccionesPopup') != -1) {
          actions = `
                        <td colspan='3'>  
                            <span> Ver Evoluc. Factor de Utilización: </span>   
                            <button data-cod_trf ='${featurechild[f_alert_ts_det_codtrf]}' class="btn-alert-ts-fu-chart btn btn-sm btn-outline-info btn-popaction min-graphic" title="FU en gráfico"><span class="icon-bar-chart"></span></button>
                            <button data-cod_trf ='${featurechild[f_alert_ts_det_codtrf]}' class="btn-alert-ts-fu-grid btn btn-sm btn-outline-info btn-popaction" title="FU en tabla"><span class="icon-table2"></span></button>
                        </td>`;
        }
        children += `
                <tr>
                    <td style="text-align: center;">
                        <span class="badge badge-info" style="font-size: 13px; margin-right: 5px;">${featurechild[f_alert_ts_det_codtrf]}</span> 
                    </td>  
                    ${actions}
                </tr>`;
      }

      let content = `
                <div>
                    <table width=100%>
                        <tbody>
                            <tr>
                                <td colspan="4" style="text-align: center;"> 
                                    <img src="${__url_path_img}Subestaciones/${ feature[f_alert_ts_fotografia] }" alt="imagen de subestacion">
                                </td>
                            </tr>
                            <tr>
                                <th>Empresa</th>
                                <td colspan="3">${ feature[f_alert_ts_empresa] }</td>
                            </tr>
                            <tr>
                                <th>Región</th>
                                <td>${ feature[f_alert_ts_region] }</td>
                                <th>Tensión</th>
                                <td>${ feature[f_alert_ts_tension] } kV</td>
                            </tr>
                        </tbody>
                    </table>

                    <table width=100% class="mt-2 tbl-detalle" >
                        <tbody>  
                            ${children}
                        </tbody>
                    </table>
                </div>`;
      return content;
    }).catch(function (error) {
      Helper.showError(error);
    });
  }


  // Transformadores Criticos
  let _pop_alert_tc = {
    title: `S.E. {${f_alert_tc_nombre}}`,
    outFields: ['*'],
    content: getContentAlertTC
  }

  function getContentAlertTC(target) {
    let feature = target.graphic.attributes;
    let url_serviciodetalle = target.graphic.sourceLayer.url_serviciodetalle;
    let sql = `(${f_alert_tc_det_codset} = '${feature[f_alert_tc_codset]}')`;
    let sqlperiod = '';
    let titleperiod = '';
    
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;
    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;
    typeof filterperiodo === 'undefined' ? '' : titleperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.titleanio;
    sqlperiod != '' ? sql = `(${sql}) and ${sqlperiod}` : '';

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();
    _qparams.where = sql;
    _qparams.outFields = [f_alert_tc_det_codset, f_alert_tc_det_codtrf];
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    return _queryt.execute(_qparams).then(function (response) {
      let data = response.features;
      let auxlength = data.length;
      let children = `<tr><th colspan="4">Transformadores Críticos ${titleperiod}</th></tr>`;
      for (let i = 0; i < auxlength; i++) {
        let featurechild = data[i].attributes;
        let actions = '';
        if (__permisos_others.indexOf('AccionesPopup') != -1) {
          actions = `
                        <td colspan="3">  
                            <span> Ver Evoluc. Indicadores de Confiabilidad: </span>   
                            <button data-cod_trf ='${featurechild[f_alert_tc_det_codtrf]}' class="btn-alert-tc-ic btn btn-sm btn-outline-info btn-popaction min-graphic" data-toggle="tooltip" data-placement="bottom" title="IC en gráfico"><span class="icon-bar-chart"></span></button>
                            <button data-cod_trf ='${featurechild[f_alert_tc_det_codtrf]}' class="btn-alert-tc-ic-grid btn btn-sm btn-outline-info btn-popaction" data-toggle="tooltip" data-placement="bottom" title="IC en tabla"><span class="icon-table2"></span></button>
                        </td>`;
        }
        children += `
                <tr>
                    <td>
                        <span class="badge badge-info" style="font-size: 13px; margin-right: 5px;">${featurechild[f_alert_tc_det_codtrf]}</span>
                    </td> 
                    ${actions}
                </tr>`;
      }

      let content = `
                <div>
                    <table width=100%>
                        <tbody>
                            <tr>
                                <td colspan="4" style="text-align: center;"> 
                                    <img src="${__url_path_img}Subestaciones/${ feature[f_alert_tc_fotografia] }" alt="imagen de subestacion">
                                </td> 
                            </tr>
                            <tr>
                                <th>Empresa</th>
                                <td colspan="3">${ feature[f_alert_tc_empresa] }</td>
                            </tr>
                            <tr>
                                <th>Región</th>
                                <td>${ feature[f_alert_tc_region] }</td>
                                <th>Tensión</th>
                                <td>${ feature[f_alert_tc_tension] } kV</td>
                            </tr>
                        </tbody>
                    </table>
        
                    <table width=100% class="mt-2 tbl-detalle">
                        <tbody>
                            ${children}
                        </tbody>
                    </table>
                </div>`;
      return content;
    }).catch(function (error) {
      Helper.showError(error);
    });
  }


  // S.E Asociadas a Sistemas electricos criticos
  let _pop_alert_sec = {
    title: `S.E. {${f_alert_sec_nombre}}`,
    outFields: ['*'],
    content: getContentAlertSEC
  }

  function getContentAlertSEC(target) {
    let feature = target.graphic.attributes;
    let url_serviciodetalle = target.graphic.sourceLayer.url_serviciodetalle;

    let sql = `(${f_alert_sec_det_codset} = '${feature[f_alert_sec_codset]}')`;
    let sqlperiod = '';
    let titleperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;
    
    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;
    typeof filterperiodo === 'undefined' ? '' : titleperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.titleanio;
    sqlperiod != '' ? sql = `(${sql}) and ${sqlperiod}` : '';

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();
    _qparams.where = sql;
    _qparams.outFields = [f_alert_sec_det_codset, f_alert_sec_det_codsec, f_alert_sec_det_namesec, f_alert_sec_det_empresa];
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    return _queryt.execute(_qparams).then(function (response) {
      let data = response.features;
      let auxlength = data.length;
      let children = `<tr><th colspan="4">Sistemas Eléctricos Críticos ${titleperiod}</th></tr>`;
      for (let i = 0; i < auxlength; i++) {
        let featurechild = data[i].attributes;
        children += `<tr class='tr-separador'> <td colspan=4></td> </tr>`;
        let actions = '';
        if (__permisos_others.indexOf('AccionesPopup') != -1) {
          actions = `
                        <tr class="tr-detalle">
                            <td colspan='2'> <span> Ver Evoluc. Indicadores de Confiabilidad: </span> </td>
                            <td colspan='2'>      
                                <button data-cod_sec ='${featurechild[f_alert_sec_det_codsec]}' class="btn-alert-sec-ic btn btn-sm btn-outline-info btn-popaction min-graphic" data-toggle="tooltip" data-placement="bottom" title="IC en gráfico"><span class="icon-bar-chart"></span></button>
                                <button data-cod_sec ='${featurechild[f_alert_sec_det_codsec]}' class="btn-alert-sec-ic-grid btn btn-sm btn-outline-info btn-popaction" data-toggle="tooltip" data-placement="bottom" title="IC en tabla"><span class="icon-table2"></span></button>
                            </td>
                        </tr>
                        <tr class="tr-detalle">
                            <td colspan='2'> <span> Ver Problemática y Soluciones: </span> </td>
                            <td colspan='2'>    
                                <button data-cod_sec='${featurechild[f_alert_sec_det_codsec]}' class="btn-alert-sec-pys btn btn-sm btn-outline-info btn-popaction" data-toggle="tooltip" data-placement="bottom" title="Problemática y Soluciones"><span class="icon-file-text2"></span></button>
                            </td>
                        </tr>`;
        }
        children += `
                <tr class="tr-detalle">
                    <td colspan='4' >
                        <span class="badge badge-info" style="font-size: 13px; margin-right: 5px;">${featurechild[f_alert_sec_det_codsec]} - ${featurechild[f_alert_sec_det_namesec]}</span>
                        <span class="badge badge-pill badge-warning" style="font-size: 12px; margin-right: 5px;">${featurechild[f_alert_sec_det_empresa]} </span>
                    </td> 
                </tr>    
                ${actions} `;

      }

      let content = `
                <div>
                    <table width=100%>
                        <tbody>
                            <tr>
                                <td colspan="4" style="text-align: center;"> 
                                    <img src="${__url_path_img}Subestaciones/${ feature[f_alert_sec_fotografia] }" alt="imagen de subestacion">
                                </td> 
                            </tr>
                            <tr>
                                <th>Empresa</th>
                                <td colspan="3">${ feature[f_alert_sec_empresa] }</td>
                            </tr>
                            <tr>
                                <th>Región</th>
                                <td>${ feature[f_alert_sec_region] }</td>
                                <th>Tensión</th>
                                <td>${ feature[f_alert_sec_tension] } kV</td>
                            </tr>
                            
                        </tbody>
                    </table>
        
                    <table width=100% class="mt-2 tbl-detalle">
                        <tbody>
                            ${children}
                        </tbody>
                    </table>
                </div>`;
      return content;
    }).catch(function (error) {
      Helper.showError(error);
    });
  }


  // Lineas congestionadas    
  let _pop_alert_ltcong = {
    title: `{${f_alert_ltcong_nombre}} ({${ f_alert_ltcong_codlinea }})`,
    outFields: ['*'],
    content: getContenAlertLTCong
  }

  function getContenAlertLTCong(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_alert_ltcong_longitud] != null ? feature[f_alert_ltcong_longitud] = Number(feature[f_alert_ltcong_longitud]).toFixed(2): '';

    let content = `
            <div>
                <table width=100%>
                    <tbody>
                        <tr>
                            <td colspan="4" style="text-align: center;"> 
                                <img src="${__url_path_img}Lineas/${feature[f_alert_ltcong_fotografia]}" alt="imagen de la línea">
                            </td> 
                        </tr>
                        <tr>
                            <th>Empresa</th>
                            <td>${ feature[f_alert_ltcong_empresa] }</td>
                            <th>Región</th>
                            <td>${ feature[f_alert_ltcong_region] }</td>
                        </tr>
                        <tr>
                            <th>Tensión</th>
                            <td>${ feature[f_alert_ltcong_tension] } kV</td>
                            <th>Longitud</th>
                            <td>${ feature[f_alert_ltcong_longitud] } Km</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>`;
    return content;
  }


  // Lineas criticas y radiales
  let _pop_alert_ltcyr = {
    title: `{${f_alert_ltcrit_nombre}} ({${f_alert_ltcrit_codlinea}})`,
    outFields: ['*'],
    content: getContentAlertLTCyR
  }

  function getContentAlertLTCyR(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_alert_ltcrit_longitud] != null ? feature[f_alert_ltcrit_longitud] = Number(feature[f_alert_ltcrit_longitud]).toFixed(2): '';

    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Lineas/${ feature[f_alert_ltcrit_fotografia] }" alt="imagen de la línea">
                        </td> 
                    </tr>
                    <tr>
                        <th>Empresa</th>
                        <td>${ feature[f_alert_ltcrit_empresa] }</td>
                        <th>Región</th>
                        <td>${ feature[f_alert_ltcrit_region] }</td>
                    </tr>
                    <tr>
                        <th>Tensión</th>
                        <td>${ feature[f_alert_ltcrit_tension] } kV</td>
                        <th>Longitud</th>
                        <td>${ feature[f_alert_ltcrit_longitud] } Km</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }



  /**
   * Proyectadas
   */

  // C. Hidroelectricas - adicionalmente para C. Termicas, Solares, Eolicas, Biomasa
  let _pop_proy_chidroelectrica = {
    title: `{${f_proy_chidroelectrica_tipocentral}} {${f_proy_chidroelectrica_nombre}}`,
    outFields: ['*'],
    content: getContentProyCHidroelectrica
  }

  function getContentProyCHidroelectrica(target) {
    let feature = target.graphic.attributes;
    // campos tipo fecha - sobreescribir con su correspondiente formateado
    feature[f_proy_chidroelectrica_firmacontrato] =  Helper.getFormatDate(feature[f_proy_chidroelectrica_firmacontrato], 'DD/MM/YYYY');    
    
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_proy_chidroelectrica_potencianominal] != null ? feature[f_proy_chidroelectrica_potencianominal] = Number(feature[f_proy_chidroelectrica_potencianominal]).toFixed(2): '';
    feature[f_proy_chidroelectrica_montoinv] != null ? feature[f_proy_chidroelectrica_montoinv] = Number(feature[f_proy_chidroelectrica_montoinv]).toFixed(2): '';

    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Centrales/${ feature[f_proy_chidroelectrica_fotografia] }" alt="imagen central hidroelectrica">
                        </td> 
                    </tr>
                    <tr>
                        <th > Empresa </th>
                        <td colspan="3">${ feature[f_proy_chidroelectrica_empresa] }</td>
                    </tr>
                    <tr>
                        <th> Potencia Instalada </th>
                        <td>${ feature[f_proy_chidroelectrica_potencianominal] } MW</td>
                        <th> Monto de Inversión </th>
                        <td>${ feature[f_proy_chidroelectrica_montoinv] } millones </td>
                    </tr>
                    <tr>
                        <th> Firma de Contrato </th>
                        <td>${ feature[f_proy_chidroelectrica_firmacontrato] }</td>
                        <th> Año POC </th>
                        <td>${ feature[f_proy_chidroelectrica_aniopoc] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }


  // Subestaciones - todos
  let _pop_proy_set = {
    title: `S.E. {${f_proy_set_nombre}}`,
    outFields: ['*'],
    content: getContentProySet
  }

  function getContentProySet(target) {
    let feature = target.graphic.attributes;
    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Subestaciones/${ feature[f_proy_set_fotografia] }" alt="imagen de la subestación">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td>${ feature[f_proy_set_empresa] }</td>
                        <th> Ubicación </th>
                        <td>${ feature[f_proy_set_ubicación] }</td>
                    </tr>
                    <tr>
                        <th> Año POC </th>
                        <td>${ feature[f_proy_set_aniopoc] }</td>
                        <th> N° Trafos </th>
                        <td>${ feature[f_proy_set_nrotrafos] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }


  // Lineas Transmision - todos
  let _pop_proy_lt = {
    title: `{${f_proy_lt_nombre}}`,
    outFields: ['*'],
    content: getContentProyLT
  }

  function getContentProyLT(target) {
    let feature = target.graphic.attributes;
    // campos tipo fecha - sobreescribir con su correspondiente formateado
    feature[f_proy_lt_fechacontrato] =  Helper.getFormatDate(feature[f_proy_lt_fechacontrato], 'DD/MM/YYYY');    
    
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_proy_lt_longitud] != null ? feature[f_proy_lt_longitud] = Number(feature[f_proy_lt_longitud]).toFixed(2): '';
    feature[f_proy_lt_inversion] != null ? feature[f_proy_lt_inversion] = Number(feature[f_proy_lt_inversion]).toFixed(2): '';
    (feature[f_proy_lt_tension] != null && (feature[f_proy_lt_tension].toString()).indexOf('.') != -1 ) ? feature[f_proy_lt_tension] = Number(feature[f_proy_lt_tension]).toFixed(2): '';

    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Lineas/${feature[f_proy_lt_fotografia]}" alt="imagen de la línea">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td>${ feature[f_proy_lt_empresa] }</td>
                        <th> Tensión </th>
                        <td>${ feature[f_proy_lt_tension] } kV</td>
                    </tr>
                    <tr>
                        <th> Longitud </th>
                        <td>${ feature[f_proy_lt_longitud] } Km</td>
                        <th> Inversión </th>
                        <td>${ feature[f_proy_lt_inversion] } millones </td>
                    </tr>
                    <tr>
                        <th> Fecha de Contrato </th>
                        <td>${ feature[f_proy_lt_fechacontrato] }</td>
                        <th> Año POC </th>
                        <td>${ feature[f_proy_lt_aniopoc] }</td>
                    </tr>
                    </tbody>
            </table>
        </div>`;
    return content;
  }



  /**
   * Eventos Relevantes
   */

  // Subestaciones
  let _pop_er_set = {
    title: `S.E {${ f_er_set_nombre }}`,
    outFields: ['*'],
    content: getContentERSet
  }

  function getContentERSet(target) {
    let feature = target.graphic.attributes;
    let content = `
        <div>
            <table width=100% >
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Subestaciones/${ feature[f_er_set_fotografia] }" alt="imagen de subestacion">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td colspan="3">${ feature[f_er_set_empresa] }</td>
                    </tr>
                    <tr>
                        <th> Región </th>
                        <td>${ feature[f_er_set_ubicacion] }</td>
                        <th> Tensión </th>
                        <td>${ feature[f_er_set_tension] } kV</td>
                    </tr>
                    <tr>
                        <td colspan='4' class='text-center'>  
                            <button data-cod_set ='${ feature[f_er_set_codset] }' class="btn-er-set-ver btn btn-sm btn-outline-info btn-popaction" >Ver Eventos Relevantes</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }


  // Lineas Transmision
  let _pop_er_lt = {
    title: `{${ f_er_lt_nombre }}`,
    outFields: ['*'],
    content: getContentERLT
  }

  function getContentERLT(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_er_lt_longitud] != null ? feature[f_er_lt_longitud] = Number(feature[f_er_lt_longitud]).toFixed(2): '';
    (feature[f_er_lt_tension] != null && (feature[f_er_lt_tension].toString()).indexOf('.') != -1 ) ? feature[f_er_lt_tension] = Number(feature[f_proy_lt_tension]).toFixed(2): '';

    let content = `
        <div>
            <table width=100% >
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Lineas/${ feature[f_er_lt_fotografia] }" alt="imagen de la línea">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td>${ feature[f_er_lt_empresa] }</td>
                        <th> Región </th>
                        <td>${ feature[f_er_lt_ubicacion] }</td>
                    </tr>
                    <tr>
                        <th> Tensión </th>
                        <td>${ feature[f_er_lt_tension] } kV</td>
                        <th> Longitud </th>
                        <td>${ feature[f_er_lt_longitud] } Km </td>
                    </tr>
                    <tr>
                        <td colspan='4' class='text-center'>  
                            <button data-cod_lt ='${ feature[f_er_lt_codlinea] }' class="btn-er-lt-ver btn btn-sm btn-outline-info btn-popaction">Ver Eventos Relevantes</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }

  // Centrales de Energía
  let _pop_er_ce = {
    title: `{${ f_er_c_tipocentral }} {${ f_er_c_nombre } }`,
    outFields: ['*'],
    content: getContentERC
  }

  function getContentERC(target) {
    let feature = target.graphic.attributes;
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_er_c_potencia] != null ? feature[f_er_c_potencia] = Number(feature[f_er_c_potencia]).toFixed(2): '';

    let content = `
        <div>
            <table width=100% >
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="${__url_path_img}Centrales/${ feature[f_er_c_fotografia] }" alt="imagen de centrales">
                        </td> 
                    </tr>
                    <tr>
                        <th> Empresa </th>
                        <td colspan="3">${ feature[f_er_c_empresa] }</td>
                    </tr>
                    <tr>
                        <th> Potencia </th>
                        <td> ${ feature[f_er_c_potencia] } MW </td>
                        <th> N° Unidades </th>
                        <td>${ feature[f_er_c_nrounidades]}</td>
                    </tr>
                    <tr>
                        <td colspan='4' class='text-center'>  
                            <button data-cod_cg ='${ feature[f_er_c_cod] }' class="btn-er-c-ver btn btn-sm btn-outline-info btn-popaction">Ver Eventos Relevantes</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }


  /**
   * Plan de Inversiones
   */

  // PI Subestaciones
  let _pop_pi_set = {
    title: `S.E. {${ f_pi_set_nombre }}`,
    outFields: ['*'],
    content: getContentPISet
  }

  function getContentPISet(target) {
    let feature = target.graphic.attributes;
    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <th> Empresa </th>
                        <td>${ feature[f_pi_set_empresa] }</td>
                        <th> Ubicación </th>
                        <td>${ feature[f_pi_set_ubicacion] }</td>
                    </tr>
                    <tr>
                        <th> Año POC </th>
                        <td>${ feature[f_pi_set_aniopoc] }</td>
                        <th> N° Trafos </th>
                        <td>${ feature[f_pi_set_nrotrafos] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }


  // PI Lineas Transmision
  let _pop_pi_lt = {
    title: `{${ f_pi_lt_nombre}}`,
    outFields: ['*'],
    content: getContentPILT
  }

  function getContentPILT(target) {
    let feature = target.graphic.attributes;
    // campos tipo fecha - sobreescribir con su correspondiente formateado
    feature[f_pi_lt_fechacontrato] =  Helper.getFormatDate(feature[f_pi_lt_fechacontrato], 'DD/MM/YYYY');    
    
    // campos tipo double - sobreescribir con su correspondiente de dos decimales
    feature[f_pi_lt_longitud] != null ? feature[f_pi_lt_longitud] = Number(feature[f_pi_lt_longitud]).toFixed(2): '';
    feature[f_pi_lt_inversion] != null ? feature[f_pi_lt_inversion] = Number(feature[f_pi_lt_inversion]).toFixed(2): '';
    (feature[f_pi_lt_tension] != null && (feature[f_pi_lt_tension].toString()).indexOf('.') != -1 ) ? feature[f_pi_lt_tension] = Number(feature[f_proy_lt_tension]).toFixed(2): '';

    let content = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <th> Empresa </th>
                        <td>${ feature[f_pi_lt_empresa] }</td>
                        <th> Tensión </th>
                        <td>${ feature[f_pi_lt_tension] } kV</td>
                    </tr>
                    <tr>
                        <th> Longitud </th>
                        <td>${ feature[f_pi_lt_longitud] } Km</td>
                        <th> Inversión  </th>
                        <td>${ feature[f_pi_lt_inversion] } millones </td>
                    </tr>
                    <tr>
                        <th> Fecha de contrato </th>
                        <td>${ feature[f_pi_lt_fechacontrato] }</td>
                        <th> Año POC </th>
                        <td>${ feature[f_pi_lt_aniopoc] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return content;
  }



  /**
   * Descargas Atmosféricas
   */

  // Descargas Atmosféricas
  let _pop_da = {
    title: `Descargas Atmosféricas #{${ f_da_coorda}}`,
    outFields: ['*'],
    content: getContentDA
  }

  function getContentDA(target) {
    let feature = target.graphic.attributes;
    // campos tipo fecha - sobreescribir con su correspondiente formateado
    feature[f_da_fecha] =  Helper.getFormatDate(feature[f_da_fecha], 'DD/MM/YYYY HH:mm:ss');
    
    let popup = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                            <img src="img/descargaatmosferica.jpg" alt="imagen de centrales">
                        </td> 
                    </tr>
                    <tr>
                        <th colspan="4" style="text-align: center;">Fecha y hora </th>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align: center;">${ feature[f_da_fecha] }</td>
                    </tr>
                    <tr>
                        <th>Intensidad(KA)</th>
                        <td>${ feature[f_da_intensidad] }</td>
                        <th>Tipo</th>
                        <td>${ feature[f_da_tipo] }</td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return popup;
  }


  /**
   * Informacion Grafica
   */

  // Drones
  let _pop_drone = {
    title: `Drone`,
    outFields: ['*'],
    content: getContentDrone
  }

  function getContentDrone(target) {
    let feature = target.graphic.attributes;
    let popup = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <th> Nombre</th>
                        <td colspan="3">${feature[f_ig_drone_nombre]}</td>
                    </tr>
                    <tr>
                        <th>Tipo de Instalación</th>
                        <td colspan=3 >${ feature[f_ig_drone_tipoinstalacion] }</td>
                    </tr>
                    <tr>
                        <th> Empresa</th>
                        <td colspan="3">${feature[f_ig_drone_empresa]}</td>
                    </tr>
                    <tr>
                        <td colspan='4' class='text-center'>  
                            <button class="btn-drone-vervideo btn btn-sm btn-outline-info btn-popaction" >Ver Video</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
    return popup;
  }

  /**
   * Puntos de entrega - Calidad
   */

  // Puntos de entrega
  let _pop_PE = {
    title: `Punto de Entrega {${ f_pe_nombre }}`,
    outFields: ['*'],
    content: getContentPE
  }

  function getContentPE(target) {
    let feature = target.graphic.attributes;
    let popup = `
        <div>
            <table width=100%>
                <tbody>
                    <tr>
                        <th> Cliente </th>
                        <td colspan=3 >${ feature[f_pe_cliente] }</td>
                    </tr>
                    <tr>
                        <th> Propietario </th>
                        <td colspan="3">${feature[f_pe_propietario]}</td>
                    </tr>
                    <tr>
                        <th> Tensión Nominal(kV) </th>
                        <td colspan="3">${feature[f_pe_tension]}</td>
                    </tr>
                    <tr>
                      <td colspan="4" style="text-align: center; font-weight: bold;"> Esquema Unifilar </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align: center;"> 
                          <a href="${__url_path_img}punto-entrega/${feature[f_pe_img] }" target="_blank" rel="esquema unifilar">
                            <img src="${__url_path_img}punto-entrega/${feature[f_pe_img] }" alt="imagen de esquema unifilar">
                          </a>
                        </td> 
                    </tr>
                </tbody>
            </table>
        </div>`;
    return popup;
  }


  //################################################ DEFINICION DE POPACTIONS PARA BTN VER MÁS ################################################

  //Al momento de asignar PopupTemplate de cada capa en informationlayers.js (createPopupDefault) se lo añade action "ver más" (...) 
  //Aquí se define sus popactions personalizados para cada capa y se ejecuta la funcionalidad de cada uno. 

  var $divview = $('#div_view');

  var __gra_popup = {}; // Gráfico para el focus del selected feature (al mostrar su popup)
  var __selectedlayerpop = ""; // Layer del selected feature (al mostrar su popup)


  // Definición de PopActions personalizados por capa para el btn "Ver más"

  function getPopActions() { //return div de popactions
    let aliassector = __selectedlayerpop.alias_sector;
    let sector = __globspace.infolayers.find(layer => layer.alias == aliassector);
    let layername = $.trim(__selectedlayerpop.title);
    let selectedfeature = __globspace.view.popup.selectedFeature.attributes;
    let div_popactions = "";

    if (aliassector == "__mil_operacion") { //SISTEMAS EN OPERACIÓN
      switch (layername) {
        // Centrales Convencionales
        case sector.aliastitlelayers.layer_cc_ct_sein:
        case sector.aliastitlelayers.layer_cc_ct_aislados:
        case sector.aliastitlelayers.layer_cc_ch_aislados:
        case sector.aliastitlelayers.layer_cc_ch_sein:
          div_popactions = `
                    <div class="div-actionspopup">
                        <div class="row-actions">  
                            <span class="lbl-popaction"> ¿Qué EPP utilizar? Ver calculador de Energía Incidente</span> 
                            <div>      
                                <button class="btn-oper-calculator btn-popaction" id_epp="${layername} ${selectedfeature.NOMBRE}"><span class="icon-calculator"></span></button>
                            </div>
                        </div>            
                    </div>`;
          break;

          // Centrales No Convencionales
        case sector.aliastitlelayers.layer_cnc_hidroelectrica:  
        case sector.aliastitlelayers.layer_cnc_eolica:
        case sector.aliastitlelayers.layer_cnc_biomasa:
        case sector.aliastitlelayers.layer_cnc_solar:
          div_popactions = `
                    <div class="div-actionspopup">
                        <div class="row-actions">  
                            <span class="lbl-popaction"> ¿Qué EPP utilizar? Ver calculador de Energía Incidente</span> 
                            <div>      
                                <button class="btn-oper-calculator btn-popaction" id_epp="${layername} ${selectedfeature.NOMBRE}"><span class="icon-calculator"></span></button>
                            </div>
                        </div>            
                    </div>`;
          break;

          // SETs
        case sector.aliastitlelayers.layer_set_33:
        case sector.aliastitlelayers.layer_set_60:
        case sector.aliastitlelayers.layer_set_138:
        case sector.aliastitlelayers.layer_set_220:
        case sector.aliastitlelayers.layer_set_500:
          div_popactions = `
                    <div class="div-actionspopup">  
                        <div class="row-actions">  
                            <span class="lbl-popaction"> ¿Qué EPP utilizar? Ver calculador de Energía Incidente</span>      
                            <div>                      
                                <button class="btn-oper-calculator btn-popaction" id_epp="${layername} ${selectedfeature.NOMBRE}"><span class="icon-calculator"></span></button>
                            </div>
                        </div>          
                    </div>`;
          break;

          //Lineas Transmisión - no tienen

        }

    } else if (aliassector == "__mil_alerta") { //SISTEMAS EN ALERTA
      switch (layername) {
        //SETA (TRANSMISIÓN)
        case sector.aliastitlelayers.layer_ltc :
          div_popactions = `
                    <div class="div-actionspopup">
                        <div class="row-actions">  
                        <span class="lbl-popaction"> Ver Evoluc. Factor de Utilización</span>      
                        <div>      
                            <button class="btn-alert-ltc-fu-chart btn-popaction min-graphic"><span class="icon-bar-chart"></span></button>
                            <button class="btn-alert-ltc-fu-grid btn-popaction"><span class="icon-table2"></span></button>
                        </div>
                        </div>   
                    </div>`;
          break;

        case sector.aliastitlelayers.layer_ltcyr :
          div_popactions = `
                    <div class="div-actionspopup">
                        <div class="row-actions">  
                        <span class="lbl-popaction"> Ver Evoluc. Indicadores de Confiabilidad</span>   
                        <div>      
                            <button class="btn-alert-ltcyr-ic-chart btn-popaction min-graphic"><span class="icon-bar-chart"></span></button>
                            <button class="btn-alert-ltcyr-ic-grid btn-popaction"><span class="icon-table2"></span></button>
                        </div>
                        </div>            
                    </div>`;
          break;
      }

    } else if (aliassector == "__mil_proyectos") { // PROYECTOS
      let urlficha = 'https://gisem.osinergmin.gob.pe/NewMapaSEIN/Documentos/Ficha/';
      let nameficha = selectedfeature[f_ficha];
      switch (layername) {

        // Centrales Convencionales y No Convencionales
        case sector.aliastitlelayers.layer_cc_termica :
        case sector.aliastitlelayers.layer_cc_hidroelectrica: 
        case sector.aliastitlelayers.layer_cnc_hidroelectrica:
        case sector.aliastitlelayers.layer_cnc_eolica :
        case sector.aliastitlelayers.layer_cnc_biomasa :
        case sector.aliastitlelayers.layer_cnc_solar :
          urlficha += `Centrales/${nameficha}`;
          break;

          // SETs
        case sector.aliastitlelayers.layer_set_33:
        case sector.aliastitlelayers.layer_set_60:
        case sector.aliastitlelayers.layer_set_138:
        case sector.aliastitlelayers.layer_set_220:
        case sector.aliastitlelayers.layer_set_500:
          urlficha += `Subestaciones/${nameficha}`;
          break;

          //Lineas Transmisión
        case sector.aliastitlelayers.layer_lt_33:
        case sector.aliastitlelayers.layer_lt_60:
        case sector.aliastitlelayers.layer_lt_138:
        case sector.aliastitlelayers.layer_lt_220:
        case sector.aliastitlelayers.layer_lt_500:
          urlficha += `Lineas/${nameficha}`;
          break;
      }

      div_popactions = `
            <div class="div-actionspopup">
            <div class="row-actions">  
                <span class="lbl-popaction"> Ver Ficha Técnica</span>
                <div>      
                    <button class="btn-popaction btn-fichadoc min-doc" data-urlfichadoc='${urlficha}'><span class="icon-file-text2"></span></button>
                </div>
            </div>            
            </div>`;
    } else if (aliassector == "__mil_pe") { // PUNTOS DE ENTREGA
      switch (layername) {
        case  sector.aliastitlelayers.layer_pe:
          div_popactions = `
                    <div class="div-actionspopup">
                        <div class="row-actions">  
                            <span class="lbl-popaction"> Información de Puntos de Entrega </span>
                            <div>      
                                <button class="btn-pe-grid btn-popaction"><span class="icon-table2"></span></button>
                            </div>
                        </div>   
                        <div class="row-actions">  
                            <span class="lbl-popaction"> Información de Calidad de Tensión </span>
                            <div>      
                                <button class="btn-pe-tension-grid btn-popaction"><span class="icon-table2"></span></button>
                            </div>
                        </div>   
                        <div class="row-actions">  
                            <span class="lbl-popaction"> Información de Calidad de Suministro </span>
                            <div>      
                                <button class="btn-pe-suministro-grid btn-popaction"><span class="icon-table2"></span></button>
                            </div>
                        </div>   
                    </div>`;
          break;
      }
    } else if (aliassector == "__mil_pi") { // PLAN DE INVERSION
      let urlficha = 'https://gisem.osinergmin.gob.pe/NewMapaSEIN/Documentos/Ficha/';
      let nameficha = selectedfeature[f_ficha];

      switch (layername) {
         // SETs
        case sector.aliastitlelayers.layer_set_33:
        case sector.aliastitlelayers.layer_set_60:
        case sector.aliastitlelayers.layer_set_138:
        case sector.aliastitlelayers.layer_set_220:
        case sector.aliastitlelayers.layer_set_500:
          urlficha += `Subestaciones/${nameficha}`;
          break;

          //Lineas Transmisión
        case sector.aliastitlelayers.layer_lt_33:
        case sector.aliastitlelayers.layer_lt_60:
        case sector.aliastitlelayers.layer_lt_138:
        case sector.aliastitlelayers.layer_lt_220:
        case sector.aliastitlelayers.layer_lt_500:
          urlficha += `Lineas/${nameficha}`;
          break;
      }

      div_popactions = `
            <div class="div-actionspopup">
              <div class="row-actions">  
                  <span class="lbl-popaction"> Ver Ficha Técnica</span>
                  <div>      
                    <button class="btn-popaction btn-fichadoc min-doc" data-urlfichadoc='${urlficha}'><span class="icon-file-text2"></span></button>
                  </div>
              </div>            
            </div>`;
    }

    return div_popactions;
  }


  //################################################ UX ################################################

  //Evento lanzado al seleccionar entidad 
  __globspace.view.popup.watch("selectedFeature", function (feature) {
    __globspace.view.graphics.remove(__gra_popup);
    __gra_popup = {};
    if (feature !== null) {
      __selectedlayerpop = feature.sourceLayer;

      if (feature.geometry != null) {
        let symbol = getSymbolPopup(feature.geometry);
        if (Object.keys(__gra_popup).length == 0) {
          __gra_popup = new Graphic({
            geometry: feature.geometry,
            symbol: symbol
          });
        }
        __gra_popup.geometry = feature.geometry;
        __globspace.view.graphics.add(__gra_popup);
      }

      $('.container-actions', $divview).hide();
      customizePopup();
    }
  });

  //Evento lanzado al terminar de mostrar popup
  __globspace.view.popup.watch("visible", function (visible) {
    if (visible) {
      $('.esri-popup__footer', $divview).append('<div class="container-actions">actions</div>');
      $('.container-actions', $divview).hide();
      setTimeout(function () {
        customizePopup();
      }, 100);
    } else {
      __globspace.view.graphics.remove(__gra_popup);
      __gra_popup = {};
    }
  });

  //Evento lanzado al acoplar/desacoplar popup 
  $divview.on('click', '.esri-popup__button.esri-popup__button--dock', function () {
    console.log("acopló/desacopló popup");
    setTimeout(function () {
      customizePopup();
    }, 100);
  });


  //Evento lanzado al clickar en popaction btn "ver más" o similares => trigger-action
  __globspace.view.popup.on("trigger-action", function (event) {
    if (event.action.id === "more-popactions") {
      let $div_popactions = getPopActions();
      $('.container-actions', $divview).html($div_popactions).toggle();

    } else if (event.action.id === "transf-popaction") {
      let selectedfeature = __globspace.view.popup.selectedFeature;
      let url_servicio = selectedfeature.sourceLayer.url_serviciotransform;
      let aliassector = selectedfeature.sourceLayer.alias_sector;
      let sector = __globspace.infolayers.find(layer => layer.alias == aliassector);
      let layername = selectedfeature.sourceLayer.title;
      let codset = '';
      let nameset = '';

      if (aliassector == "__mil_operacion"){
        switch (layername) {
          case sector.aliastitlelayers.layer_set_33:
          case sector.aliastitlelayers.layer_set_60:
          case sector.aliastitlelayers.layer_set_138:
          case sector.aliastitlelayers.layer_set_220:
          case sector.aliastitlelayers.layer_set_500:
          
            codset = f_oper_set_codigo;
            nameset = f_oper_set_nombre;
            break;
        }
      } else if (aliassector == "__mil_alerta"){
        switch (layername) {
          case sector.aliastitlelayers.layer_ts:
            codset = f_alert_ts_codset;
            nameset = f_alert_ts_nombre;
            break;
          case sector.aliastitlelayers.layer_tc :
            codset = f_alert_tc_codset;
            nameset = f_alert_tc_nombre;
            break;
          case sector.aliastitlelayers.layer_sec :
            codset = f_alert_sec_codset;
            nameset = f_alert_sec_nombre;
            break;
        }
      }

      codset = selectedfeature.attributes[codset];
      nameset = selectedfeature.attributes[nameset];

      let title = `Transformadores de la S.E ${nameset}`;
      let _queryt = new QueryTask({ url: url_servicio });
      let _qparams = new Query();

      _qparams.where = `${f_trf_codset} = ${codset}`;
      _qparams.outFields = [f_trf_codtrf, f_trf_tipotrf, f_trf_anio, f_trf_relacion, f_trf_potencia];
      _qparams.orderByFields = `${f_trf_posicion} asc`;
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams).then(function (response) {
        let nreg = response.features.length;
        if (nreg == 0) {
          Helper.hidePreloader();
          alertMessage('No hay registros de transformadores para esta S.E', 'info', '', true);
          $('#container_tbltransf').addClass('notvisible').removeClass('visible');
        } else {
          Helper.loadTableTransform(response, title, '#tbl_transf');
        }

      }).catch(function (error) {
        Helper.hidePreloader();
        Helper.showError(error);
      });
    }
  });


  //** Acción de cada Popaction personalizado

  // Centrales y SETs - Sistemas en operacion  - calculador energía -> codigo reusado del common.min.js de la version antigua del visor google.  
  $divview.on("click", ".btn-oper-calculator", function () { // abrir modal
    e = "Calculador de Energ&iacute;a Incidente para la " + (t = $(this).attr("id_epp")), 
    a = '<div><form class="form-horizontal" id="epp_form"><div class="form-group row"><label for="inputVolt" class="col-sm-2 col-form-label">Tensi&oacute;n</label><div class="col-sm-2"><div class="input-group"><input type="text" class="form-control" id="inputVolt"><div class="input-group-append"><span class="input-group-text">kV</span></div></div></div><label for="inputkA" class="col-sm-2 col-form-label">Corriente de Falla</label><div class="col-sm-2"><div class="input-group"><input type="text" class="form-control" id="inputkA"><div class="input-group-append"><span class="input-group-text">kA</span></div></div></div><label for="inputTime" class="col-sm-2 col-form-label">Duraci&oacute;n de Arco</label><div class="col-sm-2"><div class="input-group"><input type="text" class="form-control" id="inputTime" value="0.2"><div class="input-group-append"><span class="input-group-text">s</span></div></div></div></div><div class="form-group row"><label for="inputGround" class="col-sm-2 col-form-label">Aterramiento</label><div class="col-sm-4"><select class="form-control" id="inputGround"><option value="0">Aterrado</option><option value="1">No aterrado</option><option value="2">Alta resistencia</option></select></div><label for="inputEquipo" class="col-sm-2 col-form-label">Tipo de Equipo</label><div class="col-sm-4"><select class="form-control" id="inputEquipo"><option value="0">Al aire libre</option><option value="1">Celda</option><option value="2">Tablero</option><option value="3">Cable</option></select></div></div><div class="form-group row"><label for="inputGap" class="col-sm-3 col-form-label">Distancia entre Conductores</label><div class="col-sm-3"><div class="input-group"><input type="text" class="form-control" id="inputGap" value="32"><div class="input-group-append"><span class="input-group-text">mm</span></div></div></div><label for="inputWork" class="col-sm-3 col-form-label">Distancia de Trabajo</label><div class="col-sm-3"><div class="input-group"><input type="text" class="form-control" id="inputWork" value="910"><div class="input-group-append"><span class="input-group-text">mm</span></div></div></div></div><div class="form-group row justify-content-between"><div class="col-sm-2"><button type="button" class="btn btn-primary" id="calcArcFlash">Calcular</button></div><div class="col-sm-1"><button type="button" class="btn btn-help-calculadora" id="btn_helpcalculator" data-toggle="modal" data-target="modalhelpcalculator" title="Información Referencial"><img src="img/info.png"></button></div></div></form><div><div class="col-sm-12" id="epp_div"></div></div></div>';
    return bootbox.dialog({
        title: e,
        message: a,
        size: "large",
        backdrop: !0
    });   
  });

  $("body").on("change", "#inputVolt, #inputEquipo", function () { // cambio de valores en inputs-modal
      var e, a, t, i = $("#inputVolt").val(),
          o = $("#inputEquipo").val();
      e = i < 10 ? "" : i <= 23 ? 16 : i <= 60 ? 25 : i < 138 ? 31.5 : i < 220 ? 40 : "", a = 0 == o ? 910 : 1 == o && i <= 1 ? 610 : 1 == o && 1 < i && i <= 15 ? 910 : 2 == o || 3 == o ? 455 : "", t = 0 == o ? 32 : 1 == o && i <= 1 ? 32 : 1 == o && 1 < i && i <= 5 ? 104 : 1 == o && 5 < i && i <= 15 ? 152 : 2 == o ? 25 : 3 == o ? 13 : "", $("#inputkA").val(e), $("#inputWork").val(a), $("#inputGap").val(t)
  });

  $("body").on("click", "#calcArcFlash", function () { // btn calcular
      var e = calcArcFlashEnergy($("#inputVolt").val(), $("#inputTime").val(), $("#inputWork").val(), $("#inputkA").val(), $("#inputGap").val(), $("#inputGround").val(), $("#inputEquipo").val()),
          a = "<div class='row text-center'><h1 class='w100'>Resultados</h1></div><div class='row'><div class='col-sm-8'><table class='table table-responsive table-hover'><thead><tr><th>M&eacute;todo</th><th>Energ&iacute;a Incidente</th><th>Observaci&oacute;n</th></tr></thead><tbody><tr><td><a href='#' class='arcflash' data-enin='" + e[1].e + "' data-ttpp='1'>NFPA 70E<br /><small>(Ralph Lee)</small></a></td><td class='text-" + e[1].c + "'>" + Math.round(100 * e[1].e) / 100 + " cal/cm<sup>2</sup></td><td class='" + e[1].c + " tooltipeado' data-tooltip-content='#tooltip_content_1' id='ttpp1'>" + e[1].m + "</td></tr><tr><td><a href='#' class='arcflash' data-enin='" + e[2].e + "' data-ttpp='2'>NFPA 70E<br /><small>(Doughty Neal)</small></a></td><td class='text-" + e[2].c + "'>" + Math.round(100 * e[2].e) / 100 + " cal/cm<sup>2</sup></td><td class='" + e[2].c + " tooltipeado' data-tooltip-content='#tooltip_content_2' id='ttpp2'>" + e[2].m + "</td></tr><tr><td><a href='#' class='arcflash' data-enin='" + e[3].e + "' data-ttpp='3'>IEEE 1584<br /><small>(Emp&iacute;rico)</small></a></td><td class='text-" + e[3].c + "'>" + Math.round(100 * e[3].e) / 100 + " cal/cm<sup>2</sup></td><td class='" + e[3].c + " tooltipeado' data-tooltip-content='#tooltip_content_3' id='ttpp3'>" + e[3].m + "</td></tr><tr><td><a href='#' class='arcflash' data-enin='" + e[4].e + "' data-ttpp='4'>IEEE 1584<br /><small>(Te&oacute;rico)</small></a></td><td class='text-" + e[4].c + "'>" + Math.round(100 * e[4].e) / 100 + " cal/cm<sup>2</sup></td><td class='" + e[4].c + " tooltipeado' data-tooltip-content='#tooltip_content_4' id='ttpp4'>" + e[4].m + "</td></tr></tbody></table><br /><h3 class='text-center' id='epp-title'></h3><p class='text-center' id='epp-sub'></p><div id='epp-list'></div></div><div class='col-sm-4 col-sm-offset-1'><div id='epp-img' style='margin: 0 auto; height: 324px; width: 0px;'></div></div></div><div style='display: none;'><span id='tooltip_content_1'>" + e[1].t + "</span><span id='tooltip_content_2'>" + e[2].t + "</span><span id='tooltip_content_3'>" + e[3].t + "</span><span id='tooltip_content_4'>" + e[4].t + "</span></div>";
      $("#epp_div").html(a), $(".tooltipeado").tooltipster({
          delay: 1
      });
  }); 

  $("body").on("click", ".arcflash", function () { // ver EPP adecuado
      $("[id^=ttpp]").tooltipster("close"), $("#ttpp" + $(this).data("ttpp")).tooltipster("open");
      var e = $(this).data("enin"),
          a = [
              ["Camisa de mangas largas", "Pantalones largos", "Lentes de seguridad", "Tapones auditivos", "Guantes de cuero"],
              ["Camisa de Mangas Largas con certificaci&oacute;n para arco", "Pantalones largos con certificaci&oacute;n para arco", "Overoles con certificaci&oacute;n para arco", "Mascaras protectores con certificaci&oacute;n para arco", "Chaqueta con certificaci&oacute;n para arco", "Casco de seguridad", "Lentes de seguridad", "Tapones auditivos", "Guantes de cuero", "Zapatos de trabajo de cuero"],
              ["Camisa de Mangas Largas con certificaci&oacute;n para arco", "Pantalones largos con certificaci&oacute;n para arco", "Overoles con certificaci&oacute;n para arco", "Mascaras protectores con certificaci&oacute;n para arco", "Balaclava con certificaci&oacute;n para arco", "Chaqueta con certificaci&oacute;n para arco", "Casco de seguridad", "Lentes de seguridad", "Tapones auditivos", "Guantes de cuero", "Zapatos de trabajo de cuero"],
              ["Camisa de Mangas Largas con certificaci&oacute;n para arco", "Pantalones Largos con certificaci&oacute;n para arco", "Overoles con certificaci&oacute;n para arco", "Conjunto de Chaqueta, Pantalones y Protector facial con certificaci&oacute;n para arco", "Guantes de cuero con certificaci&oacute;n para arco", "Chaqueta con certificaci&oacute;n para arco", "Casco de seguridad", "Lentes de seguridad", "Tapones auditivos", "Zapatos de trabajo de cuero"],
              ["Camisa de Mangas Largas con certificaci&oacute;n para arco", "Pantalones Largos con certificaci&oacute;n para arco", "Overoles con certificaci&oacute;n para arco", "Conjunto de Chaqueta, Pantalones y Protector facial con certificaci&oacute;n para arco", "Guantes de cuero con certificaci&oacute;n para arco", "Chaqueta con certificaci&oacute;n para arco", "Casco de seguridad", "Lentes de seguridad", "Tapones auditivos", "Zapatos de trabajo de cuero"]
          ],
          t = 0;
      $(this).parent().parent().siblings().each(function () {
          $(this).removeClass("active")
      }), $(this).parent().parent().addClass("active"), e <= 4 ? ($("#epp-img").css("background", "url(img/arcflash.jpg)"), $("#epp-img").css("width", "190px"), $("#epp-img").css("background-position", "0px 0px"), $("#epp-title").text("EPP Nivel 1"), $("#epp-sub").html("Adecuado hasta 4 cal/cm<sup>2</sup>"), t = 1) : e <= 8 ? ($("#epp-img").css("background", "url(img/arcflash.jpg)"), $("#epp-img").css("width", "195px"), $("#epp-img").css("background-position", "0px 0px"), $("#epp-title").text("EPP Nivel 2"), $("#epp-sub").html("Adecuado hasta 8 cal/cm<sup>2</sup>"), t = 2) : e <= 25 ? ($("#epp-img").css("background", "url(img/arcflash.jpg)"), $("#epp-img").css("width", "220px"), $("#epp-img").css("background-position", "-205px 0px"), $("#epp-title").text("EPP Nivel 3"), $("#epp-sub").html("Adecuado hasta 25 cal/cm<sup>2</sup>"), t = 3) : e <= 40 ? ($("#epp-img").css("background", "url(img/arcflash.jpg)"), $("#epp-img").css("width", "220px"), $("#epp-img").css("background-position", "-430px 0px"), $("#epp-title").text("EPP Nivel 4"), $("#epp-sub").html("Adecuado hasta 40 cal/cm<sup>2</sup>"), t = 4) : 40 < e && ($("#epp-img").css("background", "url(img/arcflash0.jpg)"), $("#epp-img").css("width", "0px"), $("#epp-img").css("background-position", "0px 0px"), $("#epp-title").text("Sin EPP adecuado"), $("#epp-sub").html("Consultar otras referencias o aplicar re-ingenier&iacute;a"), t = 0);
      for (var i = "<ol>", o = 0; 0 < t && o < a[t].length; o++) i += "<li>" + a[t][o] + "</li>";
      i += "</ol>", $("#epp-list").html(i)
  }); 

  function tootip_check(e) {
    return e ? "<span class='icon-check' aria-hidden='true'></span>" : "<span class='icon-remove' aria-hidden='true'></span>"
  }

  function calcArcFlashEnergy(e, a, t, i, o, s, l) {
    var r, n, d, c, p, u, v, m, h, g, f, b, y, x, _, $, P = e,
        w = i,
        C = o,
        E = a,
        k = t,
        A = 0 == l ? 2 : 1 == l && P <= 1 ? 1.473 : 1 == l && 1 < P ? .973 : 2 == l ? 1.641 : 3 == l ? 2 : 0,
        T = 0 == l,
        M = k / 25.4;
    return n = 793 * w * P * (E / Math.pow(M, 2)), 
      g = "OK" == (u = .6 < P && T ? "OK" : "Fuera de rango") ? "success" : "danger", 
      y = tootip_check(.6 < P) + " Tensi&oacute;n > 0.6 kV", 
      y += "<br />", 
      y += tootip_check(T) + " Al aire libre", 
      d = T ? 5271 * Math.pow(M, -1.9593) * E * (.0016 * Math.pow(w, 2) - .0076 * w + .8938) : 1038.7 * Math.pow(M, -1.4738) * E * (.0093 * Math.pow(w, 2) - .3453 * w + 5.9675), 
      f = "OK" == (v = P <= .6 && 16 <= w && w <= 50 && 18 <= M ? "OK" : "Fuera de rango") ? "success" : "danger", 
      x = tootip_check(P <= .6) + " Tensi&oacute;n &le; 0.6 kV", x += "<br />", 
      x += tootip_check(16 <= w && w <= 50) + " 16 kA &le; Corriente de Falla &le; 50 kV", x += "<br />", 
      x += tootip_check(18 <= M) + " Distancia de Trabajo &ge; 18 pulg", 
      $ = P <= 1 ? 1.5 : 1, 
      r = (T ? -.792 : -.555) + (0 != s ? 0 : -.113) + 1.081 * (P < 1 ? (T ? -.153 : -.097) + .662 * Math.log10(w) + .0966 * P + 526e-6 * C + .5588 * P * Math.log10(w) - .00304 * C * Math.log10(w) : .00402 + .983 * Math.log10(w)) + .0011 * C, 
      c = $ * Math.pow(10, r) * (E / .2) * (Math.pow(610, A) / Math.pow(k, A)), 
      b = "OK" == (m = .208 <= P && P <= 15 && .7 <= w && w <= 106 && 13 <= C && C <= 152 ? "OK" : "Fuera de rango") ? "success" : "danger", 
      _ = tootip_check(.208 <= P && P <= 15) + " 0.208 kV &le; Tensi&oacute;n &le; 15 kV", _ += "<br />", 
      _ += tootip_check(.7 <= w && w <= 106) + " 0.7 kA &le; Corriente de Falla &le; 106 kV", _ += "<br />", 
      _ += tootip_check(13 <= C && C <= 152) + " 13 mm &le; Distancia entre conductores &le; 152 mm", 
      p = 2.142 * Math.pow(10, 6) * P * w * (E / Math.pow(k, 2)),
      {
        1: { e: n, m: u, c: g, t: y },
        2: { e: d, m: v, c: f, t: x },
        3: { e: c, m: m, c: b, t: _ },
        4: { e: p *= .238902957619, m: h = 15 < P ? "OK" : "Fuera de rango", c: "OK" == h ? "success" : "danger", t: tootip_check(15 < P) + " Tensi&oacute;n > 15 kV" }
      }
  }


  // Unidades de generación criticas 
  $divview.on("click", ".btn-alert-ugc-chart", function () { //grafico
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let id_cg = selectedFeature[f_alert_ugc_idcg]; // servicio maestro
    let empresa = selectedFeature[f_alert_ugc_empresa]; // servicio maestro
    let cod_ug = $(this).attr("data-cod_ug"); // servicio detalle
    // codificacion a base64
    id_cg = btoa(id_cg);
    cod_ug = btoa(cod_ug);
    $('#ifr_charts').attr('src', `./view/graphics/critico-indi-cg.htm?id_cg=${id_cg}&cod_ug=${cod_ug}&empresa=${empresa}`);
    $('.card-iframes').removeClass('notvisible').addClass('visible');
  });

  $divview.on("click", ".btn-alert-ugc-grid", function () { //tabla
    Helper.showPreloader();
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let url_serviciodetalle = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let id_cg = selectedFeature[f_alert_ugc_idcg];
    let cod_ug = $(this).attr("data-cod_ug");
    let title = `Unidad de Generación Crítica - ${selectedFeature[f_alert_ugc_tipocentral]} ${selectedFeature[f_alert_ugc_nombrecg]}`;

    let sql = `${f_alert_ugc_det_idcg} = '${id_cg}' and ${f_alert_ugc_det_codug} = '${cod_ug}'`;
    let sqlperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;
    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = [f_alert_ugc_det_nombrecg, f_alert_ugc_det_nombreug, f_alert_ugc_det_anio, f_alert_ugc_det_periodo, f_alert_ugc_det_mes, f_alert_ugc_det_tifm, f_alert_ugc_det_tolerancia];
    _qparams.orderByFields = `${f_alert_ugc_det_anio} desc, ${f_alert_ugc_det_mes} desc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length;
      if (nreg == 0) {
        Helper.hidePreloader();
      } else {
        Helper.loadTableIndicador(response, title, '#tbl_indicador', false);
      }
    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });
  });


  // Transformadores sobrecargados
  $divview.on("click", ".btn-alert-ts-fu-chart", function () { //grafico
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_set = selectedFeature[f_alert_ts_codset];
    let cod_trf = $(this).attr("data-cod_trf");
    cod_set = btoa(cod_set);
    cod_trf = btoa(cod_trf);
    $('#ifr_charts').attr('src', `./view/graphics/critico-fu-se.htm?cod_trf=${cod_trf}&cod_set=${cod_set}`);
    $('.card-iframes').removeClass('notvisible').addClass('visible');
  });

  $divview.on("click", ".btn-alert-ts-fu-grid", function () { //tabla
    Helper.showPreloader();
    let url_serviciodetalle = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_set = selectedFeature[f_alert_ts_codset]
    let cod_trf = $(this).attr("data-cod_trf");
    let title = `Transformador Sobrecargado - S.E ${selectedFeature[f_alert_ts_nombre]}`;
    let sql = `${f_alert_ts_det_codtrf} = '${cod_trf}' and ${f_alert_ts_det_codset} = '${cod_set}'`;
    let sqlperiod = '';

    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;
    typeof filterperiodo === 'undefined' ? '' : sqlperiod = filterperiodo.sqlperiod;

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = [f_alert_ts_det_nombreset, f_alert_ts_det_empresa, f_alert_ts_det_codtrf, f_alert_ts_det_potencia, f_alert_ts_det_relacion, f_alert_ts_det_anio, f_alert_ts_det_periodo, f_alert_ts_det_mes, f_alert_ts_det_fu];
    _qparams.orderByFields = `${f_alert_ts_det_anio} desc, ${f_alert_ts_det_mes} desc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length;
      if (nreg == 0) {
        Helper.hidePreloader();
      } else {
        Helper.loadTableIndicador(response, title, '#tbl_indicador', false);
      }
    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });

  });


  // Transformadores criticos 
  $divview.on("click", ".btn-alert-tc-ic", function () { //grafico
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_set = selectedFeature[f_alert_tc_codset];
    let cod_trf = $(this).attr("data-cod_trf");

    cod_set = btoa(cod_set);
    cod_trf = btoa(cod_trf);
    $('#ifr_charts').attr('src', `./view/graphics/critico-indi-se.htm?cod_trf=${ cod_trf }&cod_set=${ cod_set }`);
    $('.card-iframes').removeClass('notvisible').addClass('visible');
  });

  $divview.on("click", ".btn-alert-tc-ic-grid", function () { //tabla
    Helper.showPreloader();
    let url_serviciodetalle = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_set = selectedFeature[f_alert_tc_codset];
    let cod_trf = $(this).attr("data-cod_trf");
    let title = `Transformador Crítico - S.E ${ selectedFeature[f_alert_tc_nombre] }`;
    let sql = `${ f_alert_tc_det_codtrf } = '${ cod_trf }' and ${ f_alert_tc_det_codset } = '${ cod_set }'`;
    let sqlperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;

    typeof filterperiodo === 'undefined' ? '' : sqlperiod = filterperiodo.sqlperiod;

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = [f_alert_tc_det_nombreset, f_alert_tc_det_empresa, f_alert_tc_det_codtrf, f_alert_tc_det_relacion, f_alert_tc_det_anio, f_alert_tc_det_tfe, f_alert_tc_det_indise, f_alert_tc_det_toltfe, f_alert_tc_det_tolindise]; // falta Potencia
    _qparams.orderByFields = `${f_alert_tc_det_anio} desc`;
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length;
      if (nreg == 0) {
        Helper.hidePreloader();
      } else {
        Helper.loadTableIndicador(response, title, '#tbl_indicador', false);
      }
    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });
  });


  // Sistemas electricos criticos
  $divview.on("click", ".btn-alert-sec-ic", function () { //grafico
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_set = selectedFeature[f_alert_sec_codset];
    let cod_sec = $(this).attr("data-cod_sec");
    cod_set = btoa(cod_set);
    cod_sec = btoa(cod_sec);
    $('#ifr_charts').attr('src', `./view/graphics/critico-sie-se.htm?cod_sec=${cod_sec}&cod_set=${cod_set}`);
    $('.card-iframes').removeClass('notvisible').addClass('visible');
  });

  $divview.on("click", ".btn-alert-sec-ic-grid", function () { //tabla
    Helper.showPreloader();
    let url_serviciodetalle = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_set = selectedFeature[f_alert_sec_codset];
    let cod_sec = $(this).attr("data-cod_sec");
    let title = `Sistema Eléctrico Crítico - Asociado a S.E ${selectedFeature[f_alert_sec_nombre]}`;
    let sql = `${f_alert_sec_det_codsec} = '${cod_sec}' and ${f_alert_sec_det_codset} = '${ cod_set }'`;
    let sqlperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;
    
    typeof filterperiodo === 'undefined' ? '' : sqlperiod = filterperiodo.sqlperiod;

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();
    _qparams.where = sql;
    _qparams.outFields = [f_alert_sec_det_namesec, f_alert_sec_det_codsec, f_alert_sec_det_empresa, f_alert_sec_det_sectortipico, f_alert_sec_det_anio, f_alert_sec_det_nrousuarios, f_alert_sec_det_saifitotal, f_alert_sec_det_saiditotal, f_alert_sec_det_saifitransmision, f_alert_sec_det_saiditransmision];
    _qparams.orderByFields = `${f_alert_sec_det_anio} desc`;
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length;
      if (nreg == 0) {
        Helper.hidePreloader();
      } else {
        Helper.loadTableIndicador(response, title, '#tbl_indicador', false);
      }
    }).catch(function (error) {
      Helper.hidePreloader();
      console.log("query task error: ", error);
    });
  });

  $divview.on("click", ".btn-alert-sec-pys", function () { //modal Problemas y Soluciones
    Helper.showPreloader();
    let url_serviciodetalle = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_set = selectedFeature[f_alert_sec_codset];
    let cod_sec = $(this).attr("data-cod_sec");
    let all = false;
    let sql = `${f_alert_sec_det_codsec} = '${cod_sec}' and ${f_alert_sec_det_codset} = '${ cod_set }'`;
    let sqlperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;

    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;
    sqlperiod != '' ? sql = `(${sql}) and ${sqlperiod}` : '';
    renderTabsPyS(url_serviciodetalle, sql, all);
  });

  function renderTabsPyS(url_servicio, sql, all) {
    let _queryt = new QueryTask({ url: url_servicio });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = [f_alert_sec_det_namesec, f_alert_sec_det_problematica, f_alert_sec_det_solpit2013, f_alert_sec_det_solpit2017, f_alert_sec_det_solcoes, f_alert_sec_det_solminem, f_alert_sec_det_solempresa, f_alert_sec_det_anio];
    _qparams.orderByFields = `${f_alert_sec_det_anio} desc`;
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length;
      const namesec = response.features[0].attributes[f_alert_sec_det_namesec];
      let aniosec = '';
      const title = `Sistema Eléctrico: ${namesec}`;
      let tabevt = '';
      let tabevtcontent = '';

      for (let i = 0; i < nreg; i++) {
        const feature = response.features[i].attributes;
        let iddom = `${i}_sec`;
        let href = `#${iddom}`;
        let clase = '';
        let titletab = `${ feature[f_alert_sec_det_anio]}`;
        
        i == 0 ? clase = 'active show' : '';

        if (aniosec != feature[f_alert_sec_det_anio]) {
          aniosec = feature[f_alert_sec_det_anio];
          tabevt += `
                        <li class="nav-item">
                          <a class="nav-link ${clase}" id="tab${iddom}" data-toggle="tab" href="${href}" role="tab" >${titletab}</a>
                        </li>`;

          tabevtcontent += `
                        <div class="tab-pane fade ${clase}" id="${iddom}" role="tabpanel" >
                          <div class="card mb-2">
                            <div class="card-header card-header-gis ">
                              <h6 class="card-title m-0"> Problemática </h6>
                            </div>
                            <div class="card-body p-2">
                              <p> ${feature[f_alert_sec_det_problematica]} </p>
                            </div>
                          </div>

                          <div class="card">
                            <div class="card-header card-header-gis">
                              <h6 class="card-title m-0"> Soluciones </h6>
                            </div>
                            <div class="card-body p-2">
                              <div>
                                <ul class="nav nav-pills mb-3 tab-solution" role="tablist">
                                  <li class="nav-item">
                                    <a class="nav-link active" id="2013_tab" data-toggle="pill" href="#2013_${iddom}" role="tab" >PIT 2013-2017</a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" id="2017_tab" data-toggle="pill" href="#2017_${iddom}" role="tab" >PIT 2017-2021</a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" id="coes_tab" data-toggle="pill" href="#coes_${iddom}" role="tab" >COES</a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" id="minem_tab" data-toggle="pill" href="#minem_${iddom}" role="tab" >MINEM</a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" id="empresa_tab" data-toggle="pill" href="#empresa_${iddom}" role="tab" >Empresa</a>
                                  </li>
                                </ul>
                                <div class="tab-content tab-content-solution" >
                                  <div class="tab-pane fade show active" id="2013_${iddom}" role="tabpanel" >
                                    <p>${feature[f_alert_sec_det_solpit2013]}</p>
                                  </div>
                                  <div class="tab-pane fade" id="2017_${iddom}" role="tabpanel" >
                                    <p>${feature[f_alert_sec_det_solpit2017]}</p>
                                  </div>
                                  <div class="tab-pane fade" id="coes_${iddom}" role="tabpanel" >
                                    <p>${feature[f_alert_sec_det_solcoes]}</p>
                                  </div>
                                  <div class="tab-pane fade" id="minem_${iddom}" role="tabpanel" >
                                    <p>${feature[f_alert_sec_det_solminem]}</p>
                                  </div>
                                  <div class="tab-pane fade" id="empresa_${iddom}" role="tabpanel" >
                                    <p>${feature[f_alert_sec_det_solempresa]}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`;
        }
      }

      $('#title_sec').text(title);
      $('#tab_sec').html(tabevt);
      $('#tab_content_sec').html(tabevtcontent);
      activeTabs();
      Helper.hidePreloader();
      $('#modal_sec_pys').modal('show');

    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });
  }


  // Lineas congestionadas
  $divview.on("click", ".btn-alert-ltc-fu-chart", function () { //grafico
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_lt = selectedFeature[f_alert_ltcong_codlinea];

    cod_lt = btoa(cod_lt);
    $('#ifr_charts').attr('src', `./view/graphics/critico-fu-lt.htm?cod_lt=${cod_lt}`);
    $('.card-iframes').removeClass('notvisible').addClass('visible');
  });

  $divview.on("click", ".btn-alert-ltc-fu-grid", function () { //tabla
    Helper.showPreloader();
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let url_serviciodetalle = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let cod_lt = selectedFeature[f_alert_ltcong_codlinea];
    let title = `L.T. Congestionada - ${selectedFeature[f_alert_ltcong_nombre]}`;
    let sql = `${ f_alert_ltcong_det_codlinea } = '${ cod_lt }'`;
    let sqlperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;

    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = [f_alert_ltcong_det_nombre, f_alert_ltcong_det_empresa, f_alert_ltcong_det_anio, f_alert_ltcong_det_periodo, f_alert_ltcong_det_mes, f_alert_ltcong_det_fu];
    _qparams.orderByFields = `${f_alert_ltcong_det_anio} desc, ${f_alert_ltcong_det_mes} desc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length;
      if (nreg == 0) {
        Helper.hidePreloader();
      } else {
        Helper.loadTableIndicador(response, title, '#tbl_indicador', false);
      }
    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });

  });


  // Lineas Criticas y Radiales
  $divview.on("click", ".btn-alert-ltcyr-ic-chart", function () { //grafico
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_lt = selectedFeature[f_alert_ltcrit_codlinea];
    cod_lt = btoa(cod_lt);

    $('#ifr_charts').attr('src', `./view/graphics/critico-indi-lt.htm?cod_lt=${cod_lt}`);
    $('.card-iframes').removeClass('notvisible').addClass('visible');
  });

  $divview.on("click", ".btn-alert-ltcyr-ic-grid", function () { //tabla
    Helper.showPreloader();
    let url_serviciodetalle = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let cod_lt = selectedFeature[f_alert_ltcrit_codlinea];
    let title = `Línea de Transmisión Crítica ${selectedFeature[f_alert_ltcrit_tension]} KV - ${selectedFeature[f_alert_ltcrit_nombre]} (${selectedFeature[f_alert_ltcrit_codlinea]})`;
    let sql = `${f_alert_ltcrit_codlinea} = '${cod_lt}'`;
    let sqlanio = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;

    typeof filterperiodo === 'undefined' ? '' : sqlanio = filterperiodo.sqlperiod;

    let _queryt = new QueryTask({ url: url_serviciodetalle });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = [f_alert_ltcrit_det_nombre, f_alert_ltcrit_det_codlinea, f_alert_ltcrit_det_empresa, f_alert_ltcrit_det_anio, f_alert_ltcrit_det_tlf, f_alert_ltcrit_det_indisl, f_alert_ltcrit_det_toleranciastfl, f_alert_ltcrit_det_toleranciasindisl];
    _qparams.orderByFields = `${f_alert_ltcrit_det_anio} desc`;
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length;
      if (nreg == 0) {
        Helper.hidePreloader();
      } else {
        Helper.loadTableIndicador(response, title, '#tbl_indicador', false);
      }
    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });

  });

  // Fichas técnicas - Proyectos
  $('#div_view').on('click', '.btn-fichadoc', function () {
    Helper.showPreloader();
    let url = $(this).attr('data-urlfichadoc');
    let ispdf = (-1 != url.toLowerCase().indexOf(".pdf"));
    let titlereporte = 'Ficha Técnica '
    if (ispdf) {
      existsFile(url,titlereporte);
    } else {
      Helper.hidePreloader();
      alertMessage('Ficha técnica no encontrada.', 'warning', '', true);
    }
  });

  // Eventos relevantes - Subestaciones 
  $divview.on("click", ".btn-er-set-ver", function () {
    Helper.showPreloader();
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let url_serviciodetalle = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let title = `Subestación ${selectedFeature[f_er_set_nombre]}`;
    let cod_set = $(this).attr("data-cod_set");
    let all = false;
    let sql = `${f_er_set_det_codset} = '${cod_set}'`;
    let sqlperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;

    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;
    sqlperiod != '' ? sql = `${sql} and ${sqlperiod}` : '';
    sqlperiod != '' ? all = true : '';

    let fieldevento = {
      evento: f_er_set_det_evento,
      comentarios: f_er_set_det_comentario,
      fechaini: f_er_set_det_inicio,
      fechafin: f_er_set_det_fin,
      demandaafect: f_er_set_det_demandaafectada,
      origendata: f_er_set_det_origendata,
      semana: f_er_set_det_semana,
      anio: f_er_set_det_anio,
    };
    renderTabsEr(url_serviciodetalle, sql, title, all, fieldevento);
  });

  // Eventos relevantes - Lineas
  $divview.on("click", ".btn-er-lt-ver", function () {
    Helper.showPreloader();
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let url_servicio = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let cod_lt = $(this).attr("data-cod_lt");
    let title = `Línea de Transmisión ${selectedFeature[f_er_lt_nombre]}`; 
    let all = false;
    let sql = `${f_er_lt_det_codlinea} = '${cod_lt}'`;
    let sqlperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;

    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;
    sqlperiod != '' ? sql = `(${sql}) and ${sqlperiod}` : '';
    sqlperiod != '' ? all = true : '';

    let fieldevento = {
      evento: f_er_lt_det_evento,
      comentarios: f_er_lt_det_comentario,
      fechaini: f_er_lt_det_inicio,
      fechafin: f_er_lt_det_fin,
      demandaafect: f_er_lt_det_demandaafectada,
      origendata: f_er_lt_det_origendata,
      semana: f_er_lt_det_semana,
      anio: f_er_lt_det_anio,
    };
    renderTabsEr(url_servicio, sql, title, all, fieldevento);
  });

  // Eventos relevantes - Centrales
  $divview.on("click", ".btn-er-c-ver", function () {
    Helper.showPreloader();
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let url_servicio = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetalle;
    let cod_cg = $(this).attr("data-cod_cg");
    let title = `${selectedFeature[f_er_c_tipocentral]} ${selectedFeature[f_er_c_nombre]}`;
    let all = false;
    let sql = `${f_er_c_det_cod} = '${cod_cg}'`;
    let sqlperiod = '';
    const filterperiodo = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector;
    
    typeof filterperiodo === 'undefined' ? '' : sqlperiod = __globspace.view.popup.selectedFeature.sourceLayer.filtersinsector.sqlperiod;
    sqlperiod != '' ? sql = `(${sql}) and ${sqlperiod}` : '';
    sqlperiod != '' ? all = true : '';

    let fieldevento = {
      evento: f_er_det_evento,
      comentarios: f_er_c_det_comentario,
      fechaini: f_er_c_det_inicio,
      fechafin: f_er_c_det_fin,
      demandaafect: f_er_c_det_demandaafectada,
      origendata: f_er_c_det_origendata,
      semana: f_er_c_det_semana,
      anio: f_er_c_det_anio,
    };
    renderTabsEr(url_servicio, sql, title, all, fieldevento);
  });

  function renderTabsEr(url_servicio, sql, title, all, fieldevento) {

    $('#title_er').text('');
    $('#tab_er').html('');
    $('#tab_content_er').html('');

    let _queryt = new QueryTask({ url: url_servicio });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = ['*'];
    _qparams.orderByFields = `${fieldevento.anio} desc, ${fieldevento.semana} desc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length,
        tabevt = '',
        tabevtcontent = '';

      if(nreg > 0){
        for (let i = 0; i < nreg; i++) {
          const feature = response.features[i].attributes;
          let iddom = `${feature.OBJECTID}_evt`;
          let href = `#${iddom}`;
          let clase = '';
          let evento = feature[fieldevento.evento];
          let comentario = feature[fieldevento.comentarios];
          let fechainicio = moment(feature[fieldevento.fechaini]);
          let fechafin = moment(feature[fieldevento.fechafin]);
          let demandaefect = Number(feature[fieldevento.demandaafect]).toFixed(2);
          let origendata = feature[fieldevento.origendata];
          let duracionmilseg = 0;
          let duracion = '';
  
          i == 0 ? clase = 'active show' : '';
  
          // validacion de fechas para obtener el tiempo de duración
          if (fechainicio.isValid() && fechafin.isValid()) {
            duracionmilseg = fechafin.diff(fechainicio);
            let auxduracion = moment.duration(duracionmilseg);
            // Math.trunc(x) obtiene la parte entera de un decimal
            duracion = `${Math.trunc(auxduracion.asHours()) > 9 ? Math.trunc(auxduracion.asHours()) : '0'+Math.trunc(auxduracion.asHours()) }:${auxduracion.minutes() > 9 ? auxduracion.minutes() : '0'+auxduracion.minutes() }:${auxduracion.seconds() > 9 ? auxduracion.seconds() : '0'+auxduracion.seconds()} hr`;
            fechainicio = fechainicio.format('DD/MM/YYYY HH:mm:ss');
            fechafin = fechafin.format('DD/MM/YYYY HH:mm:ss');
          } else if (fechainicio.isValid() && !fechafin.isValid()) {
            fechainicio = fechainicio.format('DD/MM/YYYY HH:mm:ss');
            fechafin = '';
          } else if (!fechainicio.isValid() && fechafin.isValid()) {
            fechainicio = '';
            fechafin = fechafin.format('DD/MM/YYYY HH:mm:ss');
          } else {
            fechainicio = '';
            fechafin = '';
          }
  
          let titletab = `Evento # ${i+1}`;
          tabevt += `
                      <li class="nav-item">
                          <a class="nav-link ${clase}" id="tab${iddom}" data-toggle="tab" href="${href}" role="tab" >${titletab}</a>
                      </li>`;
          tabevtcontent += `
                      <div class="tab-pane fade ${clase}" id="${iddom}" role="tabpanel" >
                          <div class="row">
                          <div class="col-12 evt-title">Evento # ${i+1}</div>
                          <div class="col-12">${ evento }</div>
                          <div class="col-12 evt-title">Comentarios</div>
                          <div class="col-12">${ comentario }</div>
                          <div class="col-12 col-sm-3 evt-title">Inicio</div>
                          <div class="col-12 col-sm-3"> ${ fechainicio }</div>
                          <div class="col-12 col-sm-3 evt-title">Fin</div>
                          <div class="col-12 col-sm-3">${ fechafin }</div>
                          <div class="col-12 col-sm-3 evt-title">Duración</div>
                          <div class="col-12 col-sm-3 ">${ duracion }</div>
                          <div class="col-12 col-sm-3 evt-title">Demanda Afectada</div>
                          <div class="col-12 col-sm-3">${ demandaefect } MW</div>
                          </div>
                          <div class="text-right evt-footer">
                          <span><strong>Fuente: </strong> ${ origendata } </span>
                          </div>
                      </div>`;
        }


        $('#title_er').text(title);
        $('#tab_er').html(tabevt);
        $('#tab_content_er').html(tabevtcontent);
        activeTabs();
  
        Helper.hidePreloader();
        $('#modal_er').modal('show');

      }else{
        Helper.hidePreloader();
        alertMessage("No se encontró con exactitud los detalles. <br> <i>Técnicamente, deberá cerciorarse que el nombre o código de la entidad coincida tanto en el servicio maestro como en el servicio detalle.</i>", "warning", '', true);
      }

    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });
  }

  // Drone
  $divview.on("click", ".btn-drone-vervideo", function () {
    $('#btn_maxvideo').removeClass("visibility").addClass("notvisibility");
    let selectedfeature = __globspace.view.popup.selectedFeature.attributes;
    let title = selectedfeature[f_ig_drone_nombre];
    let urlvideo = selectedfeature[f_ig_drone_url];
    let url = 'https://gisem.osinergmin.gob.pe/NewMapaSEIN/Graficos/' + urlvideo;
    $('#lbl_titlevideo').text(title);
    $('#video').attr('src', url);
    $('#btn_video_descargar').attr('href', url);
    $('#container_video').removeClass('notvisible').addClass('visible');
  });

  // Puntos de entrega
  $divview.on("click", ".btn-pe-grid", function () {
    Helper.showPreloader();
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let title = `Información de Punto de Entrega - ${ selectedFeature[f_pe_nombre] }`;
    let fecha = moment();
    let mes = fecha.month()+1; 

    mes > 10 ? '' : mes = `0${ mes }`;
    $('#title_pe_actionpopup').text(title);
    $('#cmb_anio_pe').val(fecha.year());
    $('#cmb_mes_pe').val(mes);

    getQueryPE();
    
  });

  $('#modal_pe').on('click', '#btn_searchpe', function (e) {
    e.preventDefault();
    getQueryPE();

  });

  function getQueryPE() {
    let url_pe_contrato = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetallepe.url_pe_contrato;
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    const namepe = selectedFeature[f_pe_nombre]; 
    const id_pe = selectedFeature[f_pe_idpe];
    const anio = $('#cmb_anio_pe').val();
    const mes = $('#cmb_mes_pe').val();
    let fecha = moment(`${ anio }-${ mes }-01`).add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5);; // formato por defecto de momento es 'YYYY-MM-DD'
    let sql = `( ${ f_pe_det_pe_id } = '${ id_pe }') and ( ${ f_pe_det_pe_fechainicio } < timestamp '${ fecha }') and ( ${ f_pe_det_pe_fechafin } > timestamp '${ fecha }') `;
    // where: ((VC_INICIO < timestamp '2024-01-11 05:00:00') AND (ID_PE = 'PE-147') AND (VC_FIN > timestamp '2024-01-12 04:59:59')) AND (1=1) //agol
    
    mes == '' ? sql = '1<>1' : '';

    let _queryt = new QueryTask({ url: url_pe_contrato });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = [ f_pe_det_pe_suministrador, f_pe_det_pe_cliente, f_pe_det_pe_fechainicio, f_pe_det_pe_fechafin, f_pe_det_pe_niveltension, f_pe_det_pe_titularbarra, f_pe_det_pe_tension ];
    _qparams.orderByFields = `${f_pe_det_pe_fechafin} desc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      const aux_fields = response.fields;
      const auxlength = response.features.length;
      const addnamepe = { // añadir el campo nombre de punto de entrega ya que en el servicio no lo tiene solo tiene codigo
        alias: "Nombre Punto de Entrega",
        name: 'nombrepe',
        type: "string"
      };
      aux_fields.splice(5, 0, addnamepe);
      
      for (let i = 0; i < auxlength; i++) {
        let row = response.features[i].attributes;
        row['nombrepe'] = namepe;
      }

      Helper.loadTablePE(response, aux_fields, '#tbl_pe_actionpopup', false);

      $('#modal_pe').modal();

    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });
  }


  $divview.on("click", ".btn-pe-suministro-grid", function () {
    Helper.showPreloader();
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let title = `Información de Calidad de Suministro - ${selectedFeature[f_pe_nombre]}`;
    let fecha = moment();
    const mes = fecha.month()+1;
    const semestre = getSemesterOfYear(mes);

    $('#title_suministro_actionpopup').text(title);
    $('#cmb_anio_suministro').val(fecha.year());
    $('#cmb_sementre_suministro').val(semestre);

    if($('#cmb_anio_suministro').val() == null){
      $('#cmb_anio_suministro option:last').prop("selected", "selected");
    }

    getQuerySuministroPe();

  });

  $('#modal_suministrope').on('click', '#btn_searchsuministro', function (e) {
    e.preventDefault();
    getQuerySuministroPe();

  });

  function getQuerySuministroPe(){
    let url_pe_interrupcion = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetallepe.url_pe_interrupcion;
    const selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    const id_pe = selectedFeature[f_pe_idpe];
    const nameset = selectedFeature[f_pe_subestacion]; 
    const anio = $('#cmb_anio_suministro').val();
    const semestre = $('#cmb_sementre_suministro').val();
    let mesinicio = ''; 
    let mesfin = '';

    semestre == 1 ?  mesinicio = '01' : mesinicio = '07';
    semestre == 1 ?  mesfin = '06' : mesfin = '12';

    let fecha = moment(`${ anio }-${ mesinicio }-01`).add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5);; // formato por defecto de momento es 'YYYY-MM-DD'
    let fecha2 = moment(`${ anio }-${ mesfin }-01`).endOf('month').add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5);; // formato por defecto de momento es 'YYYY-MM-DD'
    let sql = `( ${ f_pe_det_int_idpe } = '${ id_pe }') and ( ${ f_pe_det_int_fechainicio } BETWEEN timestamp '${ fecha }' AND timestamp '${ fecha2 }')`;
    let _queryt = new QueryTask({ url: url_pe_interrupcion });
    let _qparams = new Query();

    _qparams.where = sql;
    _qparams.outFields = [ f_pe_det_int_fechafin, f_pe_det_int_tipo, f_pe_det_int_causa, f_pe_det_int_codosi, f_pe_det_int_cliente, f_pe_det_int_suministros, f_pe_det_int_observacion ];
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      const aux_fields = response.fields;
      const auxlength = response.features.length;
      const addnamepe = { // añadir el campo nombre de punto de entrega ya que en el servicio no lo tiene solo tiene codigo
        alias: "Nombre Punto de Entrega",
        name: 'nombrepe',
        type: "string"
      };
      aux_fields.splice(0, 0, addnamepe);
      
      for (let i = 0; i < auxlength; i++) {
        let row = response.features[i].attributes;
        row['nombrepe'] = nameset;
      }

      Helper.loadTablePESuministro(response, aux_fields, '#tbl_suministro_actionpopup');
      $('#modal_suministrope').modal();
      
    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });
  }

  function  getSemesterOfYear(month){
    return (Math.ceil(month / 6));
  }

  var first_petension = '';
  $divview.on("click", ".btn-pe-tension-grid", function () {
    Helper.showPreloader();
    first_petension = true;
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    const title = `Calidad de Tensión en Punto de Entrega- ${selectedFeature[f_pe_nombre]}`;
    let fecha = moment();
    
    $('#title_tension_actionpopup').text(title);
    $('#cmb_anio_tensionpe').val(fecha.year());
    $('#cmb_mes_tensionpe').prop('selectedIndex', 0);

    if($('#cmb_anio_tensionpe').val() == null){
      $('#cmb_anio_tensionpe option:last').prop("selected", "selected");
    }

    getQueryTensionPE();

  });

  $('#modal_tensionpe').on('click', '#btn_searchtensionpe', function (e) {
    e.preventDefault();
    first_petension = false;
    getQueryTensionPE();

  });

  function getQueryTensionPE() {
    Helper.showPreloader();
    $('#card_response').html('');

    let url_pe_tension = __globspace.view.popup.selectedFeature.sourceLayer.url_serviciodetallepe.url_pe_tension;
    let selectedFeature = __globspace.view.popup.selectedFeature.attributes;
    let id_pe = selectedFeature[f_pe_idpe];
    let set = selectedFeature[f_pe_subestacion];
    let niveltension = selectedFeature[f_pe_niveltension];
    const anio = $('#cmb_anio_tensionpe').val();
    const mes = $('#cmb_mes_tensionpe').val();

    if(first_petension){
      Helper.hidePreloader();
      $('#ifr_charts_pe').attr('src', ` `).css('height','0px');
      $('#modal_tensionpe').modal();
    }else{

      if(mes == '0'){
        Helper.hidePreloader();
        $('#ifr_charts_pe').attr('src', ` `).css('height','0px');
        alertMessage("Seleccione un mes", "warning", '', true);
        $('#modal_tensionpe').modal();
      }else{

        let sql = `( ${f_pe_det_t_idpe} = '${ id_pe }') and ( ${ f_pe_det_t_anio } = ${ anio } and ${ f_pe_det_t_mes } = ${ mes })`;
        let _queryt = new QueryTask({ url: url_pe_tension });
        let _qparams = new Query();

        _qparams.where = sql;
        _qparams.outFields = ['*'];
        _qparams.orderByFields = `${ f_pe_det_t_fechainicio } desc `;
        _qparams.returnGeometry = false;
        _queryt.execute(_qparams)
          .then(function (response) {
            let nreg = response.features.length;
            if (nreg == 0) {
              Helper.hidePreloader();
              $('#ifr_charts_pe').attr('src', ` `).css('height','0px');
              alertMessage("La consulta no tiene registros a mostrar", "warning", '', true);
              $('#modal_tensionpe').modal();

            } else {
    
              if(nreg > 1){
                alertMessage("¡Atención! <br> Existe más de 1 registro de evaluación en este periodo para este P.E. Se mostrará solo el más reciente.", "warning", '', true);
              }
    
              let feature = response.features[0].attributes;
              feature[f_pe_det_t_fechainicio] = Helper.getFormatDatePE(feature[f_pe_det_t_fechainicio], 'DD-MM-YYYY HH:mm:ss'); 
              feature[f_pe_det_t_fechafin] = Helper.getFormatDatePE(feature[f_pe_det_t_fechafin], 'DD-MM-YYYY HH:mm:ss');
    
              let cadena = `
                <div class="row">
                  <div class="col-sm-12 text-center font-bold">Datos del Suministro </div>
                  <div class="col-sm-3 lbl-head"> Suministradores </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_suministrador] } </div>
                  <div class="col-sm-3 lbl-head"> Subestación </div>
                  <div class="col-sm-3"> ${ set } </div>
                  <div class="col-sm-3 lbl-head"> Cliente </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_cliente] } </div>
                  <div class="col-sm-3 lbl-head"> Nivel de tensión </div>
                  <div class="col-sm-3"> ${ niveltension } </div>
                </div>
    
                <div class="row">
                  <div class="col-sm-12 text-center font-bold"> Datos del Registro </div>
                  <div class="col-sm-3 lbl-head"> Marca </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_marca] } </div>
                  <div class="col-sm-3 lbl-head"> Serie </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_serie] } </div>
                </div>
    
                <div class="row">
                  <div class="col-sm-12 text-center font-bold "> Evaluación de Tensión </div>
                  <div class="col-sm-3 lbl-head"> Inicio medición </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_fechainicio] } </div>
                  <div class="col-sm-3 lbl-head"> Tipo de punto </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_tipopunto] } </div>
                  <div class="col-sm-3 lbl-head"> Fin medición </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_fechafin] } </div>
                  <div class="col-sm-3 lbl-head"> Tolerancia </div>
                  <div class="col-sm-3"> ${ (feature[f_pe_det_t_tolerancia]*100).toFixed(2) } % </div>
                  <div class="col-sm-3 lbl-head"> Intervalos evaluados </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_intevaluado] } </div>
                  <div class="col-sm-3 lbl-head"> Intervalos fuera de tolerancia(%) </div>
                  <div class="col-sm-3"> ${ (feature[f_pe_det_t_inttolerancia]*100).toFixed(2) } % </div>
                  <div class="col-sm-3 lbl-head"> Tensión de operación </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_tension] } </div>
                  <div class="col-sm-3 lbl-head"> Resultado </div>
                  <div class="col-sm-3"> ${ feature[f_pe_det_t_resultado] } </div>
                </div>`;
    
              $('#card_response').html(cadena);
              
              let id_pe_ten = btoa(feature[f_pe_det_t_idpeten]);
              $('#ifr_charts_pe').attr('src', `./view/graphics/calgyt-reporte.htm?id_pe_ten=${ id_pe_ten } `);

              document.getElementById('ifr_charts_pe').onload = function() {
                let $iframe = $(this)[0];
                let heightcard = $iframe.contentWindow.document.body.scrollHeight+30+ "px";
                $(`#${$iframe.id}`).css('height',heightcard);
                Helper.hidePreloader();
                $('#modal_tensionpe').modal();
              }             
            }    
          })
          .catch(function (error) {
            Helper.hidePreloader();
            Helper.showError(error);
          });      
        }
    }    
  }


  loadAniosPE();

  function loadAniosPE() {
    let _queryt = new QueryTask({ url: __url_pe_contrato });
    let _qparams = new Query();

    _qparams.where = "1=1";
    _qparams.outFields = [f_pe_det_pe_fechainicio];
    _qparams.orderByFields = `${ f_pe_det_pe_fechainicio } asc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams)
      .then(function (response) {
        let anioinicio = response.features[0].attributes[f_pe_det_pe_fechainicio];
        anioinicio = moment(anioinicio);
        anioinicio = anioinicio.year();

        let _queryt2 = new QueryTask({
          url: __url_pe_contrato
        });
        let _qparams2 = new Query();
        _qparams2.where = "1=1";
        _qparams2.outFields = [f_pe_det_pe_fechafin];
        _qparams2.orderByFields = `${ f_pe_det_pe_fechafin } desc`;
        _qparams2.returnGeometry = false;
        _queryt2.execute(_qparams2).then(function (response) {
          let aniofin = response.features[0].attributes[f_pe_det_pe_fechafin];
          aniofin = moment(aniofin);
          aniofin = aniofin.year();
          let cmb = '';
          for (let i = anioinicio; i <= aniofin; i++) {
            cmb += `<option value="${i}">${i}</option>`;
          }
          $('#cmb_anio_pe').html(cmb);

        }).catch(function (error) {
          Helper.hidePreloader();
          console.log("query task error - carga inical: ", error);
        });

      })
      .catch(function (error) {
        Helper.hidePreloader();
        console.log("query task error - carga inical: ", error);
      });
  }

  loadAniosSuministroPE();

  function loadAniosSuministroPE() {
    let _queryt = new QueryTask({ url: __url_pe_interrupcion });
    let _qparams = new Query();

    _qparams.where = "1=1";
    _qparams.outFields = [f_pe_det_int_fechainicio];
    _qparams.orderByFields = `${ f_pe_det_int_fechainicio } asc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams)
      .then(function (response) {
        let anioinicio = response.features[0].attributes[f_pe_det_int_fechainicio];
        anioinicio = moment(anioinicio);
        anioinicio = anioinicio.year();

        let _queryt2 = new QueryTask({ url: __url_pe_interrupcion });
        let _qparams2 = new Query();

        _qparams2.where = "1=1";
        _qparams2.outFields = [f_pe_det_int_fechafin];
        _qparams2.orderByFields = `${ f_pe_det_int_fechafin } desc`;
        _qparams2.returnGeometry = false;
        _queryt2.execute(_qparams2).then(function (response) {
          let aniofin = response.features[0].attributes[f_pe_det_int_fechafin];
          aniofin = moment(aniofin);
          aniofin = aniofin.year();

          let cmb = '';
          for (let i = anioinicio; i <= aniofin; i++) {
            cmb += `<option value="${i}">${i}</option>`;
          }
          $('#cmb_anio_suministro').html(cmb);

        }).catch(function (error) {
          Helper.hidePreloader();
          console.log("query task error - carga inical: ", error);
        });

      })
      .catch(function (error) {
        Helper.hidePreloader();
        console.log("query task error - carga inical: ", error);
      });
  }

  loadAniosTensionPE()
  function loadAniosTensionPE() {
    let _queryt = new QueryTask({ url: __url_pe_tension });
    let _qparams = new Query();

    _qparams.where = "1=1";
    _qparams.outFields = [f_pe_det_t_anio];
    _qparams.orderByFields = ` ${ f_pe_det_t_anio } asc`;
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams)
      .then(function (response) {
        let auxlength = response.features.length;
        let cmb = '';
        for (let i = 0 ; i<auxlength ; i++) {
          let item = response.features[i].attributes;
          cmb += `<option value="${ item[f_pe_det_t_anio] }">${ item[f_pe_det_t_anio] }</option>`;
        }

        $('#cmb_anio_tensionpe').html(cmb);

      })
      .catch(function (error) {
        Helper.hidePreloader();
        console.log("query task error - carga inical: ", error);
      });
  }



  /***************************************** FUNCIONES DE APOYO *******************************************/


  function getDocFicha(url, titlereporte) {
    $('#btn_verdoc').attr('href', url);
    $('#lbl_title_report').html(titlereporte);
    $('#container_reports').removeClass('pdfobject-container').html('');
    let options = {
      // page: 2,
      pdfOpenParams: {
        navpanes: 1,
        view: "FitH",
        pagemode: "thumbs"
      },
      fallbackLink: "<p>Este navegador no admite archivos PDF en línea <a href='" + url + "'>Descargar</a></p>"
    };
    PDFObject.embed(url, "#container_reports", options);
    $('#container_reportfound').addClass('visible').removeClass('notvisible');
    Helper.hidePreloader();
  }

  function customizePopup() {
    if (__selectedlayerpop) {
      if (__selectedlayerpop.alias_sector == "__mil_operacion") {
        $('.esri-popup__header', $divview).removeClass("popalerta popproyecto").addClass("popoperacion");
      } else if (__selectedlayerpop.alias_sector == "__mil_alerta") {
        $('.esri-popup__header', $divview).removeClass("popoperacion popproyecto").addClass("popalerta");
      } else if (__selectedlayerpop.alias_sector == "__mil_proyectos") {
        $('.esri-popup__header', $divview).removeClass("popoperacion popalerta").addClass("popproyecto");
      } else {
        $('.esri-popup__header', $divview).removeClass("popoperacion popalerta popproyecto");
      }
      //para cerciorarse que el footer del popup se ubique abajo (reintentamos 3 veces)
      $('div[class*="esri-popup--aligned-bottom-"] .esri-popup__main-container', $divview).append($('div.esri-popup__footer:first'));
      $('.esri-popup--is-docked .esri-popup__main-container', $divview).append($('div.esri-popup__footer:first'));
      setTimeout(function () {
        $('div[class*="esri-popup--aligned-bottom-"] .esri-popup__main-container', $divview).append($('div.esri-popup__footer:first'));
        $('.esri-popup--is-docked .esri-popup__main-container', $divview).append($('div.esri-popup__footer:first'));
        setTimeout(function () {
          $('div[class*="esri-popup--aligned-bottom-"] .esri-popup__main-container', $divview).append($('div.esri-popup__footer:first'));
          $('.esri-popup--is-docked .esri-popup__main-container', $divview).append($('div.esri-popup__footer:first'));
        }, 100);
      }, 100);
    }
  }

  function getSymbolPopup(geometry) {
    symbol = '';
    switch (geometry.type) {
      case "point":
        symbol = {
          type: "simple-marker",
          outline: {
            color: "#00faed",
            width: 1.5
          }
        };
        return symbol;
      case "polyline":
        symbol = {
          type: "simple-line",
          color: [0, 250, 237, 0.6],
          width: "2.5",
          outline: {
            color: "#00faed",
            width: 1.5
          }
        };
        return symbol;
      case "polygon":
        symbol = {
          type: "simple-fill",
          color: [0, 250, 237, 0.6],
          outline: {
            color: "#00faed",
            width: 1.5
          }
        };
        return symbol;
      default:
        break;
    }
  }

  /**
   * funcion para saber si existe o no el documento pdf 
   * funcionara siempre y cuando ambos recursos(app web y documentos) están en el mismo dominio
   */
  function existsFile(url, titlereporte) {
    $('#container_reportfound').addClass('notvisible').removeClass('visible');
    $.ajax({
      url: __proxy + url,
      type: "HEAD",
      error: function () {
        Helper.hidePreloader();
        alertMessage('Ficha técnica no encontrada.', 'warning', '', true);
      },
      success: function () {
        getDocFicha(url, titlereporte);
      }
    });
  }

  // carusel de tabs para modal de Eventos Revelantes y para modal Problematica y soluciones de Sistemas Electricos Criticos 
  function activeTabs() {
    // start control del carusel
    $('#jcarousel_er, #jcarousel_sec').jcarousel().on('jcarousel:animateend', function (event, carousel) {
      let id = $(carousel._visible['0']).index();
      $('.jp-item').removeClass('active');
      $('.jp-item').eq(id).addClass('active');
    });
    // set width of item
    $('#jcarousel_er li, #jcarousel_sec li').width($('#jcarousel_er, #jcarousel_sec').width());
    // move slider
    $('#jcarousel_er, #jcarousel_sec').on('click', '.jc-right', function (event) {
      event.preventDefault();
      $('#jcarousel_er, #jcarousel_sec').jcarousel('scroll', '+=1');
    });
    $('#jcarousel_er, #jcarousel_sec').on('click', '.jc-left', function (event) {
      event.preventDefault();
      $('#jcarousel_er, #jcarousel_sec').jcarousel('scroll', '-=1');
    });
    $('#jcarousel_er, #jcarousel_sec').on('click', '.jp-item', function (event) {
      event.preventDefault();
      let id = $(this).index();
      $('#jcarousel_er, #jcarousel_sec').jcarousel('scroll', id);
    });
  }

  $('#tab_er').on('click', 'a', function (e) {
    e.preventDefault();
    $('#tab_content_er > div').removeClass('active show');
    let datalayer = $(this).attr('href');
    $(datalayer).addClass('active show');
  });

  $('#tab_sec').on('click', 'a', function (e) {
    e.preventDefault();
    $('#tab_content_sec > div').removeClass('active show');
    let datalayer = $(this).attr('href');
    $(datalayer).addClass('active show');
  });

  $('#modal_sec_pys').on('click', '.tab-solution a', function (e) {
    e.preventDefault();
    let datalayer = $(this).attr('href');
    $(datalayer).siblings('div').removeClass('active show');
    $(datalayer).addClass('active show');
  })


  //################################################ return ################################################
  return {
    getPopOperSET: function () { return _pop_oper_set },
    getPopOperLT: function () { return _pop_oper_lt },
    getPopOperCH: function () { return _pop_oper_chidroelectrica },
    getPopOperCT: function () { return _pop_oper_ctermica },
    getPopOperCRER: function () { return _pop_oper_ceolica_biomasa_solar },
    getPopOperEstructura: function () { return _pop_oper_estructura },

    getPopProySET: function () { return _pop_proy_set },
    getPopProyLT: function () { return _pop_proy_lt },
    getPopProyCE: function () { return _pop_proy_chidroelectrica },

    getPopAlertUGC: function () { return _pop_alert_ugc },
    getPopAlertTS: function () { return _pop_alert_ts },
    getPopAlertTC: function () { return _pop_alert_tc },
    getPopAlertSEC: function () { return _pop_alert_sec },
    getPopAlertLTC: function () { return _pop_alert_ltcong },
    getPopAlertLTCyR: function () { return _pop_alert_ltcyr },

    getPopErSET: function () { return _pop_er_set },
    getPopErLT: function () { return _pop_er_lt },
    getPopErCE: function () { return _pop_er_ce },

    getPopPiLT: function () { return _pop_pi_lt },
    getPopPiSET: function () { return _pop_pi_set },

    getPopDA: function () { return _pop_da },
    getPopDrone: function () { return _pop_drone },
    getPopPE: function () { return _pop_PE  }
  }

});

/* REVISADO ♣ */