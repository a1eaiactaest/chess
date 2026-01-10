import os
import sys

from fastapi import FastAPI

DEBUG = os.getenv("DEBUG", None) is not None

app = FastAPI(debug=DEBUG)

@app.get("/")
def read_root():
    return {"Hello": "World"}