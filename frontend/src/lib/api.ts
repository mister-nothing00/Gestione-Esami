import axios from "axios"
import { Ambulatorio, ParteDelCorpo, Esame } from "@/types"

const api = axios.create({ baseURL: "http://localhost:8000" })

export const getAmbulatori = () =>
  api.get<Ambulatorio[]>("/ambulatori").then(r => r.data)

export const getParti = (ambulatorioId: number) =>
  api.get<ParteDelCorpo[]>(`/ambulatori/${ambulatorioId}/parti`).then(r => r.data)

export const getEsami = (ambulatorioId: number, parteId: number) =>
  api.get<Esame[]>(`/ambulatori/${ambulatorioId}/parti/${parteId}/esami`).then(r => r.data)

export const cercaEsami = (q: string, tipo: string) =>
  api.get<Esame[]>(`/esami/cerca`, { params: { q, tipo } }).then(r => r.data)

export const getDefaults = () =>
  api.get<{ query_predefinita: string; tipo_predefinito: string }>("/config/defaults").then(r => r.data)