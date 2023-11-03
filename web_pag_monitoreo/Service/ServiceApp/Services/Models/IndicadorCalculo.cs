using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class IndicadorCalculo
    {        
        public int ID_INDICADOR_CALCULO {  get; set; }
        public string CALCULO { get; set; }
        public string FUENTE { get; set; }
        public string SEMAFORIZACION { get; set; }
        public int ID_UNIDAD_MEDIDA { get; set; }
        public int ID_NIVEL_DETALLE { get; set; }
        public int ID_TIPO_REPRESENTACION { get; set; }
        public string TEXTO_INTELIGENTE { get; set; }
        public int ID_INDICADOR { get; set; }
        public DateTime FECHA_HORA_ACTUALIZACION { get; set; }

    }
}

