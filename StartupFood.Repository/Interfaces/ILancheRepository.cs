using System.Collections.Generic;
using System.Threading.Tasks;
using StartupFood.Repository.Models;

namespace StartupFood.Repository.Interfaces
{
    public interface ILancheRepository
    {
        Task<List<Lanche>> GetAllLancheAsync();
    }
}