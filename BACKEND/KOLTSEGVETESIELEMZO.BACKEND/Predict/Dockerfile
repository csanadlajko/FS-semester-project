# Base image
FROM python:3.10-slim

# Working directory
WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r BACKEND/KOLTSEGVETESIELEMZO.BACKEND/Predict/requirements.txt

EXPOSE 5000

CMD ["python", "BACKEND/KOLTSEGVETESIELEMZO.BACKEND/Predict/main.py"]