import React, { useState, useEffect } from "react";
import { 
  loadAppData, 
  saveAppData, 
  isSessionAuthenticated, 
  setSessionAuthenticated 
} from "./utils/storage";
import { 
  AppData, 
  TimelineEvent, 
  TravelDocument, 
  ChecklistItem, 
  ColleagueContact, 
  BusinessCardRecord, 
  PlaceItem, 
  ProTip, 
  ExpenseRecord, 
  CustomSection, 
  CustomSectionItem, 
  MediaItem 
} from "./types";

import { AuthModal } from "./components/AuthModal";
import { Header } from "./components/Header";
import { Navbar, TabType } from "./components/Navbar";
import { MediaModal } from "./components/MediaModal";
import { ProTipsModal } from "./components/ProTipsModal";

import { DashboardTab } from "./components/tabs/DashboardTab";
import { ScheduleTab } from "./components/tabs/ScheduleTab";
import { TripHubTab } from "./components/tabs/TripHubTab";
import { PlacesTab } from "./components/tabs/PlacesTab";
import { WellnessTab } from "./components/tabs/WellnessTab";

export function App() {
  const [data, setData] = useState<AppData>(() => loadAppData());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isSessionAuthenticated());
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // Pro Tips Modal State
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);

  // Media Modal State
  const [mediaModalState, setMediaModalState] = useState<{
    isOpen: boolean;
    title: string;
    mediaList: MediaItem[];
    onUpdateCallback?: (items: MediaItem[]) => void;
  }>({
    isOpen: false,
    title: "",
    mediaList: []
  });

  // Load Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("dreampass_theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  // Auto Save
  useEffect(() => {
    saveAppData(data);
  }, [data]);

  // Lock
  const handleLock = () => {
    setSessionAuthenticated(false);
    setIsAuthenticated(false);
  };

  // Unlock
  const handleUnlock = () => {
    setSessionAuthenticated(true);
    setIsAuthenticated(true);
  };

  // PIN Change
  const handleChangePin = (newPin: string) => {
    setData((prev) => ({ ...prev, pin: newPin }));
    setIsChangingPin(false);
  };

  // Media Modal Trigger
  const handleOpenMediaModal = (
    title: string,
    mediaList: MediaItem[],
    onUpdate: (items: MediaItem[]) => void
  ) => {
    setMediaModalState({
      isOpen: true,
      title,
      mediaList,
      onUpdateCallback: onUpdate
    });
  };

  const handleAddMediaItem = (item: MediaItem) => {
    const updated = [...mediaModalState.mediaList, item];
    setMediaModalState((prev) => ({ ...prev, mediaList: updated }));
    if (mediaModalState.onUpdateCallback) {
      mediaModalState.onUpdateCallback(updated);
    }
  };

  const handleDeleteMediaItem = (id: string) => {
    const updated = mediaModalState.mediaList.filter((m) => m.id !== id);
    setMediaModalState((prev) => ({ ...prev, mediaList: updated }));
    if (mediaModalState.onUpdateCallback) {
      mediaModalState.onUpdateCallback(updated);
    }
  };

  // Event CRUD
  const handleAddEvent = (evt: TimelineEvent) => {
    setData((prev) => ({ ...prev, timelineEvents: [...prev.timelineEvents, evt] }));
  };

  const handleUpdateEvent = (evt: TimelineEvent) => {
    setData((prev) => ({
      ...prev,
      timelineEvents: prev.timelineEvents.map((e) => (e.id === evt.id ? evt : e))
    }));
  };

  const handleDeleteEvent = (id: string) => {
    setData((prev) => ({
      ...prev,
      timelineEvents: prev.timelineEvents.filter((e) => e.id !== id)
    }));
  };

  // Document CRUD
  const handleUpdateDocument = (doc: TravelDocument) => {
    setData((prev) => ({
      ...prev,
      travelDocuments: prev.travelDocuments.map((d) => (d.id === doc.id ? doc : d))
    }));
  };

  const handleAddDocument = (doc: TravelDocument) => {
    setData((prev) => ({ ...prev, travelDocuments: [...prev.travelDocuments, doc] }));
  };

  const handleDeleteDocument = (id: string) => {
    setData((prev) => ({
      ...prev,
      travelDocuments: prev.travelDocuments.filter((d) => d.id !== id)
    }));
  };

  // Checklist CRUD
  const handleToggleChecklist = (id: string) => {
    setData((prev) => ({
      ...prev,
      checklist: prev.checklist.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    }));
  };

  const handleAddChecklistItem = (item: ChecklistItem) => {
    setData((prev) => ({ ...prev, checklist: [...prev.checklist, item] }));
  };

  const handleDeleteChecklistItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((c) => c.id !== id)
    }));
  };

  // Colleague CRUD
  const handleAddColleague = (col: ColleagueContact) => {
    setData((prev) => ({ ...prev, colleagues: [...prev.colleagues, col] }));
  };

  const handleUpdateColleague = (col: ColleagueContact) => {
    setData((prev) => ({
      ...prev,
      colleagues: prev.colleagues.map((c) => (c.id === col.id ? col : c))
    }));
  };

  const handleDeleteColleague = (id: string) => {
    setData((prev) => ({
      ...prev,
      colleagues: prev.colleagues.filter((c) => c.id !== id)
    }));
  };

  // Business Card CRUD
  const handleAddBusinessCard = (card: BusinessCardRecord) => {
    setData((prev) => ({ ...prev, businessCards: [card, ...prev.businessCards] }));
  };

  const handleDeleteBusinessCard = (id: string) => {
    setData((prev) => ({
      ...prev,
      businessCards: prev.businessCards.filter((c) => c.id !== id)
    }));
  };

  // Places & Shopping CRUD
  const handleTogglePlaceVisited = (id: string) => {
    setData((prev) => ({
      ...prev,
      places: prev.places.map((p) =>
        p.id === id
          ? {
              ...p,
              visited: !p.visited,
              visitedAt: !p.visited ? new Date().toISOString().slice(0, 10) : undefined
            }
          : p
      )
    }));
  };

  const handleAddPlace = (place: PlaceItem) => {
    setData((prev) => ({ ...prev, places: [place, ...prev.places] }));
  };

  const handleUpdatePlace = (place: PlaceItem) => {
    setData((prev) => ({
      ...prev,
      places: prev.places.map((p) => (p.id === place.id ? place : p))
    }));
  };

  const handleDeletePlace = (id: string) => {
    setData((prev) => ({
      ...prev,
      places: prev.places.filter((p) => p.id !== id)
    }));
  };

  // Pro Tips CRUD
  const handleAddTip = (tip: ProTip) => {
    setData((prev) => ({ ...prev, proTips: [tip, ...prev.proTips] }));
  };

  const handleDeleteTip = (id: string) => {
    setData((prev) => ({
      ...prev,
      proTips: prev.proTips.filter((t) => t.id !== id)
    }));
  };

  // Expenses CRUD
  const handleAddExpense = (exp: ExpenseRecord) => {
    setData((prev) => ({ ...prev, expenses: [exp, ...prev.expenses] }));
  };

  const handleDeleteExpense = (id: string) => {
    setData((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id)
    }));
  };

  // Custom Section CRUD
  const handleAddSection = (section: CustomSection) => {
    setData((prev) => ({ ...prev, customSections: [...prev.customSections, section] }));
  };

  const handleDeleteSection = (id: string) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id)
    }));
  };

  const handleAddItemToSection = (sectionId: string, item: CustomSectionItem) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === sectionId ? { ...sec, items: [...sec.items, item] } : sec
      )
    }));
  };

  const handleDeleteItemFromSection = (sectionId: string, itemId: string) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === sectionId
          ? { ...sec, items: sec.items.filter((i) => i.id !== itemId) }
          : sec
      )
    }));
  };

  const handleRestoreData = (restored: AppData) => {
    setData(restored);
  };

  return (
    <div className="notion-shell">
      {/* 13절 BottomSheet 보안 모달 */}
      {!isAuthenticated && (
        <AuthModal
          correctPin={data.pin}
          onSuccess={handleUnlock}
          onChangePin={handleChangePin}
        />
      )}

      {/* PIN 변경 모달 */}
      {isChangingPin && (
        <AuthModal
          correctPin={data.pin}
          onSuccess={() => {}}
          onChangePin={handleChangePin}
          isChangingPin={true}
          onCancelChangePin={() => setIsChangingPin(false)}
        />
      )}

      {/* Pro Tips Modal */}
      <ProTipsModal
        isOpen={isTipsModalOpen}
        onClose={() => setIsTipsModalOpen(false)}
        tips={data.proTips}
        onAddTip={handleAddTip}
        onDeleteTip={handleDeleteTip}
      />

      {/* Media Modal */}
      <MediaModal
        isOpen={mediaModalState.isOpen}
        title={mediaModalState.title}
        mediaList={mediaModalState.mediaList}
        onClose={() => setMediaModalState((prev) => ({ ...prev, isOpen: false }))}
        onAddMedia={handleAddMediaItem}
        onDeleteMedia={handleDeleteMediaItem}
      />

      {/* Notion Main Column Wrapper */}
      <div className="notion-main">
        {/* 3절 Notion Hero Page Header */}
        <Header
          userName={data.userName}
          exchangeRate={data.exchangeRate}
          onLock={handleLock}
          onOpenSettings={() => setIsChangingPin(true)}
          onOpenTips={() => setIsTipsModalOpen(true)}
        />

        {/* Tab Contents */}
        <main className="w-full">
          {activeTab === "dashboard" && (
            <DashboardTab
              data={data}
              onChangeTab={setActiveTab}
              onOpenTips={() => setIsTipsModalOpen(true)}
              onSelectEvent={(evt) => {
                setActiveTab("schedule");
              }}
            />
          )}

          {activeTab === "schedule" && (
            <ScheduleTab
              events={data.timelineEvents}
              onAddEvent={handleAddEvent}
              onUpdateEvent={handleUpdateEvent}
              onDeleteEvent={handleDeleteEvent}
              onOpenMediaModal={handleOpenMediaModal}
            />
          )}

          {activeTab === "hub" && (
            <TripHubTab
              documents={data.travelDocuments}
              checklist={data.checklist}
              colleagues={data.colleagues}
              businessCards={data.businessCards}
              safetyZones={data.safetyZones}
              onUpdateDocument={handleUpdateDocument}
              onAddDocument={handleAddDocument}
              onDeleteDocument={handleDeleteDocument}
              onToggleChecklist={handleToggleChecklist}
              onAddChecklistItem={handleAddChecklistItem}
              onDeleteChecklistItem={handleDeleteChecklistItem}
              onAddColleague={handleAddColleague}
              onUpdateColleague={handleUpdateColleague}
              onDeleteColleague={handleDeleteColleague}
              onAddBusinessCard={handleAddBusinessCard}
              onDeleteBusinessCard={handleDeleteBusinessCard}
              onOpenMediaModal={handleOpenMediaModal}
            />
          )}

          {activeTab === "places" && (
            <PlacesTab
              places={data.places}
              onToggleVisited={handleTogglePlaceVisited}
              onAddPlace={handleAddPlace}
              onUpdatePlace={handleUpdatePlace}
              onDeletePlace={handleDeletePlace}
            />
          )}

          {activeTab === "wellness" && (
            <WellnessTab
              data={data}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
              onAddSection={handleAddSection}
              onDeleteSection={handleDeleteSection}
              onAddItemToSection={handleAddItemToSection}
              onDeleteItemFromSection={handleDeleteItemFromSection}
              onRestoreData={handleRestoreData}
              onOpenMediaModal={handleOpenMediaModal}
            />
          )}
        </main>
      </div>

      {/* 2-7절 Bottom Navigation Bar */}
      <Navbar activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}

export default App;
