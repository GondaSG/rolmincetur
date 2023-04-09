using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NetCoreApiPostgreSQL.Config;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace ServiciosAPP.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly AppSettings _mySettings;
        public ValuesController(IOptions<AppSettings> settings)
        {
            _mySettings = settings.Value;
        }

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
            string sql = "select trim("+_mySettings.campo1+") from " + _mySettings.t_tramo + " where empresa='SEAL'" +
                                      " START WITH trim("+_mySettings.campo2+") in (select trim(cod_tmt) from "+ _mySettings.t_equipo + " where trim("+_mySettings.campo1+")='120110') " +
                                      " connect by prior "+_mySettings.campo1+"="+_mySettings.campo2;
            List<string> tramos = this.GetDatosSQL(sql);
            string sql2 = "select distinct trim(cod_sed) from "+ _mySettings.t_nodo_enlace + "" +
                            " where trim(cod_tmt) in (" +
                                " select trim("+_mySettings.campo1+") from " + _mySettings.t_tramo + " where empresa = '" + empresa + "'" +
                                " START WITH trim("+_mySettings.campo2+")  in (select trim(cod_tmt) from "+ _mySettings.t_equipo + " where trim("+_mySettings.campo1+") = '" + code + "')" +
                                " connect by prior cod = cod_ant )";
            List<string> sed = this.GetDatosSQL(sql2);
            string sql3 = "select distinct trim("+_mySettings.campo1+") from "+ _mySettings.t_equipo + "" +
                            " where cod_tip in ('IN', 'RE', 'SL', 'SC', 'SF', 'FU', 'SE', 'DB', 'DP', 'CA', 'CE')" +
                            " and trim(cod_tmt) in (" +
                                " select trim("+_mySettings.campo1+") from " + _mySettings.t_tramo + "" +
                                " where empresa = '" + empresa + "'" +
                                " START WITH trim("+_mySettings.campo2+")  in (select trim(cod_tmt) from "+ _mySettings.t_equipo + " where trim("+_mySettings.campo1+") = '" + code + "')" +
                                " connect by prior cod = cod_ant) ";
            List<string> seccionadorAfectado = this.GetDatosSQL(sql3);
            object dt = new { tramos, sed, seccionadorAfectado };
            return dt;
        }

        // GET api/values/GetData/{empresa}/{code}
        [Route("GetData/{empresa}/{code}")]
        public ActionResult<object> GetData(String empresa, String code)
        {
            string[] empresaContain = new string[]{ "ADIL", "EGEP", "ELC", "ELUC", "SEAL", "EDSA" };
            string sqlTramos = "";
            string sqlSED = "";
            string sqlSeccionadorAfectado = "";
            string sqlelementos = "";
            if (empresaContain.Contains(empresa)) {
                sqlTramos = "select distinct cod from (" +
                    " select trim("+_mySettings.campo1+") as cod, trim("+_mySettings.campo2+") as cod_ant from "+ _mySettings.t_tramo + " where empresa = '" + empresa + "'" +
                    " ) START WITH "+_mySettings.campo2+" in" +
                    " (select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa = '" + empresa + "' and trim("+_mySettings.campo1+")= '" + code + "') " +
                    " connect by nocycle prior "+_mySettings.campo1+"="+_mySettings.campo2;
                sqlSED = "WITH tramos as ( select distinct cod from ( " +
                    " select trim("+_mySettings.campo1+") as cod, trim("+_mySettings.campo2+") as cod_ant from " + _mySettings.t_tramo + " where empresa = '" + empresa + "'" +
                    " ) START WITH "+_mySettings.campo2+" in (" +
                    " select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa = '" + empresa + "' and trim("+_mySettings.campo1+")= '" + code + "'" +
                    " ) connect by nocycle prior "+_mySettings.campo1+"="+_mySettings.campo2 +
                    " ) select distinct trim(cod_sed) from "+ _mySettings.t_nodo_enlace + " where empresa = '" + empresa + "' and" +
                    " trim(cod_tmt) in (select * from " + _mySettings.t_tramos + ")";
                sqlSeccionadorAfectado = "WITH tramos as (" +
                    " select distinct cod from ( select trim("+_mySettings.campo1+") as cod, trim("+_mySettings.campo2+") as cod_ant from " + _mySettings.t_tramo + " where empresa='" + empresa + "') START WITH "+_mySettings.campo2+" in" +
                    " ( select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa='" + empresa + "' and trim("+_mySettings.campo1+")='" + code + "') connect by nocycle prior "+_mySettings.campo1+"="+_mySettings.campo2 +
                    " ) select distinct cod from (select cast (trim("+_mySettings.campo1+") as nvarchar2(100)) as cod from "+ _mySettings.t_equipo + " where empresa='" + empresa + "' and" +
                    " cod_tip in ('IN', 'RE', 'SL', 'SC', 'SF', 'FU', 'SE', 'DB', 'DP', 'CA', 'CE') and trim(cod_tmt) in (select * from " + _mySettings.t_tramos + ")" +
                    " union all select cast ('" + code + "' as nvarchar2(100)) from dual)";
                sqlelementos = "WITH tramos as ( " +
                    " select distinct cod from ( " +
                    " select trim("+_mySettings.campo1+") as cod, trim("+_mySettings.campo2+") as cod_ant from " + _mySettings.t_tramo + " where empresa= '" + empresa + "'" +
                    " ) START WITH "+_mySettings.campo2+" in (" +
                    " select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa= '" + empresa + "' and trim("+_mySettings.campo1+")= '" + code + "'" +
                    " ) connect by nocycle prior "+_mySettings.campo1+"="+_mySettings.campo2 +") " +
                    " select distinct trim(b.etiqueta) from "+ _mySettings.t_nodo_enlace + " a left join ( " +
                    " select etiqueta,cod from " + _mySettings.t_subestaciones + " where empresa='" + empresa + "'" +
                    " ) b on trim(a.cod_sed) = trim(b.cod) where a.empresa= '" + empresa + "' and trim(a.cod_tmt) in (select * from "+_mySettings.t_tramos+")";
            }
            else {
                sqlTramos = "select distinct cod from (" +
                    " select trim("+_mySettings.campo1+") as cod, trim("+_mySettings.campo2+") as cod_ant from " + _mySettings.t_tramo + " where empresa = '" + empresa + "'" +
                    " ) START WITH "+_mySettings.campo2+" in" +
                    " (select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa = '"+ empresa + "' and trim("+_mySettings.campo1+")= '" + code + "') " +
                    " connect by nocycle prior "+_mySettings.campo1+"="+_mySettings.campo2 +
                    " union all select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa='"+ empresa + "' and trim("+_mySettings.campo1+")='" + code + "'";
                sqlSED = "WITH tramos as ( select distinct cod from ( " +
                    " select trim("+_mySettings.campo1+") as cod, trim("+_mySettings.campo2+") as cod_ant from " + _mySettings.t_tramo + " where empresa = '" + empresa + "'" +
                    " ) START WITH "+_mySettings.campo2+" in (" +
                    " select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa = '" + empresa + "' and trim("+_mySettings.campo1+")= '" + code + "'" +
                    " ) connect by nocycle prior "+_mySettings.campo1+"="+_mySettings.campo2 +
                    " union all select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa='" + empresa + "' and trim("+_mySettings.campo1+")='" + code + "'" +
                    " ) select distinct trim(cod_sed) from "+ _mySettings.t_nodo_enlace + " where empresa = '" + empresa + "' and" +
                    " trim(cod_tmt) in (select * from "+_mySettings.t_tramos+")";
                sqlSeccionadorAfectado = "WITH tramos as (" +
                    " select distinct cod from ( select trim("+_mySettings.campo1+") as cod, trim("+_mySettings.campo2+") as cod_ant from " + _mySettings.t_tramo + " where empresa='" + empresa + "') START WITH "+_mySettings.campo2+" in" +
                    " ( select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa='" + empresa + "' and trim("+_mySettings.campo1+")='" + code + "') connect by nocycle prior "+_mySettings.campo1+"="+_mySettings.campo2 +
                    " union all select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa='" + empresa + "' and trim("+_mySettings.campo1+")='" + code + "'" +
                    " ) select distinct cod from (select cast (trim("+_mySettings.campo1+") as nvarchar2(100)) as cod from "+ _mySettings.t_equipo + " where empresa='" + empresa + "' and" +
                    " cod_tip in ('IN', 'RE', 'SL', 'SC', 'SF', 'FU', 'SE', 'DB', 'DP', 'CA', 'CE') and trim(cod_tmt) in (select * from "+_mySettings.t_tramos+")" +
                    " union all select cast ('" + code + "' as nvarchar2(100)) from dual)";
                sqlelementos = "WITH tramos as ( " +
                    " select distinct cod from ( " +
                    " select trim("+_mySettings.campo1+") as cod, trim("+_mySettings.campo2+") as cod_ant from " + _mySettings.t_tramo + " where empresa= '" + empresa + "'" +
                    " ) START WITH "+_mySettings.campo2+" in (" +
                    " select trim(cod_tmt) from "+ _mySettings.t_equipo + " where empresa= '" + empresa + "' and trim("+_mySettings.campo1+")= '" + code + "'" +
                    " ) connect by nocycle prior "+_mySettings.campo1+"="+_mySettings.campo2 + " union all " +
                    " select trim(cod_tmt) from " + _mySettings.t_equipo + " where empresa='" + empresa + "' and trim("+_mySettings.campo1+")= '" + code + "'" +
                    " ) " +
                    " select distinct trim(b.etiqueta) from "+ _mySettings.t_nodo_enlace + " a left join ( " +
                    " select etiqueta,cod from " + _mySettings.t_subestaciones + " where empresa='" + empresa + "'" +
                    " ) b on trim(a.cod_sed) = trim(b.cod) where a.empresa= '" + empresa + "' and trim(a.cod_tmt) in (select * from " + _mySettings.t_tramos + ")";
            }
            List<string> tramos = this.GetDatosSQL(sqlTramos);
            List<string> sed = this.GetDatosSQL(sqlSED);
            List<string> seccionadorAfectado = this.GetDatosSQL(sqlSeccionadorAfectado);
            List<string> elementos = this.GetDatosSQL(sqlelementos);
            object dt = new { tramos, sed, seccionadorAfectado, elementos };
            return dt;
        }

        private List<string> GetDatosSQL(string sql) {
            List<string> data = new List<string>();
            string cadena = _mySettings.oracle;// ConfigurationManager.AppSettings["Oracle"];
            //string cad = "Data Source=(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.10.23.14)(PORT = 1521))(CONNECT_DATA =(SERVER = DEDICATED)(SID = desagis))); User Id=ELEC_DIST;Password=d1ST3L3c180S1;";
            using (OracleConnection cn = new OracleConnection(cadena))
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
                    data.Add(sql);
                    data.Add(ex.Message);
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
