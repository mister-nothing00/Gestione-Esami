"use client"

interface Item {
  id: number
  nome: string
}

interface Props {
  titolo: string
  items: Item[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export default function PannelloLista({ titolo, items, selectedId, onSelect }: Props) {
  return (
    <div className="flex flex-col w-1/3 border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-sm">
        {titolo}
      </div>
      <ul className="flex-1 overflow-y-auto">
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`px-4 py-2 cursor-pointer text-sm border-b border-gray-100 hover:bg-blue-50 transition-colors
              ${selectedId === item.id ? "bg-blue-100 font-medium text-blue-700" : "text-gray-700"}`}
          >
            {item.nome}
          </li>
        ))}
        {items.length === 0 && (
          <li className="px-4 py-3 text-sm text-gray-400 italic">Nessun elemento</li>
        )}
      </ul>
    </div>
  )
}