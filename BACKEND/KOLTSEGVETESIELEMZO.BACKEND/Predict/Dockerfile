# Base image
FROM python:3.10-slim

# Working directory
WORKDIR /app
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["gunicorn", "-b", "0.0.0.0:5002", "main:app"]