using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.OracleClient;
using System.Configuration;

namespace WindowsForms
{
    public class DBoracle
    {
        string conexionString = ConfigurationManager.ConnectionStrings["conexion"].ConnectionString;

        public void conectar()
        {
            OracleConnection conexion = new OracleConnection(conexionString);
            conexion.Open();
            System.Windows.Forms.MessageBox.Show("conectado a oracle");
        }

    }
}
