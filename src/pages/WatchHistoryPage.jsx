import { useState, useMemo } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import './WatchHistoryPage.css';

// Hàm sinh dữ liệu video ngẫu nhiên và duy nhất
const generateUniqueHistoryVideos = (count) => {
  const titles = [
    'Obito - Hà Nội ft. VSTRA',
    'SƠN TÙNG M-TP | CHÚNG TA CỦA HIỆN TẠI',
    'Chill Vibes - Lofi Beat 24/7',
    'Đen - Trốn Tìm ft. MTV band',
    'HIEUTHUHAI - Ngủ Một Mình',
    'MCK - Chìm Sâu ft. Trung Trần',
    'Rap Việt Mùa 3 - Tập 1 Full',
    'Tlinh - Nếu Lúc Đó',
    'B Ray - Ex\'s Hate Me',
    'Karik - Người Lạ Ơi',
    'Vũ. - Bước Qua Nhau',
    'Wren Evans - Thích Em Hơi Nhiều',
    'MONO - Waiting For You',
    'Grey D - Dự Báo Thời Tiết Hôm Nay Mưa',
    'JustaTee - Đã Lỡ Yêu Em Nhiều',
  ];

  const channels = [
    'Obito Official', 'Sơn Tùng M-TP', 'Lofi Girl', 'Đen Vâu Official',
    'HIEUTHUHAI', 'MCK Official', 'Vie Channel', 'tlinh',
    'B Ray Official', 'Karik', 'Vũ. Official', 'Wren Evans',
    'MONO Official', 'GREY D', 'JustaTee'
  ];

  // Xáo trộn mảng để lấy dữ liệu không bị trùng lặp
  const shuffledIndices = Array.from({ length: titles.length }, (_, i) => i).sort(() => 0.5 - Math.random());

  return Array.from({ length: Math.min(count, titles.length) }, (_, i) => {
    const randomIndex = shuffledIndices[i];
    return {
      id: i + 1,
      title: titles[randomIndex],
      subtitle: `${titles[randomIndex]} Download/Stream`,
      channel: channels[randomIndex],
      // Sử dụng ảnh ngẫu nhiên grayscale hoặc tự nhiên
      thumbnail: `https://picsum.photos/seed/hist_vid_${randomIndex + 1}/160/90`,
      duration: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 50) + 10}`,
      dateWatched: '25 thg 5, 2026',
      // Giữ nguyên format không dấu phẩy giống ảnh mẫu
      views: Math.floor(Math.random() * 5000000) + 1000000,
      comments: Math.floor(Math.random() * 500000) + 100000,
    };
  });
};

export default function WatchHistoryPage({ activeItem = 'history', onNavigate }) {
  // Sinh 12 video duy nhất để test phân trang
  const [videos] = useState(() => generateUniqueHistoryVideos(12));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = videos.slice(start, start + itemsPerPage);

  const handlePerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset về trang 1 khi đổi số lượng hiển thị
  };

  return (
    <div className="watch-history-page">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />
      <Header />

      <main className="watch-history-main">
        <h1 className="wh-title">Video đã xem</h1>

        <div className="wh-table-wrapper">
          <table className="wh-table">
            <thead>
              <tr>
                <th className="th-video">VIDEO</th>
                <th className="th-date">NGÀY XEM</th>
                <th className="th-views">LƯỢT XEM</th>
                <th className="th-comments">SỐ BÌNH LUẬN</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((v) => (
                <tr key={v.id}>
                  <td className="wh-video-cell">
                    <div className="wh-video-info">
                      <div className="wh-thumb">
                        <img src={v.thumbnail} alt={v.title} />
                        <span className="wh-duration">{v.duration}</span>
                      </div>
                      <div className="wh-meta">
                        <strong className="wh-video-title">{v.title}</strong>
                        <span className="wh-subtitle">{v.subtitle}</span>
                        <span className="wh-channel-badge">{v.channel}</span>
                      </div>
                    </div>
                  </td>
                  <td className="wh-date-cell">{v.dateWatched}</td>
                  <td className="wh-num-cell">{v.views}</td>
                  <td className="wh-num-cell">{v.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Thanh phân trang căn phải giống ảnh */}
        <div className="wh-pagination-container">
          <div className="wh-pagination-items-per-page">
            <span>Số hàng mỗi trang:</span>
            <select value={itemsPerPage} onChange={handlePerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          
          <div className="wh-pagination-info">
            {start + 1}-{Math.min(start + itemsPerPage, videos.length)}/nhiều kết quả
          </div>

          <div className="wh-pagination-controls">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>
            </button>
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
            </button>
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}