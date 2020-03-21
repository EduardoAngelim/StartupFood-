using System.Collections.Generic;

namespace StartupFood.Repository.Models
{
    public class Lanche
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public List<Ingrediente> Ingredientes { get; set; }
    }
}