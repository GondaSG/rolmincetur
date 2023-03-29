using System.Collections.Generic;

namespace ApiCierrePuerto.domain
{
    public class Puerto
    {
        public string mensaje { get; set; }
        public List<Data> data { get; set; }
        public int countData { get; set; }
        public List<Data2> data2 { get; set; }
        public int countData2 { get; set; }

        public string lastModificationDate { get; set; }
    }
}
