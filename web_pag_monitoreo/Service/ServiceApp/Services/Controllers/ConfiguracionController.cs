using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/configuracion")]
    [ApiController]
    public class ConfiguracionController : ControllerBase
    {
        private readonly AppSettings _mySettings;

        public ConfiguracionController(IOptions<AppSettings> settings) 
        {
            _mySettings = settings.Value;
        }

        // GET api/indicador
        [HttpGet]
        public ActionResult<IEnumerable<Configuracion>> Get()
        {
            string sql = "SELECT * FROM CM_CONFIGURACION";
            List<Configuracion> configuracion = GetDatosSQL(sql);
            return configuracion;
        }

        private List<Configuracion> GetDatosSQL(string sql)
        {
            List<Configuracion> data = new List<Configuracion>();
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
                            Configuracion configuracion = new Configuracion();
                            configuracion.ID_CONFIGURACION = dr.GetInt32(0);
                            configuracion.DESCRIPCION = dr.GetString(1);
                            configuracion.ABREVIATURA = dr.GetString(2);
                            configuracion.ID_CATEGORIA = dr.GetInt32(3);                            
                            data.Add(configuracion);
                        }
                    }
                }
                catch (Exception ex)
                {
                    data = new List<Configuracion>(); 
                }
            }
            return data;
        }
    }
}
