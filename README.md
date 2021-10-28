## Локальная разработка

> Убедись, что установлен `docker`, `docker-compose`

## Запуск в докере (рекомендуется)

> Минусы способа, из-за особенности работы docker volumes, больше тратится батарея ноутбука, загружается процессор

```
npm install
npm run build
docker-compose build --no-cache
docker-compose up
```

<details>
  <summary> Запуск без докера:</summary>

> Минусы способа, требуется самостоятельно следить за корректной версией node.js, самостоятельный запуск

0. Версия node.js

```
node -v
v16.9.0

npm -v
7.22.0
```

1. Установить Postgres. Пользователь `postgres`, пароль: `root`.

2. В pgAdmin создать базу `deutsch`.

3. Установить зависимости

```
npm install
```

4. Запустить в режиме разработки

```
npm run start:dev
```

</details>
