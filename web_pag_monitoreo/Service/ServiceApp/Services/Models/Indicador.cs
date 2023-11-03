using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class Indicador
    {        
        public int ID_INDICADOR { get; set; }
        public string DEFINICION {  get; set; }
        public string NOMBRE { get; set; }
        public string OBJETIVO { get; set; }
        public int ID_TIPO { get; set; }
        public string SENTIDO { get; set; }
        public int ID_FRECUENCIA { get; set; }
        public int ID_ESTADO { get; set; }
    }
}
