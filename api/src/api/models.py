from pydantic import BaseModel

class HealthCheck(BaseModel):
    status: str = "OK"
    python_version: str