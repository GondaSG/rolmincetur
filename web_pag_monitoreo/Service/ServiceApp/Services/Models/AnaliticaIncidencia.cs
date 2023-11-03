using System;
using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class AnaliticaIncidencia
    {        
        public int ID_INCIDECNIA {  get; set; }
        public string SECTOR { get; set; }
        public string TIPO_INCIDENCIA { get; set; }
        public string ESTADO { get; set; }
        public string FECHA_INCIDENCIA { get; set; }
        public string FECHA_REGISTRO { get; set; }
        public string CRITICIDAD { get; set; }
        public string DESCRIPCION_INCIDENCIA { get; set; }
        public string AFECTACION { get; set; }
        public string CAUSA_INCIDENCIA { get; set; }
        public string FUENTE_INFORMACION { get; set; }
        public string DIRECCION_AFECTACION { get; set; }
        public string DIRECCION_DEPARTAMENTO { get; set; }
        public string DIRECCION_PROVINCIA { get; set; }
        public string DIRECCION_DISTRITO { get; set; }
        public string DIRECCION_UBIGEO { get; set; }
        public string LATITUD { get; set; }
        public string LONGITUD { get; set; }
        public string OFICINA_REGIONAL { get; set; }
        public string OFICINA_REGIONAL_PROFESIONAL { get; set; }
        public int AFECTACION_NUM_FAMILIAS { get; set; }
        public int AFECTACION_NUM_PERSONAS { get; set; }
        public int AFECTACION_VIVIENDAS { get; set; }
        public int AFECTACION_NUM_FALLECIDOS { get; set; }
        public string ANALISIS_POST { get; set; }
        public string URL_FOTO01 { get; set; }
        public string URL_FOTO02 { get; set; }
        public string URL_FOTO03 { get; set; }
        public string URL_FOTO04 { get; set; }
        public string INFORME { get; set; }
    }
}

