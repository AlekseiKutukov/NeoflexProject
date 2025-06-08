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
-
-
- GIT команды
  1. git flow feature start module_1 создать и переключиться на ветку
  2. делаю комиты
  3. git push origin feature/module_1 для оценки куратора?
  4. git flow feature finish module_1 делаю я или куратор?
-
-
- Вопросы куратору:
  Привет сделал следующее установил vite + react + ts + eslint + Git-flow + react-router-dom
  Создал репозитарий https://github.com/AlekseiKutukov/NeoflexProject
  Сразу оговорюсь на ts ничего не делал, поэтому указывай что явно не так.

  Вопросы:

  1. Как давать ответ на задание по проекту (что писать в neostudy)
  2. Как я понимаю я должен как то расшарить права на гит для тебя? или что? как ты будешь принимать Pull Request?
  3. Нужно ли ипользовать ридакс? если да то что там хранить?

-
-
-
-
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
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
