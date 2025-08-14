# React + TypeScript + Vite

ЗАПУСК DOCKER:
cd NeoFlex/project/Backend
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
Zustand
zustand/middleware синхронизирует состояние с хранилищем

- ЗАПУСК:
  npm run dev
  docker compose up --build

- СБОРКА И ОТПРАВКА НА GH PAGES
  npm run build
  npm run deploy

-

- Добавь после
  TanStack Query

Module 3

1. Реализована отправка email, для подписки на новости (значение хранится в LocalStorage)
2. При клике на кнопку "Apply for card", происходит плавное перемещение к форме.
3. Cозданы компоненты: Tabs, Divider(полоса разделитель), Tooltip подсказки в credit card, Loader(Спиннер), Accordion сворачивание faq,
4. Для работы с формами использована библиотека Formik.

Module 4

1. Установлен Zustand, zustand/middleware
   1.1. Выводится 4 кредитных предложения, сохранены в localStore и синхронизированы с store,После выбора одного из предложений идёт отправка данных на application/apply
2. ТУТ ВСЕ ПОСМОТРИ ЕЩЕ РАЗ В КОНЦЕ
   -не теряется текущий шаг заявки (ПОЗЖЕ ПРОВЕРЬ)
   -пользователь может проходить этапы только по своей заявке (applicationId)
   -
3. Добавлена страница loan/{applicationId} с формой Scoring

- Основныe breakpoint:
  @media (max-width: 1330px)
  @media (max-width: 920px)
  @media (max-width: 500px)
