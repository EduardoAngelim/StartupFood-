using System.Collections.Generic;
using System.Threading.Tasks;
using StartupFood.Repository.Models;

namespace StartupFood.Business.Interfaces
{
    public interface IMainService
    {
        Task<List<Ingrediente>> GetAllIngredienteAsync();
        Task<List<Lanche>> GetAllLancheAsync();
    }
}