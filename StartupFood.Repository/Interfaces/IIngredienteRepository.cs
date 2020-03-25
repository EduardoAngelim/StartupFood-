using System.Collections.Generic;
using System.Threading.Tasks;
using StartupFood.Repository.Models;

namespace StartupFood.Repository.Interfaces
{
    public interface IIngredienteRepository
    {
        Task<List<Ingrediente>> GetAllIngredienteAsync();
    }
}