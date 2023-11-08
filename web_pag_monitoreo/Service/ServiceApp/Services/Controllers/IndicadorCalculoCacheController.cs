using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/indicadorCalculoCache")]
    [ApiController]
    public class IndicadorCalculoCacheController : ControllerBase
    {
        private readonly AppSettings _mySettings;

        public IndicadorCalculoCacheController(IOptions<AppSettings> settings)
        {
            _mySettings = settings.Value;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<IndicadorCalculoCache>> Get()
        {
            string sql = "SELECT * FROM CM_INDICADOR_CALCULO_CACHE";
            List<IndicadorCalculoCache> indicadorCalculoCache = GetDatosSQL(sql);
            return indicadorCalculoCache;
        }

        private List<IndicadorCalculoCache> GetDatosSQL(string sql)
        {
            List<IndicadorCalculoCache> data = new List<IndicadorCalculoCache>();
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
                            IndicadorCalculoCache indicadorCalculoCache = new IndicadorCalculoCache();
                            indicadorCalculoCache.ID_INDICADOR_CACHE = dr.GetInt32(0);
                            indicadorCalculoCache.ID_INDICADOR_CALCULO = dr.GetInt32(1);
                            indicadorCalculoCache.VALOR = dr.GetString(2);
                            indicadorCalculoCache.FECHA = dr.IsDBNull(3) || dr.GetDateTime(3) == DateTime.MinValue ? DateTime.Now : dr.GetDateTime(3);
                            data.Add(indicadorCalculoCache);
                        }
                    }
                }
                catch (Exception ex)
                {
                    data = new List<IndicadorCalculoCache>(); 
                }
            }
            return data;
        }
    }
}
