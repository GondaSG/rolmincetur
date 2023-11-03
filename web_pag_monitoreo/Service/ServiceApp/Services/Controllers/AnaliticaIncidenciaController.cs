using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/analiticaIncidencia")]
    [ApiController]
    public class AnaliticaIncidenciaController : ControllerBase
    {
        private readonly AppSettings _mySettings;

        public AnaliticaIncidenciaController(IOptions<AppSettings> settings) 
        {
            _mySettings = settings.Value;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<AnaliticaIncidencia>> Get()
        {
            string sql = "SELECT * FROM CM_ANALITICAINCIDENCIA";
            List<AnaliticaIncidencia> analiticaIncidencia = GetDatosSQL(sql);
            return analiticaIncidencia;
        }

        private List<AnaliticaIncidencia> GetDatosSQL(string sql)
        {
            List<AnaliticaIncidencia> data = new List<AnaliticaIncidencia>();
            string cadena = _mySettings.oracle;
            using (OracleConnection cn = new OracleConnection(cadena))
            {
                try
                {
                    cn.Open(); 

                    using (OracleCommand cmd = new OracleCommand(sql, cn))
                    using (OracleDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            AnaliticaIncidencia analiticaIncidencia = new AnaliticaIncidencia();
                            analiticaIncidencia.ID_INCIDECNIA = dr.GetInt32(0);
                            analiticaIncidencia.SECTOR = dr.GetString(1);
                            analiticaIncidencia.TIPO_INCIDENCIA = dr.GetString(2);
                            analiticaIncidencia.ESTADO = dr.GetString(3);
                            analiticaIncidencia.FECHA_INCIDENCIA = dr.GetString(4);
                            analiticaIncidencia.FECHA_REGISTRO = dr.GetString(5);
                            analiticaIncidencia.CRITICIDAD = dr.GetString(6);
                            analiticaIncidencia.DESCRIPCION_INCIDENCIA = dr.GetString(7);
                            analiticaIncidencia.AFECTACION = dr.GetString(8);
                            analiticaIncidencia.CAUSA_INCIDENCIA = dr.GetString(9);
                            analiticaIncidencia.FUENTE_INFORMACION = dr.GetString(10);
                            analiticaIncidencia.DIRECCION_AFECTACION = dr.GetString(11);
                            analiticaIncidencia.DIRECCION_DEPARTAMENTO = dr.GetString(12);
                            analiticaIncidencia.DIRECCION_PROVINCIA = dr.GetString(13);
                            analiticaIncidencia.DIRECCION_DISTRITO = dr.GetString(14);
                            analiticaIncidencia.DIRECCION_UBIGEO = dr.GetString(15);
                            analiticaIncidencia.LATITUD = dr.GetString(16);
                            analiticaIncidencia.LONGITUD = dr.GetString(17);
                            analiticaIncidencia.OFICINA_REGIONAL = dr.GetString(18);
                            analiticaIncidencia.OFICINA_REGIONAL_PROFESIONAL = dr.GetString(19);
                            analiticaIncidencia.AFECTACION_NUM_FAMILIAS = dr.GetInt32(20);
                            analiticaIncidencia.AFECTACION_NUM_PERSONAS = dr.GetInt32(21);
                            analiticaIncidencia.AFECTACION_VIVIENDAS = dr.GetInt32(22);
                            analiticaIncidencia.AFECTACION_NUM_FALLECIDOS = dr.GetInt32(23);
                            analiticaIncidencia.ANALISIS_POST = dr.GetString(24);
                            analiticaIncidencia.URL_FOTO01 = dr.GetString(25);
                            analiticaIncidencia.URL_FOTO02 = dr.GetString(26);
                            analiticaIncidencia.URL_FOTO03 = dr.GetString(27);
                            analiticaIncidencia.URL_FOTO04 = dr.GetString(28);
                            analiticaIncidencia.INFORME = dr.GetString(29);
                            data.Add(analiticaIncidencia);
                        }
                    }
                }
                catch (Exception ex)
                {
                    data = new List<AnaliticaIncidencia>(); 
                }
            }
            return data;
        }
    }
}
