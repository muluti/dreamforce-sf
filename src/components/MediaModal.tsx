import React, { useState } from "react";
import { X, Upload, Film, Image as ImageIcon, Trash2, ExternalLink } from "lucide-react";
import { MediaItem } from "../types";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mediaList: MediaItem[];
  onAddMedia: (item: MediaItem) => void;
  onDeleteMedia: (id: string) => void;
  readOnly?: boolean;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  title,
  mediaList = [],
  onAddMedia,
  onDeleteMedia,
  readOnly = false
}) => {
  const [activeTab, setActiveTab] = useState<"view" | "upload">("view");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [linkInput, setLinkInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("파일 크기가 15MB를 초과합니다.");
      return;
    }

    const isVideo = file.type.startsWith("video/");
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newItem: MediaItem = {
        id: `media-${Date.now()}`,
        type: isVideo ? "video" : "image",
        url: dataUrl,
        name: file.name
      };
      onAddMedia(newItem);
      setActiveTab("view");
    };
    reader.readAsDataURL(file);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkInput.trim()) return;

    const newItem: MediaItem = {
      id: `media-${Date.now()}`,
      type: mediaType,
      url: linkInput.trim(),
      name: nameInput.trim() || (mediaType === "video" ? "동영상 링크" : "이미지 링크")
    };
    onAddMedia(newItem);
    setLinkInput("");
    setNameInput("");
    setActiveTab("view");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-[10px] p-0 md:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-t-[32px] md:rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* 드래그 핸들 */}
        <div className="pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-[#d7e3f1] dark:bg-slate-700 mx-auto" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-border)]">
          <div>
            <p className="notion-kicker">MEDIA VAULT</p>
            <h3 className="text-lg font-bold tracking-[-0.03em] text-[var(--color-foreground)]">
              {title} 미디어함
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 탭 */}
        {!readOnly && (
          <div className="flex border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-6 pt-2 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab("view")}
              className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
                activeTab === "view"
                  ? "border-[var(--color-blue)] text-[var(--color-blue)]"
                  : "border-transparent text-[var(--color-text-secondary)]"
              }`}
            >
              미디어 목록 ({mediaList.length})
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
                activeTab === "upload"
                  ? "border-[var(--color-blue)] text-[var(--color-blue)]"
                  : "border-transparent text-[var(--color-text-secondary)]"
              }`}
            >
              + 새 미디어 등록
            </button>
          </div>
        )}

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "view" ? (
            <div>
              {mediaList.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">등록된 사진이나 영상이 없습니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {mediaList.map((media) => (
                    <article
                      key={media.id}
                      className="os-virtualized-card rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      <div
                        onClick={() => setSelectedMedia(media)}
                        className="h-28 w-full bg-[var(--color-surface-alt)] flex items-center justify-center cursor-pointer overflow-hidden"
                      >
                        {media.type === "image" ? (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-[var(--color-blue)] p-2">
                            <Film className="h-6 w-6" />
                            <span className="text-[10px] text-[var(--color-text-secondary)] font-bold">비디오 재생</span>
                          </div>
                        )}
                      </div>

                      <div className="p-2 flex items-center justify-between gap-1 border-t border-[var(--color-border)]">
                        <span className="text-[11px] font-medium text-[var(--color-foreground)] truncate" title={media.name}>
                          {media.name}
                        </span>
                        {!readOnly && (
                          <button
                            onClick={() => onDeleteMedia(media.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-dashed border-[var(--color-border)] p-6 text-center bg-[var(--color-surface-alt)]">
                <input
                  type="file"
                  id="media-file-input"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="media-file-input"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="h-10 w-10 rounded-2xl bg-[var(--color-blue-soft)] text-[var(--color-blue)] flex items-center justify-center">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-[var(--color-foreground)]">
                    스마트폰 / PC 사진 또는 비디오 선택
                  </span>
                  <span className="text-[10px] text-[var(--color-text-secondary)]">
                    최대 15MB 이하 지원
                  </span>
                </label>
              </div>

              <form onSubmit={handleAddLink} className="space-y-2.5 text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="제목 (예: 바우처 사진)"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="flex-1 p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                  />
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as "image" | "video")}
                    className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                  >
                    <option value="image">이미지</option>
                    <option value="video">유튜브/영상</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://... URL 링크"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    className="flex-1 p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                  />
                  <button
                    type="submit"
                    className="notion-button-primary py-2 px-4 active:scale-[0.97] cursor-pointer"
                  >
                    추가
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Fullscreen Lightbox */}
        {selectedMedia && (
          <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {selectedMedia.url.startsWith("http") && (
                <a
                  href={selectedMedia.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/20 text-white"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-2 rounded-full bg-white/20 text-white cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="max-w-3xl max-h-[80vh] flex items-center justify-center">
              {selectedMedia.type === "image" ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.name}
                  className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
                />
              ) : (
                <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  {selectedMedia.url.includes("youtube.com") || selectedMedia.url.includes("youtu.be") ? (
                    <iframe
                      src={selectedMedia.url.replace("watch?v=", "embed/")}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={selectedMedia.url}
                      controls
                      autoPlay
                      className="w-full h-full max-h-[80vh]"
                    />
                  )}
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-white/90 font-medium">{selectedMedia.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};
