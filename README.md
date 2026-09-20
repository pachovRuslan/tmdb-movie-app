# TMDB Movie App

Веб-приложение для поиска и просмотра информации о фильмах на основе TMDB API.

🔗 [Демо на Vercel](https://tmdb-movie-app-blue.vercel.app/)

## Стек
- React + TypeScript
- Redux Toolkit (slice + RTK Query)
- React Router
- CSS Modules
- Material UI
- Zod (валидация ответов API)

## Функциональность
- Главная страница со случайным backdrop и блоками категорий (Popular, Top Rated, Upcoming, Now Playing)
- Страница категорий с пагинацией
- Страница фильтрации по жанрам и рейтингу с сортировкой
- Поиск фильмов по названию
- Избранное (хранится в localStorage)
- Детальная страница фильма (актёры, похожие фильмы)
- Тёмная/светлая тема
- Обработка ошибок (network, 401, 404) с toast-уведомлениями
- Skeleton-загрузчики и LinearProgress

## Запуск локально

\`\`\`bash
pnpm install
\`\`\`

Создай файл `.env` в корне проекта:

\`\`\`
VITE_TMDB_TOKEN=your_tmdb_read_access_token
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
\`\`\`

\`\`\`bash
pnpm dev
\`\`\`