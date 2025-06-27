Escopo do Projeto: E-commerce para Loja de Carros

Link de acesso: https://pegasus-shop-felipes-projects-0b62107b.vercel.app/

1. Introdução

    Visão Geral do Projeto: Desenvolvimento de uma plataforma de e-commerce para uma loja de carros, utilizando tecnologias modernas e práticas de desenvolvimento de software.
    Objetivos e Propósito do Sistema: Facilitar a compra e venda de carros, proporcionando uma experiência de usuário eficiente e segura.
    Benefícios Esperados do Projeto: Aumentar o conhecimento prático em desenvolvimento web, implementar um sistema funcional de e-commerce.

2. Visão Geral do Sistema

    Descrição do Sistema: Plataforma online para listar, pesquisar e adicionar carros ao seu carrinho de compras. Inclui funcionalidades para gestão de compra e processos de catalogação.
    Público-alvo do Sistema: Amantes de carros de luxo.
    Requisitos Funcionais e Não Funcionais:
        Funcionais: Gestão de usuários, catálogo de produtos, carrinho de compras, sistema de pagamento simulado.
        Não Funcionais: Desempenho (tempo de resposta), segurança (proteção de dados básicos), escalabilidade para fins acadêmicos, manutenibilidade.

3. Arquitetura de Sistema

    Explicação da Arquitetura: Utilização de arquitetura limpa com princípios SOLID, separando preocupações em diferentes camadas.
    Papel de cada Componente:
        Model: Representação dos dados (carros, usuários, pedidos).
        View: Interface do usuário desenvolvida com Angular.
        Controller: Lógica de controle e gestão das rotas, utilizando NestJS.
    Uso do Padrão Repository para Acesso a Dados: Isolar a lógica de acesso a dados e facilitar testes unitários.

4. Requisitos Funcionais

    Lista Detalhada de Funcionalidades do Sistema:
        Gestão de Usuários: Registro, login, perfil.
        Catálogo de Carros: Listagem, detalhes, filtros (marca, modelo, preço).
        Carrinho de Compras: Adicionar/remover carros, visualizar carrinho.
    
    Casos de Uso Principais:
        Registro e Autenticação
        Pesquisa e Filtro de Carros
        Gestão do Carrinho de Compras
    Fluxo de Trabalhos do Usuário:
        Navegação anônima ou autenticada
        Busca de carros
        Adição de carros ao carrinho
        Finalização da compra

5. Requisitos Não Funcionais

    Desempenho Esperado do Sistema: Tempo de resposta inferior a 2 segundos para a maioria das operações.
    Segurança e Autenticação: Implementação de autenticação JWT básica, proteção de dados de usuário.
    Escalabilidade e Manutenibilidade: Suporte para ser facilmente compreendido e modificado por estudantes.

6. Tecnologias Utilizadas

    Linguagens de Programação: TypeScript.
    Frameworks e Ferramentas:
        Backend: Node.js, NestJS.
        Frontend: Next.js.
    Banco de Dados: MongoDB.
    Ferramentas de Desenvolvimento: Visual Studio Code, Git.

7. Modelo de Dados

    Estrutura do Banco de Dados: Esquema baseado em coleções MongoDB.
    Relacionamentos entre Entidades:
        Usuário (informações pessoais)
        Carro (detalhes do veículo, preço, estoque)
        Pedido (itens, status, histórico)
    Esquema de Armazenamento: Coleções para usuários, carros, pedidos.

8. Interfaces do Usuário

    Layout e Design das Interfaces: UI responsiva e intuitiva desenvolvida com Angular Material.
    Funcionalidades Específicas de Cada Tela:
        Home: Busca e listagem de carros.
        Detalhes do Carro: Informações detalhadas, avaliações.
        Carrinho: Listagem de itens no carrinho, resumo de preço.
        Perfil do Usuário: Dados pessoais, histórico de pedidos.
    Fluxos de Interação do Usuário: Navegação entre telas, confirmação de ações (ex: adição ao carrinho, login).

9. Arquitetura de Implementação

    Organização do Código-fonte:
        Backend: Estrutura em módulos (ex: users, cars, orders).
        Frontend: Componentes Angular divididos por funcionalidades.
    Divisão em Módulos e Componentes:
        Módulos no NestJS para gerenciamento de usuários, carros, pedidos.
        Componentes Next/React para interfaces de usuário.
    Dependências entre os Componentes: Uso de injeção de dependência para gerenciar relações entre serviços.

