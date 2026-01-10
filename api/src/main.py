import os
import sys

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from src.api.models import HealthCheck

DEBUG = os.getenv("DEBUG", None) is not None

app = FastAPI(debug=DEBUG)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get(
    "/health",
    tags=["healthcheck"],
    summary="Perform a health check on the API",
    response_description="Return HTTP 200 (OK) if the API is healthy and python version",
    status_code=status.HTTP_200_OK,
    response_model=HealthCheck,
)
def get_health() -> HealthCheck:
    return HealthCheck(status="OK", python_version=sys.version)