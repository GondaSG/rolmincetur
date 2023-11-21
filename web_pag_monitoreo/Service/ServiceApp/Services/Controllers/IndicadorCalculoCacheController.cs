using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using Services.Config;
using Services.Models;
using System.Data;
using System.Text.Json;
using System.Security.Cryptography;
using Oracle.ManagedDataAccess.Types;
using System.IO;
using System.Text;

namespace Services.Controllers
{
    [Route("api/indicadorCalculoCache")]
    [ApiController]
    public class IndicadorCalculoCacheController : BaseController
    {
        private readonly AppSettings _mySettings;

        public IndicadorCalculoCacheController(IOptions<AppSettings> settings) : base(settings)
        {
        }

        //public IndicadorCalculoCacheController(IOptions<AppSettings> settings)
        //{
        //    _mySettings = settings.Value;
        //}

        [HttpGet]
        public ActionResult<string> Get()
        {
            return this.GetDataQueryJson("", "CAL_CONSULTA_INDICADOR_CALCULO_CACHE");
        }
                
    }
}
