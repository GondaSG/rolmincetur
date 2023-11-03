using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/indicador")]
    [ApiController]
    public class IndicadorController : ControllerBase
    {
        private readonly AppSettings _mySettings;

        public IndicadorController(IOptions<AppSettings> settings) 
        {
            _mySettings = settings.Value;
        }

        // GET api/indicador
        [HttpGet]
        public ActionResult<IEnumerable<Indicador>> Get()
        {
            string sql = "SELECT * FROM CM_INDICADOR";
            List<Indicador> indicadores = GetDatosSQL(sql);
            return indicadores;
        }

        private List<Indicador> GetDatosSQL(string sql)
        {
            List<Indicador> data = new List<Indicador>();
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
                            Indicador indicador = new Indicador();
                            indicador.ID_INDICADOR = dr.GetInt32(0);
                            indicador.DEFINICION = dr.GetString(1);
                            indicador.NOMBRE = dr.GetString(2);
                            indicador.OBJETIVO = dr.GetString(3);
                            indicador.ID_TIPO = dr.GetInt32(4);
                            indicador.SENTIDO = dr.GetString(5);
                            indicador.ID_FRECUENCIA = dr.GetInt32(6);
                            indicador.ID_ESTADO = dr.GetInt32(7);
                            data.Add(indicador);
                        }
                    }
                }
                catch (Exception ex)
                {
                    data = new List<Indicador>(); 
                }
            }
            return data;
        }
    }
}
