# Projeto Laravel e React Native

Este repositório contém a implementação de uma aplicação Laravel na pasta `/api` e uma aplicação React Native na pasta `/mobile`.

Temos 3 Tópicos:
- MySQL | Database
- Laravel | API
- React Native | Mobile App


## MySQL Database

### Requisitos
- MySQL Server
- MySQL Workbench

Criar um servidor no MySQL Server com o nome: Grupo2, username: root e pass:(o que quiserem)

Iniciar o servidor (basta abrir)

Importar o ficheiro .sql que estará disponível no root deste projeto.

## Laravel API

### Requisitos
Recomendo utilizar o *chocolatey* para instalação de grande parte dos requisitos que vamos usar, vai estar indicado os comandos na consola a executar, como administrador.
- PHP (choco install php)
- Composer (choco install composer)
- Ngrok (choco install ngrok)

NECESSÁRIO: Ativar extensões no php.ini (remover o ";") 
- extension=curl 
- extension=fileinfo 
- extension=openssl 
- extension=pdo_mysql 
- extension=zip

### Configuração
Navegue até a pasta `/api`:
```
cd api
```

Instale as dependências do Composer:
```
composer install
```

Copie o arquivo de configuração:
```
cp .env.example .env
```
Configure o arquivo .env com suas credenciais de banco de dados e outras configurações necessárias.

Inicie o servidor Laravel:
```
php artisan serve
```

Executar o seguinte comando no Ngrok:
```
ngrok http 8000
```
A API Laravel estará disponível aqui!

Copiar o link para o api.js no /mobile:

## React Native App

### Requisitos
- Node.js (choco install nodejs-lts)
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS, disponível apenas no macOS)

### Configuração
```
cd mobile
npm install
```

#### Para Android:
```
npm run android
```

#### Para iOS (apenas em macOS):
```
npm run ios
```
