using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/incidencia/{codigo}")]
    [ApiController]
    public class IncidenteController : ControllerBase
    {
        private readonly AppSettings _mySettings;

        public IncidenteController(IOptions<AppSettings> settings) 
        {
            _mySettings = settings.Value;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Incidente>> Get(string codigo)
        {
            if (string.IsNullOrEmpty(codigo))
            {
                return BadRequest("El parámetro 'codigo' es obligatorio.");
            }

            string sql = $"SELECT * FROM INCIDENTE_CMO WHERE CODIGO = '{codigo}'";
            List<Incidente> incidentes = GetDatosSQL(sql);

            if (incidentes.Count == 0)
            {
                return NotFound("No se encontraron datos con el código proporcionado.");
            }
            return incidentes;
        }


        private List<Incidente> GetDatosSQL(string sql)
        {
            List<Incidente> data = new List<Incidente>();
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
                            Incidente incidente = new Incidente();
                            incidente.SECTOR = dr.GetString(0);
                            incidente.FECHA_EVENTO = DBNull.Value != dr.GetValue(1) ? new DateTime() : dr.GetDateTime(1);
                            incidente.TIPO = dr.GetString(2);
                            incidente.FUENTE = dr.GetString(3);
                            incidente.DEPARTAMENTO = dr.GetString(4);
                            incidente.PROVINCIA = dr.GetString(5);
                            incidente.DISTRITO = dr.GetString(6);
                            incidente.UBIGEO = dr.GetString(7);
                            incidente.DESCRIPCION = dr.GetString(8);
                            incidente.CODIGO = dr.GetString(9);
                            incidente.FECHA_REGISTRO = DBNull.Value != dr.GetValue(10) ? new DateTime() : dr.GetDateTime(10);
                            incidente.GERENCIA = dr.GetString(11);
                            incidente.ESTADO = dr.GetString(12);
                            incidente.OFICINA_REGIONAL = dr.GetString(13);
                            incidente.FECHA_CREACION = DBNull.Value != dr.GetValue(14) ? new DateTime() : dr.GetDateTime(14);
                            incidente.FECHA_EDICION = DBNull.Value != dr.GetValue(15) ? new DateTime() : dr.GetDateTime(15);
                            incidente.ESTADO_EVENTO = dr.GetString(16);
                            incidente.UNIDAD = dr.GetString(17);
                            incidente.CRITICIDAD = dr.GetString(18);
                            incidente.COORD_X = dr.GetInt32(19);
                            incidente.COORD_Y = dr.GetInt32(20);
                            incidente.CRITICIDAD_VALOR = dr.GetInt32(21);
                            incidente.TIEMPO_OPE = dr.GetInt32(22);
                            incidente.TIEMPO_COM = dr.GetInt32(23);
                            incidente.TIEMPO_ATE = dr.GetInt32(24);
                            incidente.UBICACION = dr.GetString(25);
                            incidente.UBICACION = dr.GetString(26);
                            incidente.FECHA_CREACION = DBNull.Value != dr.GetValue(27) ? new DateTime() : dr.GetDateTime(27);
                            incidente.FECHA_CREACION = DBNull.Value != dr.GetValue(28) ? new DateTime() : dr.GetDateTime(28);
                            incidente.FECHA_CREACION = DBNull.Value != dr.GetValue(29) ? new DateTime() : dr.GetDateTime(29);
                            incidente.UBICACION = dr.GetString(30);
                            incidente.UBICACION = dr.GetString(31);
                            data.Add(incidente);
                        }
                    }
                }
                catch (Exception ex)
                {
                    data = new List<Incidente>(); 
                }
            }
            return data;
        }
    }
}
