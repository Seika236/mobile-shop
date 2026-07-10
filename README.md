# 🛍️ ShopApp

> Современное мобильное e-commerce приложение на **React Native + Expo**  
> с модульной архитектурой, защищёнными маршрутами и красивым UI.

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NativeWind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="NativeWind" />
  <img src="https://img.shields.io/badge/Expo_Router-6-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo Router" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
</p>

---

## ✨ О проекте

**ShopApp** — клиентское мобильное приложение интернет-магазина.  
Пользователь может просматривать каталог, искать товары, добавлять их в избранное и корзину, а также управлять профилем.

Приложение построено на **feature-based (modular)** архитектуре:  
каждая бизнес-фича изолирована в отдельном модуле со своими UI, сервисами и типами.

---

## 🚀 Основные возможности

| Раздел | Описание |
|--------|----------|
| 🏠 **Home** | Главный экран с подборками и каталогом |
| 🔍 **Search** | Поиск товаров |
| ❤️ **Favorites** | Список избранных товаров |
| 🛒 **Cart** | Корзина и управление количеством |
| 💳 **Stripe Checkout** | Оплата через Stripe React Native |
| 👤 **Profile** | Профиль пользователя |
| 🔐 **Auth** | Авторизация и регистрация |
| 📦 **Category / Item** | Страницы категорий и карточки товара |
| 🛡️ **Protected routes** | Разделение public / protected зон |
| 🔔 **Toasts** | Уведомления через `react-native-toast-message` |


## 🚀 Инструкция по запуску


1. Клонируй репозиторий
````
git clone <your-repo-url>
cd my-app
````
---
2. Установи зависимости
````
npm install
````
---
3. Создай .env в корне проекта
---
4. Запусти dev-сервер
````
npm run start
````
---