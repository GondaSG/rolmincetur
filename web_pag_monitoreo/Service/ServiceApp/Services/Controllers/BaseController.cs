using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using System.Data;
using System.IO;
using System.Text;
using System;
using Microsoft.Extensions.Options;
using Services.Config;

namespace Services.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly AppSettings _mySettings;

        public BaseController(IOptions<AppSettings> settings)
        {
            _mySettings = settings.Value;
        }

        private OracleCommand ConexionBD_ORCL(string sql)
        {
            string cadena = _mySettings.oracle;
            OracleConnection cn = new OracleConnection(cadena);
            return new OracleCommand(sql, cn);
        }

        public string GetDataQueryJson(string jsonParams, string storeName)
        {
            using (OracleCommand cm = ConexionBD_ORCL(storeName))
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
