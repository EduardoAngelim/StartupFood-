using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StartupFood.Repository.Interfaces;
using StartupFood.Repository.Models;
using StartupFood.Repository.BDD;

namespace StartupFood.Repository.Repositories
{
    public class LancheRepository : ILancheRepository
    {
        public async Task<List<Lanche>> GetAllLancheAsync()
        {
            var result = await LancheTable.Lanches();

            return result;
        }
        public async Task<Lanche> GetAllLancheAsyncById(int Id)
        {
            var result = await LancheTable.Lanches();

            return result.FirstOrDefault(x => x.Id == Id);
        }
    }
}