

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

ambulatorio_esame = Table(
    "ambulatorio_esame",
    Base.metadata,
    Column("ambulatorio_id", Integer, ForeignKey("ambulatori.id"), primary_key=True),
    Column("esame_id",       Integer, ForeignKey("esami.id"),       primary_key=True),
)

class Ambulatorio(Base):
    __tablename__ = "ambulatori"

    id   = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False, unique=True)
    esami = relationship("Esame", secondary=ambulatorio_esame, back_populates="ambulatori")
    piano = Column(String(10), nullable=True)
    attivo= Column(Boolean, default=True, nullable=True)

class ParteDelCorpo(Base):
    __tablename__ = "parti_del_corpo"

    id   = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False, unique=True)
    esami = relationship("Esame", back_populates="parte_del_corpo")


class Esame(Base):
    __tablename__ = "esami"

    id                  = Column(Integer, primary_key=True, index=True)
    codice_ministeriale = Column(String(10),  nullable=False)
    codice_interno      = Column(String(10),  nullable=False)
    descrizione_esame   = Column(String(100), nullable=False)

    parte_del_corpo_id = Column(Integer, ForeignKey("parti_del_corpo.id"), nullable=False)
    durata_minuti = Column(Integer, nullable=True)

    parte_del_corpo = relationship("ParteDelCorpo", back_populates="esami")
    ambulatori      = relationship("Ambulatorio", secondary=ambulatorio_esame, back_populates="esami")