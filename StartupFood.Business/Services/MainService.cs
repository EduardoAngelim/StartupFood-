using System.Collections.Generic;
using System.Threading.Tasks;
using StartupFood.Business.Interfaces;
using StartupFood.Repository.Models;
using StartupFood.Repository.Interfaces;

namespace StartupFood.Business.Services
{
    public class MainService : IMainService
    {
        public IIngredienteRepository IngredienteRepository { get; set; }
        public ILancheRepository LancheRepository { get; set; }



        public MainService(IIngredienteRepository IngredienteRepository, ILancheRepository LancheRepository)
        {
            this.IngredienteRepository = IngredienteRepository;
            this.LancheRepository = LancheRepository;
        }

        public async Task<List<Ingrediente>> GetAllIngredienteAsync()
        {
            var result = await IngredienteRepository.GetAllIngredienteAsync();

            return result;
        }
        public async Task<Ingrediente> GetIngredienteAsyncById(int Id)
        {
            var result = await IngredienteRepository.GetAllIngredienteAsyncById(Id);

            return result;
        }
        public async Task<List<Lanche>> GetAllLancheAsync()
        {
            var result = await LancheRepository.GetAllLancheAsync();

            return result;
        }
        public async Task<Lanche> GetLancheAsyncById(int Id)
        {
            var result = await LancheRepository.GetAllLancheAsyncById(Id);

            return result;
        }
    }
}