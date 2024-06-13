# Use a specific Python base image
FROM python:3.9-slim

WORKDIR /app

# Install dependencies first to leverage Docker caching
COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

EXPOSE 5000
CMD ["python", "app.py"]
