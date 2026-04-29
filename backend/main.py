from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_

#Importazioni locali
from database import engine, get_db
import models, schemas
from config_loader import carica_configurazione, Predefiniti_Ricerca

models.Base.metadata.create_all(bind=engine)
carica_configurazione()

app = FastAPI(title="Nolex API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ambulatori", response_model=list[schemas.Ambulatorio], tags=["Ambulatori"])
def get_ambulatori(db: Session = Depends(get_db)):
    return db.query(models.Ambulatorio).order_by(models.Ambulatorio.nome).all()


@app.get("/ambulatori/{ambulatorio_id}/parti", response_model=list[schemas.ParteDelCorpo], tags=["Ambulatori"])
def get_parti(ambulatorio_id: int, db: Session = Depends(get_db)):
    amb = db.get(models.Ambulatorio, ambulatorio_id)
    if not amb:
        raise HTTPException(404, "Ambulatorio non trovato")
    parti_ids = {e.parte_del_corpo_id for e in amb.esami}
    return db.query(models.ParteDelCorpo).filter(models.ParteDelCorpo.id.in_(parti_ids)).order_by(models.ParteDelCorpo.nome).all()


@app.get("/ambulatori/{ambulatorio_id}/parti/{parte_id}/esami", response_model=list[schemas.Esame], tags=["Ambulatori"])
def get_esami(ambulatorio_id: int, parte_id: int, db: Session = Depends(get_db)):
    amb = db.get(models.Ambulatorio, ambulatorio_id)
    if not amb:
        raise HTTPException(404, "Ambulatorio non trovato")
    return [e for e in amb.esami if e.parte_del_corpo_id == parte_id]


@app.get("/esami/cerca", response_model=list[schemas.EsameDettagliato], tags=["Esami"])
def cerca_esami(
    q:    str = Query(default=Predefiniti_Ricerca.query_predefinita),
    tipo: str = Query(default=Predefiniti_Ricerca.tipo_predefinito),
    db:   Session = Depends(get_db),
):
    campo_map = {
        "codice_ministeriale": models.Esame.codice_ministeriale,
        "codice_interno":      models.Esame.codice_interno,
        "descrizione_esame":   models.Esame.descrizione_esame,
    }
    campo = campo_map.get(tipo, models.Esame.descrizione_esame)
    return db.query(models.Esame).filter(campo.ilike(f"%{q}%")).all()


@app.get("/config/defaults", tags=["Configurazione"])
def get_defaults():
    return {
        "query_predefinita": Predefiniti_Ricerca.query_predefinita,
        "tipo_predefinito":  Predefiniti_Ricerca.tipo_predefinito,
    }