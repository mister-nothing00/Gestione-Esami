"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { Ambulatorio, ParteDelCorpo, Esame, EsameSelezionato } from "@/types"
import { getAmbulatori, getParti, getEsami, cercaEsami, getDefaults } from "@/lib/api"

interface NolexContextType {
  ambulatori: Ambulatorio[]
  parti: ParteDelCorpo[]
  esami: Esame[]
  selAmbulatorio: number | null
  selParte: number | null
  selEsame: number | null
  griglia: EsameSelezionato[]
  query: string
  tipo: string
  ricercaAttiva: boolean
  setQuery: (q: string) => void
  setTipo: (t: string) => void
  setSelEsame: (id: number | null) => void
  onSelezionaAmbulatorio: (id: number) => void
  onSelezionaParte: (id: number) => void
  onCerca: () => void
  onReset: () => void
  onConferma: () => void
  onRimuovi: (id: number) => void
  sposta: (index: number, direzione: -1 | 1) => void
}

const NolexContext = createContext<NolexContextType | null>(null)

export function NolexProvider({ children }: { children: React.ReactNode }) {
  const [ambulatori, setAmbulatori] = useState<Ambulatorio[]>([])
  const [parti, setParti] = useState<ParteDelCorpo[]>([])
  const [esami, setEsami] = useState<Esame[]>([])
  const [selAmbulatorio, setSelAmbulatorio] = useState<number | null>(null)
  const [selParte, setSelParte] = useState<number | null>(null)
  const [selEsame, setSelEsame] = useState<number | null>(null)
  const [griglia, setGriglia] = useState<EsameSelezionato[]>([])
  const [query, setQuery] = useState("")
  const [tipo, setTipo] = useState("descrizione_esame")
  const [ricercaAttiva, setRicercaAttiva] = useState(false)

  useEffect(() => {
    getDefaults().then(d => {
      setQuery(d.query_predefinita)
      setTipo(d.tipo_predefinito)
    })
  }, [])

  useEffect(() => {
    getAmbulatori().then(data => {
      setAmbulatori(data)
      if (data.length > 0) selezionaAmbulatorio(data[0].id)
    })
  }, [])

  const selezionaParte = useCallback((ambulatorioId: number, parteId: number) => {
    setSelParte(parteId)
    setSelEsame(null)
    getEsami(ambulatorioId, parteId).then(setEsami)
  }, [])

  const selezionaAmbulatorio = useCallback((id: number) => {
    setSelAmbulatorio(id)
    setSelParte(null)
    setEsami([])
    setRicercaAttiva(false)
    getParti(id).then(data => {
      setParti(data)
      if (data.length > 0) selezionaParte(id, data[0].id)
    })
  }, [selezionaParte])

  const onSelezionaAmbulatorio = (id: number) => selezionaAmbulatorio(id)

  const onSelezionaParte = (id: number) => {
    if (selAmbulatorio) selezionaParte(selAmbulatorio, id)
  }

  const onCerca = () => {
    if (!query.trim()) { onReset(); return }
    cercaEsami(query, tipo).then(data => {
      setEsami(data)
      setRicercaAttiva(true)
      setSelParte(null)
      setSelEsame(null)
    })
  }

  const onReset = () => {
    setRicercaAttiva(false)
    setQuery("")
    if (selAmbulatorio) selezionaAmbulatorio(selAmbulatorio)
  }

  const onConferma = () => {
    if (!selEsame) return
    const esame = esami.find(e => e.id === selEsame)
    if (!esame || griglia.find(g => g.id === esame.id)) return
    setGriglia(prev => [...prev, { ...esame, ordine: prev.length + 1 }])
  }

  const onRimuovi = (id: number) => setGriglia(prev => prev.filter(e => e.id !== id))

  const sposta = (index: number, direzione: -1 | 1) => {
    setGriglia(prev => {
      const arr = [...prev]
      const target = index + direzione
      if (target < 0 || target >= arr.length) return arr
      ;[arr[index], arr[target]] = [arr[target], arr[index]]
      return arr
    })
  }

  return (
    <NolexContext.Provider value={{
      ambulatori, parti, esami,
      selAmbulatorio, selParte, selEsame,
      griglia, query, tipo, ricercaAttiva,
      setQuery, setTipo, setSelEsame,
      onSelezionaAmbulatorio, onSelezionaParte,
      onCerca, onReset, onConferma, onRimuovi, sposta,
    }}>
      {children}
    </NolexContext.Provider>
  )
}

export function useNolex() {
  const ctx = useContext(NolexContext)
  if (!ctx) throw new Error("useNolex deve essere usato dentro NolexProvider")
  return ctx
}