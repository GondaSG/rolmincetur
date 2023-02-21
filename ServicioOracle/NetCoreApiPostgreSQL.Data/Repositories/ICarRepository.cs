﻿using NetCoreApiPostgreSQL.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreApiPostgreSQL.Data.Repositories
{
    public interface ICarRepository
    {
        Task<IEnumerable<Car>> GetAllCars();

        Task<Car> GetCarDetails(int id);

        Task<bool> InsertCar(Car car);

        Task<bool> UpdateCar(Car car);

        Task<bool> DeleteCar(Car car);

    }
}