10. Planejamento de Implantação

    Ambientes de Implantação:
        Desenvolvimento: Ambiente local.
        Teste: Ambiente de teste para validação.
    Procedimentos de Implantação: Scripts de automação (CI/CD) simples, testes unitários e integração.
    Migração de Dados: Não aplicável, considerando um projeto acadêmico inicial.

11. Gestão de Configuração de Versão

    Políticas de Controle de Versão: Uso de Git com branches (main, develop, feature).
    Ramificação do Código Fonte: Estrutura de branches para desenvolvimento, testes.
    Uso de Ferramentas de Controle de Versão: GitHub/GitLab para gerenciamento de código.

12. Gestão de Projetos

    Cronograma de Desenvolvimento: Divisão do projeto em sprints, entregas incrementais.
    Atribuição de Tarefas e Responsabilidades: Equipe de desenvolvimento com papéis definidos (desenvolvedores back-front).
    Monitoramento do Progresso: Uso de ferramentas de gestão de projetos (Git).

13. Considerações de Segurança

    Mecanismos de Autenticação e Autorização: Implementação de JWT para autenticação.
    Proteção contra Vulnerabilidades: Validação de entrada, proteção contra ataques básicos.
    Auditoria e Registro de Atividades Sensíveis: Logs de ações de usuários.

14. Considerações de Manutenção

    Planos de Suporte Pós-implementação: Suporte limitado para correções durante o período do projeto.
    Processo de Correção de Bugs e Implementação de Melhorias: Sistema de tickets para bugs, atualizações regulares.
    Atualizações de Segurança e Software: Monitoramento contínuo, atualizações regulares de dependências.


# Projeto Fronte-end Ecommerce PEGASUS com Next.js

## O que está incluso:

- Next.js
- Tailwind CSS
- next-icons

## Porta http://localhost:3000/

## Install & Start

Para instalar basta rodar na raiz do projeto:

```bash
npm install
npm run dev

DEPENDENCIAS (caso precise separadamente):
npm install next
npm install react-icons
npm install react-icons

```
## Arquitetura
Dependências Core
São as principais dependências do projeto, que precisam ser compreendidas pelo menos minimamente para entender como esta arquitetura funciona.

Next.js: Framework React para desenvolvimento web com renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).
Tailwind CSS: Framework utilitário CSS para criar layouts modernos rapidamente.
next-icons: Pacote de ícones para uso no Next.js.

## Páginas
As páginas possuem rotas próprias. São sempre divididas entre container e componente. O container (index.js) faz a conexão com as stores e é responsável por toda a lógica da página e por passar as informações da store para a interface. Já o componente (nome da página) é responsável pela interface visual.

## Estrutura das Páginas:
Home: Página inicial do site, exibindo uma lista de produtos.
catalogo/[id]: Página de detalhes de um produto específico.
login: Página de login do usuário.
carrinho-de-compra: Página de visualização do carrinho de compras.
favoritos: Página que exibe os produtos favoritos do usuário.
novo-produto: Página para adicionar um novo produto.
novo-usuario: Página para registrar um novo usuário.
Componentes
Todos os componentes visuais são declarados nesta pasta. Botões, checkboxes, inputs, etc. Também são declarados componentes responsáveis por "behavior", mesmo sem ter uma interface, como o caso do FormContainer, que encapsula comportamentos de formulário vindos do Formik para todos os filhos que forem passados como props.

## Componentes:
Header: Cabeçalho do site, inclui navegação.
SideBar: Barra lateral para navegação adicional.
Container: Componente de centralização de conteúdo.
Input: Componente de input, para futura implementação de pesquisa de item.
ProductCard: Componente que exibe os cards de cada produto na página inicial.
CarDetails: Componente que, ao clicar no card, mostra mais informações sobre o item, incluindo a opção de compra.
CardsPedidos: Componente que exibe no carrinho de compras todos os pedidos.
Utils/Modules
Para facilitar uma possível migração de dependências, todas as dependências são declaradas no arquivo de módulos e depois importadas apontando para este arquivo.

## Gerador de Páginas e Componentes
Para facilitar a criação de novas páginas e componentes, temos um gerador que cria a estrutura de pasta e arquivos necessários.

