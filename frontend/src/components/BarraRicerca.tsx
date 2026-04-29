"use client"

interface Props {
  query: string
  tipo: string
  onQueryChange: (q: string) => void
  onTipoChange: (t: string) => void
  onCerca: () => void
  onReset: () => void
}

export default function BarraRicerca({ query, tipo, onQueryChange, onTipoChange, onCerca, onReset }: Props) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <select
        value={tipo}
        onChange={e => onTipoChange(e.target.value)}
        className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-700"
      >
        <option value="descrizione_esame">Descrizione</option>
        <option value="codice_ministeriale">Cod. Ministeriale</option>
        <option value="codice_interno">Cod. Interno</option>
      </select>

      <input
        type="text"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onCerca()}
        placeholder="Cerca esame..."
        className="flex-1 text-sm border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={onCerca}
        className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 transition-colors"
      >
        Cerca
      </button>

      <button
        onClick={onReset}
        className="bg-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded hover:bg-gray-300 transition-colors"
      >
        Vedi tutti
      </button>
    </div>
  )
}