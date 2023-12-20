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
- Java Development Kit (choco install microsoft-openjdk17)
- Android Studio (para desenvolvimento Android)
- Ter a Virtualização ativada na BIOS.

### Configuração
Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the `Android 13 (Tiramisu)` entry, then make sure the following items are checked:

- Android SDK Platform 33
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the Android SDK Build-Tools entry, then make sure that `33.0.0` is selected.

```
cd mobile
npm install
```

#### Para Android:
- Abrir o "mobile" no Android Studio;
- Criar um "Pixel 7" com o Tiramisu 13 (SDK 33) em cima à direita onde diz "Virtual Device Manager".
- Ir a para "File" e depois "Project Structure" e selecionar o SDK 33. Se nao encontrar, clicar em "Browse" e selecionar a pasta "<user>/Appdata/Local/Android/Sdk" e ele irá encontrar e aí selecionar o 33.
- Correr o comando: `npx react-native doctor` e se houver algum erro clicar no "f".
- Mesmo que dê algum erro nesta etapa, reiniciar o Android Studio e iniciar a aplicação.
- Algum erro específico: procurar na net.

```
npm run android
```

#### Para iOS (apenas em macOS):
```
npm run ios
```
