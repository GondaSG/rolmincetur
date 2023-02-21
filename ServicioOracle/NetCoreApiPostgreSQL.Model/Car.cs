using System;
using System.Collections.Generic;
using System.Text;

namespace NetCoreApiPostgreSQL.Model
{
    public class Car
    {
        public int id { get; set; }
        
        public string make { get; set; }

        public string name { get; set; }               

        public string model { get; set; }

        public int Year { get; set; }

        public int Doors { get; set; }
    }
}
