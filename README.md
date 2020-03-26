# StartupFood
Sistema de pedido de lanche

## Instruções de Execução

###### Backend - .NET Core 3.0

 - Abra o promp de comando do windows
 - Entre na pasta do projeto StartupFood.API
 - Execute o comando <i>dotnet run</i>

###### Frontend - Angular CLI 9.0.7

 - Abra o promp de comando do windows
 - Entre na pasta do projeto StartupFood-App
 - Execute o comando <i>ng serve -o</i>

 ## Justificativa de design de código

  - Projeto divido em 4 camadas para melhor organização do mesmo: 
        - StartupFood-App: Frontend
        - StartupFood.API: API do sistema
        - StartupFood.Business: Camada de negócios
        - StartupFood.Repository: Camada de dados
  - Os dados apresentados no sistema são simulados no projeto StartupFood.Repository sendo:
        - ./BDD/LancheTable.cs: Classe responsável por simular a tabela de lanches do BDD.
        - ./BDD/Ingrediente.cs: Classe responsável por simular a tabela de ingredientes do BDD.
  - Os dados são simulados desta forma uma vez que os requisitos do teste dizem para não persistir od dados
  - As alterações nos valores dos ingredientes são simuladas no Frontend para que seja possível
    o usuário verificar comportamento do sistema com valores diferentes dos valores padrão.
  - O sistema segue o seguinte fluxograma para a função de fazer um pedido:
  ![Fluxograma](https://user-images.githubusercontent.com/40437558/77694804-71487c80-6f89-11ea-8245-250c69417a1d.jpg)