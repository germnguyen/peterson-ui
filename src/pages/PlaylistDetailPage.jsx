import { useState } from 'react';
import PlaylistDetailHeader from '../components/layout/PlaylistDetailHeader';
import PlaylistDetailSidebar from '../components/layout/PlaylistDetailSidebar';
import './PlaylistDetailPage.css';

export default function PlaylistDetailPage({ playlist, onBack }) {
  // Trạng thái đã lưu (mốc khôi phục & hiển thị sidebar nhỏ bên trong)
  const [savedState, setSavedState] = useState({
    title: playlist?.title || 'Tên danh sách phát',
    description: playlist?.subtitle || '',
    visibility: playlist?.visibility || 'Riêng tư',
  });

  // Trạng thái bản nháp trên form
  const [title, setTitle] = useState(savedState.title);
  const [description, setDescription] = useState(savedState.description);
  const [visibility, setVisibility] = useState(savedState.visibility);
  const [sortBy, setSortBy] = useState('Sắp xếp theo ngày thêm');
  
  const [activeTab, setActiveTab] = useState('settings');

  const handleSave = () => {
    setSavedState({ title, description, visibility });
    if (playlist) {
      playlist.title = title;
      playlist.subtitle = description;
      playlist.visibility = visibility;
    }
    alert('Đã lưu thay đổi!');
  };

  const handleCancel = () => {
    setTitle(savedState.title);
    setDescription(savedState.description);
    setVisibility(savedState.visibility);
  };

  return (
    <div className="playlist-detail-page">
      <PlaylistDetailHeader />

      <main className="playlist-detail-main">
        <div className="playlist-detail-layout">
          <PlaylistDetailSidebar
            thumbnail={playlist?.thumbnail}
            title={savedState.title}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onBack={onBack}
          />

          {/* Nội dung chính */}
          <section className="playlist-detail-content">
            <div className="playlist-detail-header">
              <h1>Thông tin chi tiết về danh sách phát</h1>
              <div className="playlist-detail-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Hủy thay đổi
                </button>
                <button type="button" className="btn-save" onClick={handleSave}>
                  Lưu
                </button>
              </div>
            </div>

            {activeTab === 'settings' && (
              <form className="playlist-detail-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="form-column main-col">
                  <div className="input-group">
                    <label htmlFor="playlist-title">Tiêu đề (bắt buộc)</label>
                    <input
                      id="playlist-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Tên danh sách phát"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="playlist-description">Mô tả</label>
                    <textarea
                      id="playlist-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Thêm nội dung mô tả"
                    />
                  </div>
                </div>

                <div className="form-column side-col">
                  <div className="input-group">
                    <label htmlFor="playlist-visibility">Chế độ hiển thị</label>
                    <select
                      id="playlist-visibility"
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                    >
                      <option value="Riêng tư">Riêng tư</option>
                      <option value="Không công khai">Không công khai</option>
                      <option value="Công khai">Công khai</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="playlist-sort">Thứ tự video mặc định</label>
                    <select
                      id="playlist-sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="Sắp xếp theo ngày thêm">Sắp xếp theo ngày thêm</option>
                      <option value="Sắp xếp phổ biến nhất">Sắp xếp phổ biến nhất</option>
                    </select>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'videos' && (
              <div className="playlist-videos-tab">
                <p className="no-videos-message">Chưa có video nào trong danh sách phát.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}