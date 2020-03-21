using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StartupFood.Repository.Models;

namespace StartupFood.Repository.BDD
{
    public static class LancheTable
    {
        //Elaborado desta forma para exemplificar
        //a utilização de tarefas assíncronas.
        public static Task<List<Lanche>> Lanches()
        {
            var Alface = IngredienteTable.Ingredientes().Result.FirstOrDefault(x => x.Id == 1);
            var Bacon = IngredienteTable.Ingredientes().Result.FirstOrDefault(x => x.Id == 2);
            var HamburgerCarne = IngredienteTable.Ingredientes().Result.FirstOrDefault(x => x.Id == 3);
            var Ovo = IngredienteTable.Ingredientes().Result.FirstOrDefault(x => x.Id == 4);
            var Queijo = IngredienteTable.Ingredientes().Result.FirstOrDefault(x => x.Id == 5);

            var xBacon = new List<Ingrediente>();
            xBacon.Add(Bacon);
            xBacon.Add(HamburgerCarne);
            xBacon.Add(Queijo);

            var xBurger = new List<Ingrediente>();
            xBurger.Add(HamburgerCarne);
            xBurger.Add(Queijo);

            var xEgg = new List<Ingrediente>();
            xEgg.Add(Ovo);
            xEgg.Add(HamburgerCarne);
            xEgg.Add(Queijo);

            var xEggBacon = new List<Ingrediente>();
            xEggBacon.Add(Ovo);
            xEggBacon.Add(Bacon);
            xEggBacon.Add(HamburgerCarne);
            xEggBacon.Add(Queijo);

            var Lanches = new Models.Lanche[] {
                    new Lanche{
                        Id = 1,
                        Nome = "X-Bacon",
                        Ingredientes = xBacon
                    },
                    new Lanche{
                        Id = 2,
                        Nome = "X-Burger",
                        Ingredientes = xBurger
                    },
                    new Lanche{
                        Id = 3,
                        Nome = "X-Egg",
                        Ingredientes = xEgg
                    },
                    new Lanche{
                        Id = 4,
                        Nome = "X-Egg Bacon",
                        Ingredientes = xEggBacon
                    }
                };

            return Task.Run(() => Lanches.ToList());
        }
    }
}