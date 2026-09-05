import { AppData } from "../types";
import { initialAppData } from "../data/initialData";

const STORAGE_KEY = "dreampass_app_data_v9";
const AUTH_KEY = "dreampass_auth_session";

export function loadAppData(): AppData {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem("dreampass_app_data_v8") ||
      localStorage.getItem("dreampass_app_data_v7") ||
      localStorage.getItem("dreampass_app_data_v6") ||
      localStorage.getItem("dreampass_app_data_v5");

    if (!raw) {
      saveAppData(initialAppData);
      return initialAppData;
    }

    const parsed = JSON.parse(raw);

    // 1. Places Smart Merge
    const initialPlaceMap = new Map(initialAppData.places.map((p) => [p.id, p]));
    const existingPlaces = Array.isArray(parsed.places) ? parsed.places : [];
    const placeIdsInParsed = new Set(existingPlaces.map((p: any) => p.id));
    
    // Update existing places and add any newly introduced places
    const places = [
      ...existingPlaces.map((p: any) => {
        const initP = initialPlaceMap.get(p.id);
        if (initP) {
          return {
            ...initP,
            ...p,
            lat: initP.lat ?? p.lat,
            lng: initP.lng ?? p.lng,
            name: initP.name,
            nameEn: initP.nameEn,
            themeTags: initP.themeTags,
            description: initP.description,
            shoppingTips: initP.shoppingTips
          };
        }
        return p;
      }),
      ...initialAppData.places.filter((p) => !placeIdsInParsed.has(p.id))
    ];

    // 2. Timeline Events Smart Merge
    const initialEventMap = new Map(initialAppData.timelineEvents.map((e) => [e.id, e]));
    const existingEvents = Array.isArray(parsed.timelineEvents) ? parsed.timelineEvents : [];
    const eventIdsInParsed = new Set(existingEvents.map((e: any) => e.id));

    const timelineEvents = [
      ...existingEvents.map((e: any) => {
        const initE = initialEventMap.get(e.id);
        if (initE) {
          return {
            ...initE,
            completed: e.completed ?? initE.completed,
            media: e.media && e.media.length > 0 ? e.media : initE.media
          };
        }
        return e;
      }),
      ...initialAppData.timelineEvents.filter((e) => !eventIdsInParsed.has(e.id))
    ];

    // 3. Travel Documents Smart Merge
    const initialDocMap = new Map(initialAppData.travelDocuments.map((d) => [d.id, d]));
    const existingDocs = Array.isArray(parsed.travelDocuments) ? parsed.travelDocuments : [];
    const docIdsInParsed = new Set(existingDocs.map((d: any) => d.id));

    const travelDocuments = [
      ...existingDocs.map((d: any) => {
        const initD = initialDocMap.get(d.id);
        if (initD) {
          return {
            ...initD,
            media: d.media && d.media.length > 0 ? d.media : initD.media
          };
        }
        return d;
      }),
      ...initialAppData.travelDocuments.filter((d) => !docIdsInParsed.has(d.id))
    ];

    // 4. Checklist Smart Merge (Preserve check states, add new items)
    const existingChecks = Array.isArray(parsed.checklist) ? parsed.checklist : [];
    const existingCheckMap = new Map(existingChecks.map((c: any) => [c.id, c.checked]));
    const checklist = initialAppData.checklist.map((item) => ({
      ...item,
      checked: existingCheckMap.has(item.id) ? !!existingCheckMap.get(item.id) : item.checked
    }));

    // 5. Pro Tips Smart Merge
    const proTips = initialAppData.proTips;

    const merged: AppData = {
      ...initialAppData,
      ...parsed,
      places,
      timelineEvents,
      travelDocuments,
      checklist,
      proTips
    };

    if (merged.pin === "1234") {
      merged.pin = "9990";
    }

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
