# Gestione Esami

Applicazione web per la gestione e ricerca di esami medici, con navigazione a cascata per ambulatorio e parte del corpo.

## Stack

**Backend:** Python 3.13, FastAPI, SQLAlchemy, PostgreSQL, python-dotenv  
**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Axios

## Funzionalità

- Navigazione a cascata: Ambulatori -> Parti del corpo -> Esami
- Selezione automatica del primo elemento ad ogni cambio pannello
- Ricerca testuale case-insensitive su codice ministeriale, codice interno o descrizione
- Reset ricerca con ripristino navigazione
- Griglia esami selezionati con riordinamento e cancellazione righe
- Configurazione via file `.ini` con caricamento generico e verifica dei tipi
- Context globale React per la gestione dello stato

## Struttura

```
gestione-esami/
├── backend/
│   ├── main.py            # FastAPI routes
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   ├── database.py        # Connessione DB e sessioni
│   ├── config_loader.py   # Loader generico file .ini
│   ├── seed.py            # Dati di esempio
│   └── config.ini         # Configurazione default ricerca
└── frontend/
    └── src/
        ├── app/           # Next.js App Router
        ├── components/    # PannelloLista, BarraRicerca, GrigliaEsami
        ├── context/       # NolexContext — stato globale
        ├── lib/           # Chiamate API (axios)
        └── types/         # Interfacce TypeScript
```

## Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
```

Crea il file `.env`:

```env
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/nolex
```

Crea il database e popola i dati:

```bash
psql -U postgres -c "CREATE DATABASE nolex"
python seed.py
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

Documentazione interattiva disponibile su [http://localhost:8000/docs](http://localhost:8000/docs)
