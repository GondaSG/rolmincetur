using Dapper;
using NetCoreApiPostgreSQL.Model;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreApiPostgreSQL.Data.Repositories
{
    public class CarRepository : ICarRepository

    {
        private PostgreSQLConfiguration _connectionString;

        public CarRepository(PostgreSQLConfiguration connectionString)
        {
            _connectionString = connectionString; 
        }

        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(_connectionString.ConnectionString);
        }



        public async Task<bool> DeleteCar(Car car)
        {
            var db = dbConnection();

            var sql = @"DELET  
                        FROM public.""Cars""
                        WHERE id = @Id";
                        
            var result = await db.ExecuteAsync(sql, new { Id = car.id});

            return result > 0;
        }

        public async Task<IEnumerable<Car>> GetAllCars()
        {
            var db = dbConnection();

            var sql = @"SELECT  id, make, model, nombre, year, doors
                        FROM public.""Cars""
                        ";
            return await db.QueryAsync<Car>(sql, new { });
        }

        public async Task<Car> GetCarDetails(int id)
        {
            var db = dbConnection();

            var sql = @"SELECT  id, make, model, nombre, year, doors
                        FROM public.""Cars""
                        WHERE id = @Id";
            return await db.QueryFirstOrDefaultAsync<Car>(sql, new { Id = id});
        }

        public async Task<bool> InsertCar(Car car)
        {
            var db = dbConnection();

            var sql = @"INSERT INTO public.""Cars""  ( make, model, nombre, year, doors)
                        VALUES  (@Make, @Model, @Nombre, @Year, @Doors) ";

            var result = await db.ExecuteAsync(sql, new { car.make, car.model, car.name, car.Year, car.Doors});
            return result>0;
        }

        public async Task<bool> UpdateCar(Car car)
        {
            var db = dbConnection();

            var sql = @"UPDATE public.""Cars""
                        SET make = @Make, 
                            model =@Model,
                            nombre = @Nombre,
                            year = @Year, 
                            doors = @Doors
                        WHERE id=@Id";

            var result = await db.ExecuteAsync(sql, new { car.make, car.model, car.name, car.Year, car.Doors, car.id });
            return result > 0;
        }
    }
}
