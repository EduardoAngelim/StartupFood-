using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StartupFood.Repository.Interfaces;
using StartupFood.Repository.Models;
using StartupFood.Repository.BDD;

namespace StartupFood.Repository.Repositories
{
    public class IngredienteRepository : IIngredienteRepository
    {
        public async Task<List<Ingrediente>> GetAllIngredienteAsync()
        {
            var result = await IngredienteTable.Ingredientes();

            return result;
        }
        public async Task<Ingrediente> GetAllIngredienteAsyncById(int Id)
        {
            var result = await IngredienteTable.Ingredientes();

            return result.FirstOrDefault(x => x.Id == Id);
        }
    }
}