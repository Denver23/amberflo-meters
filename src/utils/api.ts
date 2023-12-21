import { API_KEY, API_URL } from "./constants";
import axios from "axios";
import { IMeter, IMeterRequest } from "./types";

const client = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json", "API-KEY": API_KEY },
});

export const metersAPI = {
  createNewMeter: (data: IMeterRequest) => client.post<IMeter>("", data),
  deleteMeter: (meterId: string) => client.delete<IMeter>(`/${meterId}`),
  updateMeter: (meterId: string, data: IMeterRequest) =>
    client.put<IMeter>(`/${meterId}`, data),
};
