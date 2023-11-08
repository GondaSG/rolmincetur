using System;
using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class Incidente
    {        
        
        public string SECTOR { get; set; }
        public DateTime FECHA_EVENTO { get; set; }
        public string TIPO { get; set; }
        public string FUENTE { get; set; }
        public string DEPARTAMENTO { get; set; }
        public string PROVINCIA { get; set; }
        public string DISTRITO { get; set; }
        public string UBIGEO { get; set; }
        public string DESCRIPCION { get; set; }
        public string CODIGO { get; set; }
        public DateTime FECHA_REGISTRO { get; set; }
        public string GERENCIA { get; set; }
        public string ESTADO { get; set; }
        public string OFICINA_REGIONAL { get; set; }
        public DateTime FECHA_CREACION { get; set; }
        public DateTime FECHA_EDICION { get; set; }
        public string ESTADO_EVENTO { get; set; }
        public string UNIDAD { get; set; }
        public string CRITICIDAD { get; set; }
        public int COORD_X { get; set; }
        public int COORD_Y { get; set; }
        public int CRITICIDAD_VALOR { get; set; }
        public int TIEMPO_OPE { get; set; }
        public int TIEMPO_COM { get; set; }
        public int TIEMPO_ATE { get; set; }
        public string UBICACION { get; set; }
        public string SVG_INCIDENTE { get; set; }
        public DateTime FECHA_OPE { get; set; }
        public DateTime FECHA_COM { get; set; }
        public DateTime FECHA_ATE { get; set; }
        public string REGION { get; set; }
        public string SVG_BITACORA { get; set; }

    }
}

