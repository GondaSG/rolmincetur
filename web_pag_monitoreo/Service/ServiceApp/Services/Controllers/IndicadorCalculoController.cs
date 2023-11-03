using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/indicadorCalculo")]
    [ApiController]
    public class IndicadorCalculoController : ControllerBase
    {
        private readonly AppSettings _mySettings;

        public IndicadorCalculoController(IOptions<AppSettings> settings) 
        {
            _mySettings = settings.Value;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<IndicadorCalculo>> Get()
        {
            string sql = "SELECT * FROM CM_INDICADOR_CALCULO";
            List<IndicadorCalculo> indicadorCalculo = GetDatosSQL(sql);
            return indicadorCalculo;
        }

        private List<IndicadorCalculo> GetDatosSQL(string sql)
        {
            List<IndicadorCalculo> data = new List<IndicadorCalculo>();
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
                            IndicadorCalculo indicadorCalculo = new IndicadorCalculo();
                            indicadorCalculo.ID_INDICADOR_CALCULO = dr.GetInt32(0);
                            indicadorCalculo.CALCULO = dr.GetString(1);
                            indicadorCalculo.FUENTE = dr.GetString(2);
                            indicadorCalculo.SEMAFORIZACION = dr.GetString(3);
                            indicadorCalculo.ID_UNIDAD_MEDIDA = dr.GetInt32(4);
                            indicadorCalculo.ID_NIVEL_DETALLE = dr.GetInt32(5);
                            indicadorCalculo.ID_TIPO_REPRESENTACION = dr.GetInt32(6);
                            indicadorCalculo.TEXTO_INTELIGENTE = dr.GetString(7);
                            indicadorCalculo.ID_INDICADOR = dr.GetInt32(8);
                            indicadorCalculo.FECHA_HORA_ACTUALIZACION = dr.GetDateTime(9);
                            data.Add(indicadorCalculo);
                        }
                    }
                }
                catch (Exception ex)
                {
                    data = new List<IndicadorCalculo>(); 
                }
            }
            return data;
        }
    }
}
