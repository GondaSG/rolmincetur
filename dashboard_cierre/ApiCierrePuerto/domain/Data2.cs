using System;
using System.Security.Cryptography.X509Certificates;

namespace ApiCierrePuerto.domain
{
    public class Data2
    {
        public DateTime fecha { get; set; }

        public string sdate { get; set; }
        public string terminal { get; set; }
        public string producto { get; set; }
        public string diasDespacho { get; set; }
        public string ano { get; set; }

        public string puerto { get; set; }

        public string getShortDate()
        {
            return this.fecha.ToShortDateString();
        }
    }
}
