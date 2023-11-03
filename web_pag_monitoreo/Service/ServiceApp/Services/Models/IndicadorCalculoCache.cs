using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class IndicadorCalculoCache
    {        
        public int ID_INDICADOR_CACHE { get; set; }
        public int ID_INDICADOR_CALCULO {  get; set; }
        public string VALOR { get; set; }
        public string FECHA { get; set; }
    }
}
