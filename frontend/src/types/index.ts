export interface Ambulatorio {
  id: number
  nome: string
}

export interface ParteDelCorpo {
  id: number
  nome: string
}

export interface Esame {
  id: number
  codice_ministeriale: string
  codice_interno: string
  descrizione_esame: string
  parte_del_corpo_id: number
}

export interface EsameSelezionato extends Esame {
  ordine: number
}