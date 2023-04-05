## Description

Fullstack приложение, сделанное в ходе выполнения тестового задания.
При входе в приложение клиент попадает на странмцу авторизации. При отсутствии логина/пароля имеется возможность перейти на страницу регистрации, где клиент заполняет необходимые для регистрации реквизиты и по желанию подключает аватар. После прохождения аутентификации клиент попадает на страницу, на которой отображаются все зарегистрированные пользователи данного приложения (в т.ч. аватар).

Приложение состоит из 2 частей - клиентской и серверной.
Клиентская часть написана на фреймворке React.js 3 с применением Redux Toolkit в качестве глобального хранилища. Для обработки вводных форм был написан кастомный хук useInput, комбинирующий хранение данных как в глобальном, так и локальном хранилищах и попутно производящий валидацию данных (не соответствует первому принципу SOLID, но чертовски удобно). Для передачи запросов использовалась библиотека Axios.
Серверная часть написана на фреймворке Express.js.
Данные храняться в базе данных MongoDb, взаимодействие с базой данных производится с помощью Mongoose.
Приложение готово к использованию только на стадии development. Подготовка к переводу на production не проводилась.

## Installation

Для первичной установки приложения необходимо произвести следующие манипуляции:

1. Создать в MongoDB базу под названием 'basic-tech'. В файле .env каталога /server при необходимости поменять порт MongoDB в параметре BASE_URL

2. После скачивания файсов с репозитория, перейти в каталог "server":

```bash
$ cd ./server
```

3. Выполнить установку зависимостей командой:

```bash
$ npm install
```

4. Открыть еще один терминал. Перейти в каталог "client"

```bash
$ cd ./client
```

5. Выполнить установку зависимостей командой:

```bash
$ npm install
```

## Running the app

1. В каталоге "server" запустить команду:

```bash
$ npm run start
```

2. В каталоге "client" запустить команду:

```bash
$ npm run start
```

3. В браузере в поисковой строке ввести: http://localhost:3000