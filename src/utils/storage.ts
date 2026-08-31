import { AppData } from "../types";
import { initialAppData } from "../data/initialData";

const STORAGE_KEY = "dreampass_app_data_v6";
const AUTH_KEY = "dreampass_auth_session";

export function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("dreampass_app_data_v5");
    if (!raw) {
      saveAppData(initialAppData);
      return initialAppData;
    }
    const parsed = JSON.parse(raw);
    const places = (parsed.places && parsed.places.length > 0) 
      ? parsed.places 
      : initialAppData.places;
    const merged = { ...initialAppData, ...parsed, places };
    saveAppData(merged);
    return merged;
  } catch (e) {
    console.error("Failed to load app data from storage:", e);
    return initialAppData;
  }
}

export function saveAppData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save app data:", e);
  }
}

export function resetAppData(): AppData {
  saveAppData(initialAppData);
  return initialAppData;
}

export function exportAppDataJSON(data: AppData): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `DreamPass_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function isSessionAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function setSessionAuthenticated(auth: boolean): void {
  if (auth) {
    sessionStorage.setItem(AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}
