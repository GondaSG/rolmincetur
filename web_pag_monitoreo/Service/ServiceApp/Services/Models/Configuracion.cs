using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class Configuracion
    {        
        public int ID_CONFIGURACION { get; set; }
        public string DESCRIPCION {  get; set; }
        public string ABREVIATURA { get; set; }
        public int ID_CATEGORIA { get; set; }
    }
}
