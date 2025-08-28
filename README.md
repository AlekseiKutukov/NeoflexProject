# Прототип небольшого банка

[Открыть демо](https://alekseikutukov.github.io/NeoflexProject/)

## Использовано:

![Vite](https://img.shields.io/badge/Vite-FFD62E?style=flat-square&logo=vite)  
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)  
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)  
![Vitest](https://img.shields.io/badge/Vitest-68E0C1?style=flat-square&logo=vitest)  
Git-flow  
formik  
Zustand

## Запуск:

1. Клонировать репозиторий:  
   git clone git@github.com:AlekseiKutukov/NeoflexProject.git

2. Перейти в папку:  
   cd NeoflexProject

3. Установить зависимости:  
   npm install

4. Запустить dev-сервер:  
   npm run dev

5. Открыть в браузере:  
   http://localhost:5173/NeoflexProject/

## Что было сделано

**Module 1 - реализация главной страницы**

1. Создано React-приложение с использованием Vite и TypeScript.
2. Подключены и настроены Prettier и ESLint для проверки и форматирования кода.
3. Добавлен React Router для реализации роутинга.
4. Продумана структура приложения с учётом дальнейшего расширения.
5. Сверстана главная страница.
6. Реализована адаптивность под мобильные устройства.

**Module 2 - работа с базовыми концепциями языка js**

1. Подключен внешний API ([exchangerate-api.com](https://app.exchangerate-api.com/dashboard)) для получения актуального курса валют.
2. Подключен внешний API новостей ([NewsAPI](https://newsapi.org/)) ( на GH Pages не работает, ограничение API ).
3. Результаты фильтруются: исключая битые изображения и HTML-разметка в описаниях.
4. Реализован горизонтальный слайдер для новостей.
5. Кнопки пролистывания блокируются при достижении первой или последней карточки.

**Module 3 - реализация страницы loan**

1. Реализована отправка email, для подписки на новости (значение хранится в LocalStorage).
1. При клике на кнопку "Apply for card", происходит плавное перемещение к форме.
1. Cозданы компоненты: Tabs, Divider(полоса разделитель), Tooltip подсказки в credit card, Loader(Спиннер), Accordion сворачивание faq.
1. Для работы с формами использована библиотека Formik.

**Module 4 - добавление маршрутизации и бизнес логики**

1. Установлен Zustand, zustand/middleware.
2. Выводится 4 кредитных предложения, сохранены в localStore и синхронизированы с store, после выбора одного из предложений идёт отправка данных на application/apply.
3. Дополнительные требования:  
   -не теряется текущий шаг заявки  
   -пользователь может проходить этапы только по своей заявке (applicationId)  
   -пользователь не может переходить на следующий этап, пока не пройдёт текущий
4. Добавлена страница loan/{applicationId} с формой Scoring.
5. Добавлена страница loan/{applicationId}/document с таблицей.
6. Реализована сортировка столбцов таблицы.
7. Реализована возможность отказаться от заявки.
8. Добавлена страница loan/{applicationId}/document/sign.
9. Добавлена страница loan/{applicationId}/code.

**Module 5 - тестирование**

1. Покрытие кода тестами, проверка навыков тестрования приложения с помощью @testing-library/react

_В связи в использованием моксервера и backenda, часть проекта не посмотреть_
