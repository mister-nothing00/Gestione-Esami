from pydantic import BaseModel

# --- PARTE DEL CORPO ----------------------------------
class ParteDelCorpo(BaseModel):
    id:   int
    nome: str

    class Config:
        from_attributes = True  


# ---AMBULATORIO ---------------------------------------
class Ambulatorio(BaseModel):
    id:   int
    nome: str

    class Config:
        from_attributes = True


# --- ESAME --------------------------------------------
class Esame(BaseModel):
    id:                  int
    codice_ministeriale: str
    codice_interno:      str
    descrizione_esame:   str
    parte_del_corpo_id:  int

    class Config:
        from_attributes = True


# --- ESAME DETTAGLIATO (con oggetti annidati) ----------------------
class EsameDettagliato(Esame):
    parte_del_corpo: ParteDelCorpo
    ambulatori:      list[Ambulatorio] = []