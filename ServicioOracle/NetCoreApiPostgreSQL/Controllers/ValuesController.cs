using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ServiciosAPP.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // GET api/values
        [HttpGet]
        public ActionResult<object> Get()        
        {
            String empresa = "SEAL";
            String code = "120110";
            string sql = "select trim(cod) from tramo_mt where empresa='SEAL'" +
                                      " START WITH trim(cod_ant) in (select trim(cod_tmt) from ly_osi_equipo_mt where trim(cod)='120110') " +
                                      " connect by prior cod=cod_ant ";
            List<string> tramos = this.GetDatosSQL(sql);
            string sql2 = "select distinct trim(cod_sed) from nodo_enlace" +
                            " where trim(cod_tmt) in (" +
                                " select trim(cod) from tramo_mt where empresa = '" + empresa + "'" +
                                " START WITH trim(cod_ant)  in (select trim(cod_tmt) from ly_osi_equipo_mt where trim(cod) = '" + code + "')" +
                                " connect by prior cod = cod_ant )";
            List<string> sed = this.GetDatosSQL(sql2);
            string sql3 = "select distinct trim(cod) from ly_osi_equipo_mt" +
                            " where cod_tip in ('IN', 'RE', 'SL', 'SC', 'SF', 'FU', 'SE', 'DB', 'DP', 'CA', 'CE')" +
                            " and trim(cod_tmt) in (" +
                                " select trim(cod) from tramo_mt" +
                                " where empresa = '" + empresa + "'" +
                                " START WITH trim(cod_ant)  in (select trim(cod_tmt) from ly_osi_equipo_mt where trim(cod) = '" + code + "')" +
                                " connect by prior cod = cod_ant) ";
            List<string> seccionadorAfectado = this.GetDatosSQL(sql3);
            object dt = new { tramos, sed, seccionadorAfectado };
            return dt;
        }

        // GET api/values/GetData/{empresa}/{code}
        [Route("GetData/{empresa}/{code}")]
        public ActionResult<object> GetData(String empresa, String code)
        {            
            string sql = "select trim(cod) from (" +
                " select * from tramo_mt where empresa = '"+ empresa + "'" +
                " ) START WITH trim(cod_ant) in" +
                " (select trim(cod_tmt) from ly_osi_equipo_mt" +
                " where empresa = '"+ empresa + "' and trim(cod)= '" + code + "') " +
                " connect by prior cod = cod_ant";
            List<string> tramos = this.GetDatosSQL(sql);
            string sql2 = "WITH tramos as ( select trim(cod) from ( " +
                " select * from tramo_mt where empresa = '"+ empresa + "'" +
                " ) START WITH trim(cod_ant) in (" +
                " select trim(cod_tmt) from ly_osi_equipo_mt where empresa = '"+ empresa + "' and trim(cod)= '"+ code + "'" +
                " ) connect by prior cod = cod_ant" +
                " ) select distinct trim(cod_sed) from nodo_enlace where empresa = '"+ empresa + "' and" +
                " trim(cod_tmt) in (select * from tramos)";
            List<string> sed = this.GetDatosSQL(sql2);
            string sql3 = "WITH tramos as (" +
                " select trim(cod) from ( select * from tramo_mt where empresa='"+ empresa + "') START WITH trim(cod_ant) in" +
                " ( select trim(cod_tmt) from ly_osi_equipo_mt where empresa='"+ empresa + "' and trim(cod)='"+ code + "') connect by prior cod=cod_ant" +
                " ) select distinct trim(cod) from ly_osi_equipo_mt where empresa='"+ empresa + "' and" +
                " cod_tip in ('IN', 'RE', 'SL', 'SC', 'SF', 'FU', 'SE', 'DB', 'DP', 'CA', 'CE') and trim(cod_tmt) in (select * from tramos)" +
                " union all" +
                " select distinct trim(cod) from ly_osi_equipo_mt where trim(cod)='"+ code + "'";
            List<string> seccionadorAfectado = this.GetDatosSQL(sql3);
            object dt = new { tramos, sed, seccionadorAfectado };
            return dt;
        }

        private List<string> GetDatosSQL(string sql) {
            List<string> data = new List<string>();
            string cadena = ConfigurationManager.AppSettings["Oracle"];
            string cad = "Data Source=(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.10.23.14)(PORT = 1521))(CONNECT_DATA =(SERVER = DEDICATED)(SID = desagis))); User Id=ELEC_DIST;Password=d1ST3L3c180S1;";
            using (OracleConnection cn = new OracleConnection(cad))
            {
                try
                {
                    OracleCommand cmd = cn.CreateCommand();
                    cmd.CommandText = sql;
                    cmd.CommandTimeout = 100;
                    cmd.Connection = cn;
                    if (cn.State == ConnectionState.Closed)
                        cn.Open();
                    OracleDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        Console.WriteLine(dr.GetString(0));
                        data.Add(dr.GetString(0));
                    }
                }
                catch (Exception ex)
                {
                    data = new List<string>();
                }
                finally
                {
                    if (cn.State == ConnectionState.Open)
                        cn.Close();
                }
            }
            return data;
        }
    }
}
