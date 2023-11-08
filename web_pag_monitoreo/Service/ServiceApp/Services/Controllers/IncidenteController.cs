using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;

namespace Services.Controllers
{
    [Route("api/incidente/{codigo}")]
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
            string cadena = _mySettings.oracle2;
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
                            incidente.SECTOR = dr.IsDBNull(0) ? string.Empty : dr.GetString(0);
                            incidente.FECHA_EVENTO = dr.IsDBNull(1) || dr.GetDateTime(1) == DateTime.MinValue ? DateTime.Now : dr.GetDateTime(1);
                            incidente.TIPO = dr.IsDBNull(2) ? string.Empty : dr.GetString(2);
                            incidente.FUENTE = dr.IsDBNull(3) ? string.Empty : dr.GetString(3);
                            incidente.DEPARTAMENTO = dr.IsDBNull(4) ? string.Empty : dr.GetString(4);
                            incidente.PROVINCIA = dr.IsDBNull(5) ? string.Empty : dr.GetString(5);
                            incidente.DISTRITO = dr.IsDBNull(6) ? string.Empty : dr.GetString(6);
                            incidente.UBIGEO = dr.IsDBNull(7) ? string.Empty : dr.GetString(7);
                            incidente.DESCRIPCION = dr.IsDBNull(8) ? string.Empty : dr.GetString(8);
                            incidente.CODIGO = dr.IsDBNull(9) ? string.Empty : dr.GetString(9);
                            incidente.FECHA_REGISTRO = dr.IsDBNull(10) || dr.GetDateTime(10) == DateTime.MinValue ? DateTime.Now : dr.GetDateTime(10);
                            incidente.GERENCIA = dr.IsDBNull(11) ? string.Empty : dr.GetString(11);
                            incidente.ESTADO = dr.IsDBNull(12) ? string.Empty : dr.GetString(12);
                            incidente.OFICINA_REGIONAL = dr.IsDBNull(13) ? string.Empty : dr.GetString(13);
                            incidente.FECHA_CREACION = dr.IsDBNull(14) || dr.GetDateTime(14) == DateTime.MinValue ? DateTime.Now : dr.GetDateTime(14);
                            incidente.FECHA_EDICION = dr.IsDBNull(15) || dr.GetDateTime(15) == DateTime.MinValue ? DateTime.Now : dr.GetDateTime(15);
                            incidente.ESTADO_EVENTO = dr.IsDBNull(16) ? string.Empty : dr.GetString(16);
                            incidente.UNIDAD = dr.IsDBNull(17) ? string.Empty : dr.GetString(17);
                            incidente.CRITICIDAD = dr.IsDBNull(18) ? string.Empty : dr.GetString(18);
                            incidente.COORD_X = dr.IsDBNull(19) ? 0 : dr.GetInt32(19);
                            incidente.COORD_Y = dr.IsDBNull(20) ? 0 : dr.GetInt32(20);
                            incidente.CRITICIDAD_VALOR = dr.IsDBNull(21) ? 0 : dr.GetInt32(21);
                            incidente.TIEMPO_OPE = dr.IsDBNull(22) ? 0 : dr.GetInt32(22);
                            incidente.TIEMPO_COM = dr.IsDBNull(23) ? 0 : dr.GetInt32(23);
                            incidente.TIEMPO_ATE = dr.IsDBNull(24) ? 0 : dr.GetInt32(24);
                            incidente.UBICACION = dr.IsDBNull(25) ? string.Empty : dr.GetString(25);
                            incidente.SVG_INCIDENTE = dr.IsDBNull(26) ? string.Empty : dr.GetString(26);
                            incidente.FECHA_OPE = dr.IsDBNull(27) || dr.GetDateTime(27) == DateTime.MinValue ? DateTime.Now : dr.GetDateTime(27);
                            incidente.FECHA_COM = dr.IsDBNull(28) || dr.GetDateTime(28) == DateTime.MinValue ? DateTime.Now : dr.GetDateTime(28);
                            incidente.FECHA_ATE = dr.IsDBNull(29) || dr.GetDateTime(29) == DateTime.MinValue ? DateTime.Now : dr.GetDateTime(29);
                            incidente.REGION = dr.IsDBNull(30) ? string.Empty : dr.GetString(30);
                            incidente.SVG_BITACORA = dr.IsDBNull(31) ? string.Empty : dr.GetString(31);
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
