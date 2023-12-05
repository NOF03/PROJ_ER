# Projeto Laravel e React Native

Este repositório contém a implementação de uma aplicação Laravel na pasta `/api` e uma aplicação React Native na pasta `/mobile`.

Temos 3 Tópicos:
- MySQL Database
- Laravel API
- React Native App


## MySQL Database

### Requisitos
- MySQL Server
- MySQL Workbench

Criar um servidor no MySQL Server com o nome: Grupo2, username: root e pass:(o que quiserem)

Iniciar o servidor (basta abrir)

Importar o ficheiro .sql que estará disponível no root deste projeto.

## Laravel API

### Requisitos
- PHP
- Composer
- Ngrok

### Configuração
Navegue até a pasta `/api`:
`cd api`

Instale as dependências do Composer:
`composer install`

Copie o arquivo de configuração:
`cp .env.example .env`
Configure o arquivo .env com suas credenciais de banco de dados e outras configurações necessárias.

Inicie o servidor Laravel:
`php artisan serve`

Executar o seguinte comando no Ngrok:
`ngrok http 8000`
A API Laravel estará disponível aqui!

Copiar o link para o api.js no /mobile:

## React Native App

### Requisitos
- Node.js
- npm
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS, disponível apenas no macOS)

### Configuração
```cd mobile
npm install
```

#### Para Android:
`npm run android`

#### Para iOS (apenas em macOS):
`npm run ios`
