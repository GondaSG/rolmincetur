using Dapper;
using NetCoreApiPostgreSQL.Model;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace NetCoreApiPostgreSQL.Data.Repositories
{
    public class CarRepository : ICarRepository

    {
        private PostgreSQLConfiguration _connectionString;

        public CarRepository(PostgreSQLConfiguration connectionString)
        {
            _connectionString = connectionString; 
        }

        //protected NpgsqlConnection dbConnection()
        //{
        //    return new NpgsqlConnection(_connectionString.ConnectionString);
        //}



        public async Task<bool> DeleteCar(Car car)
        {
            //var db = dbConnection();
            //var db = new object { };
            //var sql = @"DELET  
            //            FROM public.""Cars""
            //            WHERE id = @Id";
            //            
            //var result = await db.ExecuteAsync(sql, new { Id = car.id});

            return true;
        }

        public List<string> GetAllCars(string cadena)
        {
            //var strin = ConfigurationManager.ConnectionStrings["oracle"].ConnectionString;

            List<string> data = new List<string>();
            OracleConnection cn = new OracleConnection();
            cn.ConnectionString = cadena;
            cn.Open();

            OracleCommand cmd = cn.CreateCommand();
            cmd.CommandText = "select trim(cod) " +
                                    "from tramo_mt" +
                                    "where empresa='SEAL' -- <--Se reemplaza por el codigo de la empresa ingresado por el usuario " +
                                    "START WITH trim(cod_ant)  in (select trim(cod_tmt) from ly_osi_equipo_mt where trim(cod)='120110') -- <--Se reemplaza por el codigo del seccionador ingresado por el usuario " +
                                    "connect by prior cod=cod_ant ";

            OracleDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            { 
                Console.WriteLine(dr.GetString(0));
                data.Add(dr.GetString(0));
            }
            cn.Close();

            return data;
            //var db = dbConnection();

            //var sql = @"SELECT  id, make, model, nombre, year, doors
            //            FROM public.""Cars""
            //            ";
            //return await db.QueryAsync<Car>(sql, new { });
        }

        public async Task<Car> GetCarDetails(int id)
        {
            //var db = dbConnection();
            //
            //var sql = @"SELECT  id, make, model, nombre, year, doors
            //            FROM public.""Cars""
            //            WHERE id = @Id";
            //return await db.QueryFirstOrDefaultAsync<Car>(sql, new { Id = id});
            return null;
        }

        public async Task<bool> InsertCar(Car car)
        {
            //var db = dbConnection();
            //
            //var sql = @"INSERT INTO public.""Cars""  ( make, model, nombre, year, doors)
            //            VALUES  (@Make, @Model, @Nombre, @Year, @Doors) ";
            //
            //var result = await db.ExecuteAsync(sql, new { car.make, car.model, car.name, car.Year, car.Doors});
            //return result>0;
            return true;
        }

        public async Task<bool> UpdateCar(Car car)
        {
            //var db = dbConnection();
            //
            //var sql = @"UPDATE public.""Cars""
            //            SET make = @Make, 
            //                model =@Model,
            //                nombre = @Nombre,
            //                year = @Year, 
            //                doors = @Doors
            //            WHERE id=@Id";
            //
            //var result = await db.ExecuteAsync(sql, new { car.make, car.model, car.name, car.Year, car.Doors, car.id });
            //return result > 0;
            return true;
        }
    }
}
