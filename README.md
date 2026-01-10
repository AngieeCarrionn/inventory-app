# Inventory App

Aplicación de inventario con clean architecture, compuesta por:

- **Backend**: Node.js + TypeScript + Express + MongoDB
- **Frontend**: Next.js 14 + TypeScript
- **Arquitectura**: Clean Architecture / DDD
- **Infra**: Docker + Docker Compose (opcional)

---

## 📦 Estructura del proyecto

inventory-app/
├── api/ # Backend (Node + Express)
├── web/ # Frontend (Next.js)
├── docker-compose.yml
└── README.md
---

## 🚀 Requisitos

- Node.js >= 18
- npm
- Docker (opcional, recomendado)
- MongoDB (local o Docker)

---

## ⚙️ Variables de entorno

### Backend (`api/.env`)

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/inventory
NODE_ENV=development


▶️ Correr el proyecto en local
1️⃣ Backend
cd api
npm install
npm run dev

API disponible en:

http://localhost:4000


2️⃣ Frontend
cd web
npm install
npm run dev


Frontend disponible en:

http://localhost:3000

🐳 Correr con Docker
docker-compose up --build
| Servicio | URL                                            |
| -------- | ---------------------------------------------- |
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend  | [http://localhost:4000](http://localhost:4000) |
| MongoDB  | localhost:27017                                |


🧠 Arquitectura 
Backend

domain/: entidades y reglas de negocio

application/: casos de uso

infrastructure/: repositorios, MongoDB

presentation/: controllers HTTP

Frontend

app/: rutas (Next App Router)

components/: componentes reutilizables (Button, Input, Table)

services/: llamadas a la API

types/: DTOs y contratos

lib/env.ts: configuración de entorno

## Uso de IA
Se utilizó IA como apoyo para:
- Diseño de arquitectura Clean Architecture
- Resolución de errores de TypeScript
- Definición de Dockerfiles y despliegue
- Revisión de buenas prácticas
- Documentación
