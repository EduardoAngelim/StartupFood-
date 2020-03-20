using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StartupFood.API.Model;
using Microsoft.EntityFrameworkCore;

namespace StartupFood.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        //Elaborado desta forma para exemplificar
        //a utilização de tarefas assíncronas.
        private Task<List<Evento>> GetListAsync(){
                var results = new Evento[] { 
                                new Evento(){
                                    EventoId = 1,
                                    Tema = "Angular e .NET Core",
                                    Local = "Belo Horizonte",
                                    Lote = "1° Lote",
                                    QtdPessoas = 250,
                                    DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy")
                                },
                                new Evento(){
                                    EventoId = 2,
                                    Tema = "Angular e suas novidades",
                                    Local = "São Paulo",
                                    Lote = "2° Lote",
                                    QtdPessoas = 350,
                                    DataEvento = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy")
                                }
                            };

            return Task.Run(() => results.ToList());
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await GetListAsync();

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var result = await GetListAsync();
                
                return Ok(result.FirstOrDefault(x => x.EventoId == id));
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }
    }
}
