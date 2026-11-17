# Healora AI service - production container
# Runs the FastAPI app; used by Render / Railway / Hugging Face Spaces / Fly.
FROM python:3.12-slim

WORKDIR /app

# Layer-cache deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Render/Railway/Spaces inject $PORT; default 8000 locally
ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
