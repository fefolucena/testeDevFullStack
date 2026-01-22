# testeDevFullStack
Teste técnico para vaga de desenvolvedor fullstack pleno

# Estrutura do projeto
testeDevFullStack/

├── backend/ # API em Laravel com banco SQLite

└── frontend/ # Aplicação React

# Pré-requisitos para rodar o projeto
Para rodar o projeto localmente, é necessário ter instalado:

- PHP (>= 7.4)
- Composer
- Node.js (>= 18 recomendado)
- NPM ou Yarn

# Usuários padrão:
Login: admin@teste.com | Senha: 123456

Login: moderador@teste.com | Senha: 123456

Login: leitor@teste.com | Senha: 123456

# Backend
## 1- Acessar a pasta "testeDevFullStack/backend"

## 2- Instalar as dependências
Rode o seguinte comando no terminal:
composer install

## 3- Configurar o ambiente
Copie o arquivo .env.example para .env e ajuste as configurações do banco de dados

DB_CONNECTION=sqlite
DB_DATABASE=pasta_do_seu_projeto/testeDevFullStack/backend/database/database.sqlite

Obs: O banco SQLite é um arquivo local, facilitando a execução do projeto.

⚠️ Importante: crie manualmente o arquivo `database.sqlite` dentro da pasta `backend/database` antes de rodar as migrations.

## 4- Gerar a chave da aplicação
Rode o seguinte comando no terminal:
php artisan key:generate

## 5- Rodar as migrations
Rode o seguinte comando no terminal:
php artisan migrate

## 6- Subir os usuários de teste via Seeders
Rode o seguinte comando no terminal:
php artisan db:seed

## 7- Subir o servidor
Rode o seguinte comando no terminal:
php artisan serve

e a API ficará disponível em http://127.0.0.1:8000

# Frontend
## 1- Acessar a pasta "testeDevFullStack/frontend"

## 2- Instalar as dependências
Rode o seguinte comando no terminal: 
npm install

## 3- Subir a aplicação
Rode o seguinte comando no terminal:
npm start

e a aplicação ficará disponível em http://localhost:3000 

# Observações
1- Algumas IDEs podem apontar warning no método createToken(), por se tratar de método provido via trait do Laravel Sanctum. A aplicação funciona corretamente.	