from database import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

parti = [
    models.ParteDelCorpo(nome="Testa"),
    models.ParteDelCorpo(nome="Torace"),
    models.ParteDelCorpo(nome="Addome"),
    models.ParteDelCorpo(nome="Arti superiori"),
    models.ParteDelCorpo(nome="Arti inferiori"),
]
db.add_all(parti)
db.commit()

ambulatori = [
    models.Ambulatorio(nome="Radiologia"),
    models.Ambulatorio(nome="Tac1"),
    models.Ambulatorio(nome="Tac2"),
    models.Ambulatorio(nome="Risonanza"),
    models.Ambulatorio(nome="EcografiaPrivitera"),
    models.Ambulatorio(nome="EcografiaMassimino"),
    models.Ambulatorio(nome="EcografiaDoppler"),
]
db.add_all(ambulatori)
db.commit()

testa, torace, addome, arti_sup, arti_inf = parti
radio, tac1, tac2, riso, eco_p, eco_m, eco_d = ambulatori

esami = [
    models.Esame(codice_ministeriale="RM001", codice_interno="INT001", descrizione_esame="RMN cranio", parte_del_corpo=testa),
    models.Esame(codice_ministeriale="RX001", codice_interno="INT002", descrizione_esame="RX cranio", parte_del_corpo=testa),
    models.Esame(codice_ministeriale="TC001", codice_interno="INT003", descrizione_esame="TC cranio", parte_del_corpo=testa),
    models.Esame(codice_ministeriale="RX002", codice_interno="INT004", descrizione_esame="RX torace", parte_del_corpo=torace),
    models.Esame(codice_ministeriale="TC002", codice_interno="INT005", descrizione_esame="TC torace", parte_del_corpo=torace),
    models.Esame(codice_ministeriale="EC001", codice_interno="INT006", descrizione_esame="Eco addome", parte_del_corpo=addome),
    models.Esame(codice_ministeriale="TC003", codice_interno="INT007", descrizione_esame="TC addome", parte_del_corpo=addome),
    models.Esame(codice_ministeriale="RX003", codice_interno="INT008", descrizione_esame="RX mano Dx", parte_del_corpo=arti_sup),
    models.Esame(codice_ministeriale="RX004", codice_interno="INT009", descrizione_esame="RX spalla Dx", parte_del_corpo=arti_sup),
    models.Esame(codice_ministeriale="RX005", codice_interno="INT010", descrizione_esame="RX ginocchio Dx", parte_del_corpo=arti_inf),
]
db.add_all(esami)
db.commit()

rmn_cranio, rx_cranio, tc_cranio, rx_torace, tc_torace, eco_addome, tc_addome, rx_mano, rx_spalla, rx_ginocchio = esami

rmn_cranio.ambulatori  = [riso]
rx_cranio.ambulatori   = [radio]
tc_cranio.ambulatori   = [tac1, tac2]
rx_torace.ambulatori   = [radio]
tc_torace.ambulatori   = [tac1, tac2]
eco_addome.ambulatori  = [eco_p, eco_m]
tc_addome.ambulatori   = [tac1, tac2]
rx_mano.ambulatori     = [radio]
rx_spalla.ambulatori   = [radio]
rx_ginocchio.ambulatori = [radio]

db.commit()
db.close()

print("Seed completato.")