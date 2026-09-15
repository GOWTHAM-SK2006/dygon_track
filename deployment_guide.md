# Production Deployment Guide: Railway & Supabase

This guide details how to deploy the **DYGON BUS TRACK** full-stack application (Next.js Frontend + Java Spring Boot Backend) using **Supabase** (PostgreSQL Database) and **Railway**.

---

## 1. Supabase Setup (PostgreSQL Database)

1. Sign in to [Supabase](https://supabase.com) and create a new project named `dygon-bus-track`.
2. Once the project is created, navigate to **Project Settings** → **Database**.
3. Under **Connection string**, select **JDBC** and copy your database parameters:
   - Host (e.g. `db.xxxx.supabase.co`)
   - Database name (usually `postgres`)
   - Database password
4. Your JDBC Connection URL will look like:
   ```env
   jdbc:postgresql://db.xxxx.supabase.co:5432/postgres?sslmode=require
   ```

---

## 2. Railway Backend Deployment (Java Spring Boot)

1. Sign in to [Railway.app](https://railway.app).
2. Click **+ New Project** → **Deploy from GitHub Repo**.
3. Select your repository and choose the `backend/` directory as the Root Directory (or add service from path `/backend`).
4. In Railway project settings for the Spring Boot service, add the following **Environment Variables**:
   ```env
   SPRING_PROFILES_ACTIVE=prod
   SPRING_DATASOURCE_URL=jdbc:postgresql://db.xxxx.supabase.co:5432/postgres?sslmode=require
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=your_supabase_password
   ```
5. Railway will automatically detect `backend/Dockerfile`, build the Java 21 jar using Maven, and deploy it.
6. Once deployed, Railway will generate a public domain URL for your backend, for example:
   ```text
   https://dygon-backend-production.up.railway.app
   ```

---

## 3. Railway / Vercel Frontend Deployment (Next.js)

1. Create a new service on Railway (or [Vercel](https://vercel.com)).
2. Select your repository root directory `sai_bus`.
3. Add the following **Environment Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://dygon-backend-production.up.railway.app/api
   NEXT_PUBLIC_WS_URL=wss://dygon-backend-production.up.railway.app/ws-bus/websocket
   ```
4. Click **Deploy**. Your Next.js web application will be live at your domain!

---

## 📁 Summary of Created Deployment Manifests:
- `backend/pom.xml`: Includes `org.postgresql:postgresql` driver dependency.
- `backend/src/main/resources/application-prod.properties`: Production PostgreSQL and dynamic `$PORT` configuration.
- `backend/Dockerfile`: Multi-stage Docker build for Java 21 Spring Boot.
- `backend/railway.json`: Railway service manifest for Spring Boot.
- `Dockerfile`: Production Node 20 Next.js container configuration.
