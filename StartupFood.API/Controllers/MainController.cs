using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StartupFood.Business.Interfaces;

namespace StartupFood.API.Controllers
{
    [ApiController]
    public class MainController : ControllerBase
    {
        public IMainService Service { get; set; }

        public MainController(IMainService Service)
        {
            this.Service = Service;
        }

        [HttpGet]
        [Route("api/lanches")]
        public IActionResult GetLanches()
        {
            try
            {
                var result = Service.GetAllLancheAsync().Result;

                return Ok(result);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        [HttpGet]
        [Route("api/ingredientes")]
        public IActionResult GetIngredientes()
        {
            try
            {
                var result = Service.GetAllIngredienteAsync().Result;

                return Ok(result);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }
    }
}
