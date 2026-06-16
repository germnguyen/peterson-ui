import { useState } from "react";
import ChannelProfilePage from "./pages/ChannelProfilePage";
import EditVideoPage from "./pages/EditVideoPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import PlaylistManagementPage from "./pages/PlaylistManagementPage";
import StatisticsPage from "./pages/StatisticsPage";
import SubscribedChannelsPage from "./pages/SubscribedChannelsPage";
import UploadVideoPage from "./pages/UploadVideoPage";
import VideoManagementPage from "./pages/VideoManagementPage";
import WatchHistoryPage from "./pages/WatchHistoryPage";
import LikedVideosPage from "./pages/LikedVideosPage"; 

export default function App() {
  const [page, setPage] = useState("manageVideos");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  function handleNavigate(nextPage, data) {
    if (["profile", "statistics", "manageVideos", "uploadVideo", "editVideo", "playlists", "playlistDetail", "subscriptions", "history", "likedVideos"].includes(nextPage)) {
      if (data) setSelectedPlaylist(data);
      setPage(nextPage);
    }
  }

  if (page === "likedVideos") {
    return <LikedVideosPage activeItem={page} onNavigate={handleNavigate} />;
  }
  if (page === "history") {
    return <WatchHistoryPage activeItem={page} onNavigate={handleNavigate} />;
  }

  if (page === "subscriptions") {
    return <SubscribedChannelsPage activeItem={page} onNavigate={handleNavigate} />;
  }

  if (page === "profile") {
    return <ChannelProfilePage activeItem={page} onNavigate={handleNavigate} />;
  }

  if (page === "statistics") {
    return <StatisticsPage activeItem={page} onNavigate={handleNavigate} />;
  }

  if (page === "playlistDetail") {
    return (
      <PlaylistDetailPage
        activeItem="playlists"
        onNavigate={handleNavigate}
        playlist={selectedPlaylist}
        onBack={() => handleNavigate("playlists")}
      />
    );
  }

  if (page === "playlists") {
    return <PlaylistManagementPage activeItem={page} onNavigate={handleNavigate} />;
  }

  if (page === "uploadVideo") {
    return <UploadVideoPage activeItem="manageVideos" onNavigate={handleNavigate} />;
  }

  if (page === "editVideo") {
    return <EditVideoPage activeItem="manageVideos" onNavigate={handleNavigate} />;
  }

  return <VideoManagementPage activeItem={page} onNavigate={handleNavigate} />;
}