## Para gerar uma Página:

```bash
npm run generate:page
```

## Para gerar um Componente:

```bash
npm run generate:component
```
## Commits
Os commits devem seguir o seguinte padrão: <type>(scope): <description>

Sendo que os types podem ser os seguintes:

feat: Uma nova feature.
fix: Correção de um bug.
chore: Uma alteração que não é nem uma nova feature, nem uma correção.


# Projeto Backend Ecommerce PEGASUS com NestJS #
## O que está incluso:

    NestJS
    Mongoose (para integração com MongoDB)
    Swagger (para documentação de APIs)
    JWT (para autenticação)

## Instalação & Inicialização
Para instalar as dependências e iniciar o servidor, basta rodar na raiz do projeto:

```bash
npm install
npm run start:dev
``` 

## Arquitetura, Dependências Core:
São as principais dependências do projeto, que precisam ser compreendidas pelo menos minimamente para entender como esta arquitetura funciona.

    NestJS: Um framework para criar aplicações Node.js escaláveis e eficientes.
    Mongoose: Uma biblioteca de modelagem de dados para MongoDB e Node.js.
    Swagger: Ferramenta para documentar APIs RESTful.
    JWT: JSON Web Token, utilizado para autenticação segura.

# Módulos #
Os módulos representam as principais áreas de funcionalidade da aplicação. Cada módulo é responsável por uma parte específica do sistema e inclui seus próprios controladores, serviços e esquemas.

## Catalog
Responsável pela gestão dos itens do catálogo de produtos.

## - Controlador (controllers/catalog.controller.ts)
    create: Cria novos itens no catálogo.
    findAll: Recupera todos os itens do catálogo.
    findOne: Recupera um item específico do catálogo pelo ID.
    update: Atualiza um item específico do catálogo pelo ID.
    remove: Remove um item específico do catálogo pelo ID.

## - Serviço (services/catalog.service.ts)
    create: Lida com a lógica de criação de novos itens no catálogo.
    findAll: Lida com a lógica de recuperação de todos os itens do catálogo.
    findOne: Lida com a lógica de recuperação de um item específico do catálogo.
    update: Lida com a lógica de atualização de um item específico do catálogo.
    delete: Lida com a lógica de remoção de um item específico do catálogo.

## - Esquema (schemas/catalog.schema.ts)
Define a estrutura dos documentos no MongoDB para o catálogo de produtos. Inclui validações e transformação de dados.

## - DTOs (dtos/create.catalog.dto.ts e dtos/update.catalog.dto.ts)
Define a estrutura dos dados esperados ao criar ou atualizar itens do catálogo.

## - Repositório (repositories/catalog.repository.ts)
Interage diretamente com o MongoDB para realizar operações de CRUD.

## - Casos de Uso (use-cases/find-catalog.usercase.ts e use-cases/manage-catalog.usecase.ts)
Define a lógica de negócio específica para encontrar e gerenciar itens do catálogo.

# Outras Dependências e Configurações #

## Configuração do MongoDB
A conexão com o MongoDB é configurada através do MongooseModule no arquivo de módulo principal (app.module.ts). A string de conexão pode ser configurada no mesmo arquivo.

## Autenticação e Autorização
Utiliza-se JWT para autenticação. O AuthGuard protege as rotas que requerem autenticação. As rotas protegidas são marcadas com @UseGuards(AuthGuard).

## Swagger
A documentação das APIs é gerada automaticamente pelo Swagger. Para acessar a documentação, inicie o servidor e navegue até http://localhost:3000/api.

## Estrutura dos Módulos
Cada módulo segue uma estrutura semelhante:

    Controller: Gerencia as requisições HTTP e retorna as respostas adequadas.
    Service: Contém a lógica de negócios.
    Repository: Interage com o banco de dados.
    Schema: Define a estrutura dos dados.
    DTOs: Define a estrutura dos dados recebidos nas requisições.
    Use Cases: Define casos de uso específicos para operações mais complexas.

Exemplo de Estrutura de Módulo: Catalog

    controllers/catalog.controller.ts: Controlador principal para o catálogo.
    services/catalog.service.ts: Serviço principal para o catálogo.
    schemas/catalog.schema.ts: Esquema Mongoose para o catálogo.
    dtos/create.catalog.dto.ts: DTO para criação de itens do catálogo.
    dtos/update.catalog.dto.ts: DTO para atualização de itens do catálogo.
    repositories/catalog.repository.ts: Repositório para operações de CRUD no catálogo.
    use-cases/find-catalog.usercase.ts: Caso de uso para encontrar itens no catálogo.
    use-cases/manage-catalog.usecase.ts: Caso de uso para gerenciar itens no catálogo.


