using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StartupFood.Repository.Models;

namespace StartupFood.Repository.BDD
{
    public static class IngredienteTable
    {
        //Elaborado desta forma para exemplificar
        //a utilização de tarefas assíncronas.
        public static Task<List<Ingrediente>> Ingredientes()
        {
            var Ingredientes = new Ingrediente[] {
                    new Ingrediente{
                        Id = 1,
                        Nome = "Alface",
                        Valor = 0.4m
                    },
                    new Ingrediente{
                        Id = 2,
                        Nome = "Bacon",
                        Valor = 2.0m
                    },
                    new Ingrediente{
                        Id = 3,
                        Nome = "Hambúrguer de carne",
                        Valor = 3.0m
                    },
                    new Ingrediente{
                        Id = 4,
                        Nome = "Ovo",
                        Valor = 0.8m
                    },
                    new Ingrediente{
                        Id = 5,
                        Nome = "Queijo",
                        Valor = 1.50m
                    }
                };

            return Task.Run(() => Ingredientes.ToList());
        }
    }
}