"use client"

import { EsameSelezionato } from "@/types"

interface Props {
  esami: EsameSelezionato[]
  onRimuovi: (id: number) => void
  onSuSu: (index: number) => void
  onGiuGiu: (index: number) => void
}

export default function GrigliaEsami({ esami, onRimuovi, onSuSu, onGiuGiu }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">Cod. Min.</th>
            <th className="px-3 py-2 text-left">Cod. Int.</th>
            <th className="px-3 py-2 text-left">Descrizione</th>
            <th className="px-3 py-2 text-center">Ordine</th>
            <th className="px-3 py-2 text-center">Elimina</th>
          </tr>
        </thead>
        <tbody>
          {esami.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-4 text-center text-gray-400 italic">
                Nessun esame selezionato
              </td>
            </tr>
          )}
          {esami.map((esame, index) => (
            <tr key={esame.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-3 py-2 text-gray-500">{index + 1}</td>
              <td className="px-3 py-2">{esame.codice_ministeriale}</td>
              <td className="px-3 py-2">{esame.codice_interno}</td>
              <td className="px-3 py-2">{esame.descrizione_esame}</td>
              <td className="px-3 py-2 text-center space-x-1">
                <button
                  onClick={() => onSuSu(index)}
                  disabled={index === 0}
                  className="px-2 py-0.5 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  onClick={() => onGiuGiu(index)}
                  disabled={index === esami.length - 1}
                  className="px-2 py-0.5 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-30"
                >
                  ▼
                </button>
              </td>
              <td className="px-3 py-2 text-center">
                <button
                  onClick={() => onRimuovi(esame.id)}
                  className="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}