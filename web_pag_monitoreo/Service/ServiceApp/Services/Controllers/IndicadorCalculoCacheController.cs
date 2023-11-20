using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;
using System.Data;
using System.Text.Json;
using System.Security.Cryptography;
using Oracle.ManagedDataAccess.Types;
using System.IO;
using System.Text;

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
        public ActionResult<string> Get()
        {
            return GetDataQueryJson("");
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

        private OracleCommand ConexionBDSNIRH_ORCL(string sql)
        {
            string cadena = _mySettings.oracle;
            OracleConnection cn = new OracleConnection(cadena);
            return new OracleCommand(sql, cn);
        }

        public string GetDataQueryJson(string jsonParams)
        {
            using (OracleCommand cm = ConexionBDSNIRH_ORCL("CAL_CONSULTA_INDICADOR_CALCULO_CACHE"))
            {
                string Resp = "";
                try
                {
                    cm.CommandType = CommandType.StoredProcedure;
                    cm.Connection.Open();
                    cm.Parameters.Add("p_json_param", OracleDbType.Clob).Value = jsonParams;
                    OracleParameter outParam = new OracleParameter("p_result", OracleDbType.Clob);
                    outParam.Direction = ParameterDirection.Output;
                    cm.Parameters.Add(outParam);
                    cm.ExecuteNonQuery();
                    Resp = ReadClob(outParam.Value as OracleClob);
                }
                catch (Exception)
                {
                    throw;
                }
                finally
                {
                    if ((cm.Connection.State == ConnectionState.Open))
                    {
                        cm.Connection.Close();
                    }
                }
                return Resp;
            }

            static string ReadClob(OracleClob clob)
            {
                if (clob == null || clob.IsEmpty)
                {
                    return string.Empty;
                }

                // Leer el CLOB y convertirlo a cadena
                using (var reader = new StreamReader(clob, Encoding.Unicode))
                {
                    return reader.ReadToEnd();
                }
            }
        }
    }
}
