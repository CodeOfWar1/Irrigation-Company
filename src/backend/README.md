# MLD Backend

Node.js server for admin portfolio uploads. Saves images to `src/images/UploadImg` and serves them at `/uploads`.

## Setup

```bash
cd src/backend
npm install
```

## Run

```bash
npm start
```

Server runs at **http://localhost:4000** (or set `PORT` in env).

## Routes

- **POST /createproject**  
  - Body: `multipart/form-data`  
  - Fields: `name`, `sector`, `description` (optional), `images` (one or more image files)  
  - Saves files to `src/images/UploadImg` and returns `{ success, project: { name, sector, imageUrls, ... } }`.

- **GET /uploads/:filename**  
  - Serves uploaded images (used as image URLs in the portfolio).

## Env (optional)

- `PORT` – server port (default 4000)
- `BASE_URL` – public base URL for image links (default: `http://localhost:4000`)

Frontend expects the backend at `VITE_BACKEND_URL` (default `http://localhost:4000`). Set this in production to your deployed backend URL.
