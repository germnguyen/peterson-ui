import { useState } from "react";
import ChannelProfilePage from "./pages/ChannelProfilePage";
import EditVideoPage from "./pages/EditVideoPage";
import HomePage from "./pages/HomePage";
import StatisticsPage from "./pages/StatisticsPage";
import UploadVideoPage from "./pages/UploadVideoPage";
import VideoManagementPage from "./pages/VideoManagementPage";
import WatchVideoPage from "./pages/WatchVideoPage";

export default function App() {
  const [page, setPage] = useState("home");

  function handleNavigate(nextPage) {
    if (["home", "profile", "statistics", "manageVideos", "uploadVideo", "editVideo", "watchVideo"].includes(nextPage)) {
      setPage(nextPage);
    }
  }

  if (page === "home") {
    return <HomePage activeItem={page} onNavigate={handleNavigate} />;
  }

  if (page === "watchVideo") {
    return <WatchVideoPage activeItem="home" onNavigate={handleNavigate} />;
  }

  if (page === "profile") {
    return <ChannelProfilePage activeItem={page} onNavigate={handleNavigate} />;
  }

  if (page === "statistics") {
    return <StatisticsPage activeItem={page} onNavigate={handleNavigate} />;
  }

  if (page === "uploadVideo") {
    return <UploadVideoPage activeItem="manageVideos" onNavigate={handleNavigate} />;
  }

  if (page === "editVideo") {
    return <EditVideoPage activeItem="manageVideos" onNavigate={handleNavigate} />;
  }

  return <VideoManagementPage activeItem={page} onNavigate={handleNavigate} />;
}
