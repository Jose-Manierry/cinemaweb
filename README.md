# CRUD de Cinema com React

Este é um projeto de um sistema de CRUD (Create, Read, Update, Delete) para gerenciar um cinema, desenvolvido com React e outras tecnologias modernas de front-end. O projeto permite gerenciar filmes, salas, sessões e ingressos.

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

### Front-end
- **React 19:** Biblioteca para construção de interfaces de usuário.
- **Vite:** Ferramenta de build moderna e rápida para desenvolvimento web.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **React Router 7:** Para gerenciamento de rotas na aplicação.
- **Bootstrap 5:** Framework CSS para estilização e responsividade.
- **Axios:** Cliente HTTP para realizar requisições à API.
- **Zod:** Para validação de esquemas e dados.

### Back-end (Mock)
- **JSON Server:** Para simular uma API REST a partir de um arquivo `db.json`.

## Começando

Siga as instruções abaixo para clonar, instalar e rodar o projeto em sua máquina local.

### Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) (que inclui o npm) instalado em sua máquina.

### Clonagem e Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd crud-react-main/frontend
    ```

3.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

## Rodando a Aplicação

Para rodar a aplicação, você precisará de dois terminais: um para o back-end (JSON Server) e outro para o front-end (Vite).

### 1. Rodando o Back-end

No primeiro terminal, inicie o servidor da API com o seguinte comando:

```bash
npm run server
```

Este comando iniciará o `json-server` na porta 4000, que servirá os dados do arquivo `db.json`. O servidor também observará as mudanças no arquivo `db.json` (hot-reloading).

### 2. Rodando o Front-end

No segundo terminal, inicie o servidor de desenvolvimento do front-end com o seguinte comando:

```bash
npm run dev
```

Este comando iniciará o servidor de desenvolvimento do Vite, geralmente na porta 5173. Abra o seu navegador e acesse o endereço `http://localhost:5173` para ver a aplicação em funcionamento.

## Scripts Disponíveis

No `package.json`, você encontrará outros scripts úteis:

-   `npm run build`: Compila a aplicação para produção.
-   `npm run lint`: Executa o linter para verificar a qualidade do código.
-   `npm run preview`: Inicia um servidor local para visualizar a versão de produção da aplicação.