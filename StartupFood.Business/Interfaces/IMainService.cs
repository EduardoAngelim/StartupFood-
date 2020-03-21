using System.Collections.Generic;
using System.Threading.Tasks;
using StartupFood.Repository.Models;

namespace StartupFood.Business.Interfaces
{
    public interface IMainService
    {
        Task<List<Ingrediente>> GetAllIngredienteAsync();
        Task<Ingrediente> GetIngredienteAsyncById(int Id);
        Task<List<Lanche>> GetAllLancheAsync();
        Task<Lanche> GetLancheAsyncById(int Id);
    }
}