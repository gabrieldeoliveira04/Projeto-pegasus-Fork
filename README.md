Escopo do Projeto: E-commerce para Loja de Carros
1. Introdução

    Visão Geral do Projeto: Desenvolvimento de uma plataforma de e-commerce para uma loja de carros, utilizando tecnologias modernas e práticas de desenvolvimento de software.
    Objetivos e Propósito do Sistema: Facilitar a compra e venda de carros, proporcionando uma experiência de usuário eficiente e segura.
    Benefícios Esperados do Projeto: Aumentar o conhecimento prático em desenvolvimento web, implementar um sistema funcional de e-commerce.

2. Visão Geral do Sistema

    Descrição do Sistema: Plataforma online para listar, pesquisar e comprar carros. Inclui funcionalidades para gestão de inventário e processos de pagamento simulados.
    Público-alvo do Sistema: Amantes de carros de luxo.
    Requisitos Funcionais e Não Funcionais:
        Funcionais: Gestão de usuários, catálogo de produtos, carrinho de compras, sistema de pagamento simulado, reviews e ratings.
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
        Processo de Pagamento: Simulação de pagamento, histórico de pedidos.
    
    Casos de Uso Principais:
        Registro e Autenticação
        Pesquisa e Filtro de Carros
        Gestão do Carrinho de Compras
        Processamento de Pagamento Simulado
        Submissão de Avaliações
    Fluxo de Trabalhos do Usuário:
        Navegação anônima ou autenticada
        Busca de carros
        Adição de carros ao carrinho
        Finalização da compra
        Avaliação e feedback

5. Requisitos Não Funcionais

    Desempenho Esperado do Sistema: Tempo de resposta inferior a 2 segundos para a maioria das operações.
    Segurança e Autenticação: Implementação de autenticação JWT básica, proteção de dados de usuário.
    Escalabilidade e Manutenibilidade: Suporte para ser facilmente compreendido e modificado por estudantes.

6. Tecnologias Utilizadas

    Linguagens de Programação: TypeScript.
    Frameworks e Ferramentas:
        Backend: Node.js, NestJS.
        Frontend: Angular.
    Banco de Dados: MongoDB.
    Ferramentas de Desenvolvimento: Visual Studio Code, Git.

7. Modelo de Dados

    Estrutura do Banco de Dados: Esquema baseado em coleções MongoDB.
    Relacionamentos entre Entidades:
        Usuário (informações pessoais)
        Carro (detalhes do veículo, preço, estoque)
        Pedido (itens, status, histórico)
    Esquema de Armazenamento: Coleções para usuários, carros, pedidos, avaliações.

8. Interfaces do Usuário

    Layout e Design das Interfaces: UI responsiva e intuitiva desenvolvida com Angular Material.
    Funcionalidades Específicas de Cada Tela:
        Home: Busca e listagem de carros.
        Detalhes do Carro: Informações detalhadas, avaliações.
        Carrinho: Listagem de itens no carrinho, resumo de preço.
        Checkout: Processo de pagamento simulado, confirmação de pedido.
        Perfil do Usuário: Dados pessoais, histórico de pedidos.
    Fluxos de Interação do Usuário: Navegação entre telas, confirmação de ações (ex: adição ao carrinho, pagamento).

9. Arquitetura de Implementação

    Organização do Código-fonte:
        Backend: Estrutura em módulos (ex: users, cars, orders).
        Frontend: Componentes Angular divididos por funcionalidades.
    Divisão em Módulos e Componentes:
        Módulos no NestJS para gerenciamento de usuários, carros, pedidos.
        Componentes Angular para interfaces de usuário.
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
    Atribuição de Tarefas e Responsabilidades: Equipe de desenvolvimento com papéis definidos (desenvolvedores, QA).
    Monitoramento do Progresso: Uso de ferramentas de gestão de projetos (ex: Jira, Trello).

13. Considerações de Segurança

    Mecanismos de Autenticação e Autorização: Implementação de JWT para autenticação.
    Proteção contra Vulnerabilidades: Validação de entrada, proteção contra ataques básicos.
    Auditoria e Registro de Atividades Sensíveis: Logs de ações de usuários.

14. Considerações de Manutenção

    Planos de Suporte Pós-implementação: Suporte limitado para correções durante o período do projeto.
    Processo de Correção de Bugs e Implementação de Melhorias: Sistema de tickets para bugs, atualizações regulares.
    Atualizações de Segurança e Software: Monitoramento contínuo, atualizações regulares de dependências.