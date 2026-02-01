# NCFG Strapi CMS

Headless CMS для управления контентом сайта НЦФГ.

## Быстрый старт

### 1. Установка зависимостей

```bash
cd apps/cms
npm install
```

### 2. Запуск в режиме разработки

```bash
npm run develop
```

CMS будет доступна по адресу: http://localhost:1337

### 3. Первоначальная настройка

1. Откройте http://localhost:1337/admin
2. Создайте администратора (email, пароль)
3. Перейдите в Settings → API Tokens
4. Создайте новый токен с правами на чтение (Read)
5. Скопируйте токен в `scripts/.env` и `web/.env.local`

## Миграция данных

После создания API-токена запустите скрипт миграции:

```bash
cd scripts
npm install
npm run migrate
```

## Структура контента

### Collection Types

- **Tag** - теги для новостей
- **News Article** - новостные статьи
- **Service Category** - категории услуг
- **Service** - услуги
- **Person** - команда и эксперты

### Компоненты

**Shared:**
- `text-item` - текстовый элемент для списков
- `call-to-action` - CTA кнопка

**Service:**
- `service-facts` - факты об услуге
- `methodology-item` - элемент методологии
- `service-example` - пример услуги
- `product-item` - продукт в рамках услуги

**Person:**
- `team-info` - информация о позиции в команде
- `expert-profile` - профиль эксперта
- `expert-metrics` - метрики эксперта

## API Endpoints

После настройки прав доступа:

```
GET /api/tags
GET /api/news-articles
GET /api/news-articles/:documentId
GET /api/service-categories?populate=services
GET /api/services
GET /api/people
```

## Переменные окружения

```env
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=better-sqlite3
DATABASE_FILENAME=.tmp/data.db

# Secrets (обязательно изменить в production)
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
```

## Продакшен

Для продакшена рекомендуется:
- Использовать PostgreSQL вместо SQLite
- Настроить S3 или Cloudinary для медиафайлов
- Изменить все секретные ключи
- Настроить CORS для продакшен-домена
