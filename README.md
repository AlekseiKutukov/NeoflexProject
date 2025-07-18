# React + TypeScript + Vite

ЗАПУСК DOCKER:
cd project/neoflex/project
docker compose up --build
docker ps проверка запуска
http://localhost:8080/swagger-ui/index.html

ts создает карточку до 10 минуты с помощью дженерика
https://www.youtube.com/watch?v=92qcfeWxtnY

Использовано:
Vite
React
TS
ESLint
Git-flow

- ЗАПУСК:
  npm run dev

- СБОРКА И ОТПРАВКА НА GH PAGES
  npm run build
  npm run deploy

-

- Добавь после
  TanStack Query
-
- GIT команды
  1. git flow feature start module_1 создать и переключиться на ветку
  2. делаю комиты
  3. git push origin feature/module_1 для оценки куратора?
  4. git flow feature finish module_1 делаю я или куратор?
-
-
- Вопросы куратору:

1. Спроси про комиты
2. Слишком разросшиеся это имеется в виду хоумпейдж, где большие секции вынести в отдельные компоненты?
3. По поводу бэм, это прописано в задание. эту часть можно игнорировать или не стоит?
4. Насколько критичны дедлайны
5. "Количество новостей не ограничено, но не меньше 20." так написано в задании но мне прилетает меньше?

-
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

2. Критерии принятия Pull Request:

   Использована БЭМ методология
   Правильное подключение шрифтов и CSS файлов
   Используется семантическая вёрстка
   Страница адаптивная (ничего не съезжает и не ломается)

-
-
-
-
-

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
