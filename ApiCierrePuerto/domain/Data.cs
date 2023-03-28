using System;

namespace ApiCierrePuerto.domain
{
    public class Data
    {
        public string puerto { get; set; }
        public string zona { get; set; }
        public string instalaciónPortuaria { get; set; }
        public DateTime? fechaHoraCierre { get; set; }
        public DateTime? fechaHoraApertura { get; set; }
        public string tiempoPuertoCerrado { get; set; }
        public string motivo { get; set; }
        public string instalaciónPortuariaEstándar { get; set; }
        public string díasDeCierre { get; set; }
        public string ano { get; set; }
        public string mes { get; set; }
        public string comentarios { get; set; }
        public string estado { get; set; }
    }
}
