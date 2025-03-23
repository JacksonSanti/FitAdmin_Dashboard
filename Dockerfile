FROM python:3.9-slim

WORKDIR /front

COPY requirements.txt /front/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "run.py"]
