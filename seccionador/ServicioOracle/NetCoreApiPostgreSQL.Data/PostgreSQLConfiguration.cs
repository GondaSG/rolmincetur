using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace NetCoreApiPostgreSQL.Data
{
    public class PostgreSQLConfiguration
    {
        
    public PostgreSQLConfiguration(string connectionString) => ConnectionString = connectionString;
    
    public string ConnectionString { get; set; }

    }    
   
}
