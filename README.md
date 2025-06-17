# 🎬 Sistema de Gestão de Cinema

Um projeto full-stack de sistema de gestão de cinema, desenvolvido para simular as operações do mundo real, desde o cadastro de filmes e salas até a venda de ingressos com seleção de assentos.

## ✨ Funcionalidades Principais

O sistema atualmente suporta as seguintes funcionalidades:

  * **Gestão de Filmes:**
      * Cadastro, edição, exclusão e listagem de filmes.
      * Upload de imagens de cartazes.
  * **Gestão de Salas:**
      * Cadastro, edição, exclusão e listagem de salas de cinema, com definição de capacidade e tipo.
  * **Gestão de Sessões:**
      * Criação de sessões vinculando um filme a uma sala em uma data e horário específicos.
      * Definição de preço, idioma e formato (2D/3D).
  * **Vitrine para Clientes:**
      * Página "Em Cartaz" que lista todas as sessões disponíveis para o público.
  * **Venda de Ingressos:**
      * Página interativa para venda de ingressos.
      * Mapa de assentos visual que mostra cadeiras disponíveis, ocupadas e selecionadas em tempo real.
      * Lógica de "compra" que salva os ingressos no banco de dados e atualiza a disponibilidade dos assentos.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com uma arquitetura moderna e robusta, separando claramente as responsabilidades entre o backend e o frontend.

### **Backend**

  * **[NestJS](https://nestjs.com/):** Um framework Node.js progressivo para construir aplicações eficientes e escaláveis.
  * **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript que adiciona tipagem estática.
  * **[Prisma](https://www.prisma.io/):** ORM (Object-Relational Mapper) de última geração para interagir com o banco de dados.
  * **[PostgreSQL](https://www.postgresql.org/):** Um poderoso sistema de banco de dados relacional de código aberto.

### **Frontend**

  * **[React](https://reactjs.org/):** Biblioteca JavaScript para construir interfaces de usuário.
  * **[Vite](https://vitejs.dev/):** Ferramenta de build moderna que oferece uma experiência de desenvolvimento extremamente rápida.
  * **[TypeScript](https://www.typescriptlang.org/):** Consistência de linguagem em todo o projeto.
  * **[React Router](https://reactrouter.com/):** Para gerenciamento de rotas na aplicação (SPA).
  * **[Axios](https://axios-http.com/):** Cliente HTTP para fazer requisições à nossa API backend.
  * **[React Toastify](https://fkhadra.github.io/react-toastify/introduction):** Para exibir notificações de sucesso e erro.

### **Ambiente**

  * **[Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/):** Para criar um ambiente de desenvolvimento containerizado, garantindo que a aplicação rode de forma consistente em qualquer máquina.
  * **[Nginx](https://www.nginx.com/):** Servidor web de alta performance usado para servir a aplicação React de produção.

## 🚀 Como Executar o Projeto

Para executar este projeto localmente, você precisará ter o [Docker](https://www.docker.com/products/docker-desktop/) e o Docker Compose instalados.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Crie o arquivo de variáveis de ambiente para o backend:**

      * Navegue até a pasta `backend`.
      * Crie um arquivo chamado `.env`.
      * Adicione o seguinte conteúdo a ele:
        ```env
        DATABASE_URL="postgresql://user:password@db:5432/cinema_db?schema=public"
        ```

3.  **Construa e inicie os contêineres:**

      * Volte para a pasta raiz do projeto.
      * Execute o seguinte comando. Na primeira vez, ele pode demorar um pouco para baixar as imagens e construir o projeto.
        ```bash
        docker-compose up --build
        ```

4.  **Acesse a aplicação:**

      * **Frontend:** Abra seu navegador e acesse `http://localhost:5174` (ou a porta que você configurou).
      * **Backend API:** A API estará disponível em `http://localhost:3000`.
      * **Banco de Dados (Adminer):** Você pode visualizar o banco de dados acessando `http://localhost:8080`.
