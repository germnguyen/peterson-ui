import './PlaylistDetailSidebar.css';

export default function PlaylistDetailSidebar({
  thumbnail,
  title,
  activeTab,
  onTabChange,
  onBack,
}) {
  return (
    <aside className="pds">
      <div className="pds-header">
        <button className="pds-back" onClick={() => onBack?.()}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Nội dung của kênh
        </button>
      </div>

      <div className="pds-preview">
        <div className="pds-thumb">
          {thumbnail ? (
            <img src={thumbnail} alt={title} />
          ) : (
            <div className="pds-thumb-placeholder" />
          )}
        </div>
        <p className="pds-label">Danh sách phát của bạn</p>
        <h3 className="pds-name">{title}</h3>
      </div>

      <hr className="pds-divider" />

      <nav className="pds-tabs">
        <button
          className={`pds-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => onTabChange?.('settings')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
          Chi tiết
        </button>
        <button
          className={`pds-tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => onTabChange?.('videos')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
          </svg>
          Video
        </button>
      </nav>
    </aside>
  );
}