using ApiCierrePuerto.Config;
using ApiCierrePuerto.Service;
using ApiCierrePuerto.Service.impl;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ApiCierrePuerto.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PuertoController :Controller
    {
        private readonly AppSettings _mySettings;
        public PuertoController(IOptions<AppSettings> settings) {
            _mySettings = settings.Value;
        }

        [HttpGet]
        public ActionResult get()
        {
            IExcel excel = new Excel(_mySettings);
            return Ok(excel.leer());
        }
    } 
}
