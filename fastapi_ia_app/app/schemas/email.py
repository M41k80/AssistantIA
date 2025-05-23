from pydantic import BaseModel

class EmailRequest(BaseModel):
    nombre_negocio: str
    producto: str
    objetivo: str
    tono: str
    publico_objetivo: str
