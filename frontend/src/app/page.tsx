"use client"

import { useNolex } from "@/context/NolexContext"
import PannelloLista from "@/components/PannelloLista"
import BarraRicerca from "@/components/BarraRicerca"
import GrigliaEsami from "@/components/GrigliaEsami"

export default function Home() {
  const {
    ambulatori, parti, esami,
    selAmbulatorio, selParte, selEsame,
    griglia, query, tipo, ricercaAttiva,
    setQuery, setTipo, setSelEsame,
    onSelezionaAmbulatorio, onSelezionaParte,
    onCerca, onReset, onConferma, onRimuovi, sposta,
  } = useNolex()

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Gestione Esami</h1>

      <BarraRicerca
        query={query}
        tipo={tipo}
        onQueryChange={setQuery}
        onTipoChange={setTipo}
        onCerca={onCerca}
        onReset={onReset}
      />

      {ricercaAttiva && (
        <p className="mt-2 text-sm text-blue-600">
          Risultati ricerca: {esami.length} esami trovati
        </p>
      )}

      <div className="flex gap-4 mt-4">
        <PannelloLista
          titolo="Ambulatori"
          items={ambulatori}
          selectedId={selAmbulatorio}
          onSelect={onSelezionaAmbulatorio}
        />
        <PannelloLista
          titolo="Parti del corpo"
          items={parti}
          selectedId={selParte}
          onSelect={onSelezionaParte}
        />
        <PannelloLista
          titolo="Esami"
          items={esami.map(e => ({ id: e.id, nome: e.descrizione_esame }))}
          selectedId={selEsame}
          onSelect={setSelEsame}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onConferma}
          disabled={!selEsame}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-40 transition-colors"
        >
          Aggiungi esame alla lista
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Esami selezionati</h2>
        <GrigliaEsami
          esami={griglia}
          onRimuovi={onRimuovi}
          onSuSu={i => sposta(i, -1)}
          onGiuGiu={i => sposta(i, 1)}
        />
      </div>
    </main>
  )
}