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
                        Valor = 0.4m,
                        Quantidade = 0
                    },
                    new Ingrediente{
                        Id = 2,
                        Nome = "Bacon",
                        Valor = 2.0m,
                        Quantidade = 0
                    },
                    new Ingrediente{
                        Id = 3,
                        Nome = "Hambúrguer de carne",
                        Valor = 3.0m,
                        Quantidade = 0
                    },
                    new Ingrediente{
                        Id = 4,
                        Nome = "Ovo",
                        Valor = 0.8m,
                        Quantidade = 0
                    },
                    new Ingrediente{
                        Id = 5,
                        Nome = "Queijo",
                        Valor = 1.50m,
                        Quantidade = 0
                    }
                };

            return Task.Run(() => Ingredientes.ToList());
        }
    }
}