# Critérios de avaliação: #

## 1. Definição Clara dos Modelos

Os modelos estão bem definidos nos arquivos de esquema (*.schema.ts) usando o Mongoose. Cada modelo (Catalog, User, ShoppingCart) define claramente os atributos necessários, tipos de dados e validações através de decorators do Mongoose e do Swagger (@nestjs/swagger).


## 2. Separação da Lógica de Negócios

A lógica de negócios está separada nos arquivos de serviço (*.service.ts) e nos casos de uso (usecases/). Os controladores (controllers/*.controller.ts) lidam apenas com a interação HTTP e delegam a lógica de negócios aos serviços. Não há lógica de negócios nos controladores.


## 3. Tratamento de Respostas

As respostas das APIs são tratadas de forma estruturada e amigável. Utiliza-se o Swagger para documentação explícita das respostas esperadas (@ApiResponse, @ApiBadRequestResponse, @ApiNotFoundResponse, @ApiInternalServerErrorResponse).


## 4. Serializers

O processo de serialização é tratado de maneira implícita pelo Mongoose ao definir os esquemas (CatalogSchema, UserSchema, etc.). O Mongoose serializa automaticamente os objetos para JSON ao retorná-los nas respostas das APIs.


## 5. Clareza e Organização do Projeto Frontend (Next.js)

O projeto frontend utiliza Next.js com Tailwind CSS e next-icons. A estrutura das páginas é organizada em containers (index.js) que conectam com as stores e componentes responsáveis pela interface visual. Componentes reutilizáveis e comportamentais são organizados de forma clara em diretórios específicos.


## 6. Uso de Contexto no Frontend

O contexto no frontend é utilizado para gerenciar o estado global da aplicação, facilitando a passagem de dados entre componentes sem a necessidade de prop drilling. Isso melhora a manutenção e a escalabilidade do código.


## 7. Mecanismos de Autenticação

Implementa-se o mecanismo de autenticação usando @ApiBearerAuth(), @UseGuards(AuthGuard) nos controladores. O AuthGuard implementa a lógica de autenticação JWT, protegendo as rotas relevantes.


## 8. Controle de Acesso

O controle de acesso é implementado através de AuthGuard e roles específicas nos módulos, garantindo que apenas usuários autorizados possam acessar recursos protegidos.


## 9. Configuração e Conexão com o MongoDB

A configuração e a conexão com o MongoDB são gerenciadas pelo Mongoose, utilizando MongooseModule do NestJS nos módulos relevantes (imports e exports).


## 10. Operações CRUD

As operações CRUD são eficientes e corretas, implementadas nos serviços e repositórios (Repository) de cada entidade (Catalog, User, ShoppingCart). Utiliza-se métodos do Mongoose como find, findOne, findByIdAndUpdate, deleteOne para operações de leitura e modificação.


## 11. Tratamento de Exceções

As exceções são tratadas de maneira apropriada nos serviços e controladores, utilizando HttpException para erros HTTP e exceções específicas (NotFoundException, InternalServerErrorException) para erros de negócio e validação.


## 12. Estrutura e Organização do Repositório

O repositório foi estruturado de maneira organizada e dividida em duas branches principais: uma para o backend e outra para o frontend, seguindo boas práticas de desenvolvimento. 


## 13. Documentação e Commits

Os commits seguem um padrão claro que ajuda na compreensão das mudanças realizadas no código. Utiliza-se o seguinte formato: <type>(scope): <description>, onde type pode ser feat, fix, docs, build, refactor, entre outros. Isso facilita o rastreamento de alterações e a manutenção do histórico do projeto.


## 14. Uso de Repository com MongoDB

O uso de repositórios (Repository) com o MongoDB é efetuado através do Mongoose, abstraindo as operações de banco de dados e encapsulando a lógica de persistência.

# 14. Uso de Repository com MongoDB

O uso de repositórios (Repository) com o MongoDB é efetuado através do Mongoose, abstraindo as operações de banco de dados e encapsulando a lógica de persistência.
