# React + TypeScript + Vite

ЗАПУСК DOCKER:
cd project/neoflex/project
docker compose up --build
docker ps проверка запуска
http://localhost:8080/swagger-ui/index.html

Использовано:
Vite
React
TS
ESLint
Git-flow
formik

- ЗАПУСК:
  npm run dev
  docker compose up --build

- СБОРКА И ОТПРАВКА НА GH PAGES
  npm run build
  npm run deploy

-

- Добавь после
  TanStack Query
-

Module 3

1. Реализована отправка email, для подписки на новости (значение хранится в LocalStorage)
2. При клике на кнопку "Apply for card", происходит плавное перемещение к форме.
3. Cозданы компоненты: Tabs, Divider(полоса разделитель), Tooltip подсказки в credit card, Loader(Спиннер), Accordion сворачивание faq,
4. Для работы с формами использована библиотека Formik.

-
- -Основныe breakpoint

@media (max-width: 1330px) {
}

/_ ----- Tablet ----- _/

@media (max-width: 920px) {
}

/_ ----- Mobile ----- _/

@media (max-width: 500px) {
}
