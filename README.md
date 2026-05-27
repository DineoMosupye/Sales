# EB Sales Portal (React + Express + MongoDB)

Production-structured full-stack app implementing the required flows:

- Request Quote (Know / Don't Know flow)
- Seal Type selection
- Confirmation before quote submission
- Technician booking
- Dashboard with follow-up and mark complete actions

## Project Structure

- `frontend/` - React + Vite UI
- `backend/` - Node.js + Express API + MongoDB + Nodemailer

## 1) Backend Setup

```bash
cd backend
cp .env.example .env
```

Fill in `.env` values:

- `MONGODB_URI`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`

Run backend:

```bash
npm install
npm run dev
```

Server runs on `http://localhost:5000`.

## 2) Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Endpoints

- `POST /api/quote`
- `POST /api/technician`
- `GET /api/requests`
- `PUT /api/request/:id`

## Notes

- Quote requests dynamically route to selected admin/engineer email.
- Technician requests route to "Technichian email"
- Follow Up action resends the request email.
- Mark Complete updates request status in MongoDB.
