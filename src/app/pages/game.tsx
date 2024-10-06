import { useEffect, useState } from "react";

export default function GamePage() {
  const [gameData, setGameData] = useState<string | null>(null);

  useEffect(() => {
    // 使用 fetch 从 API 路由获取数据
    fetch("/api/render/game")
      .then((response) => response.json())
      .then((data) => setGameData(data.message))
      .catch((error) => console.error("Error fetching game data:", error));
  }, []);

  return (
    <div>
      <h1>Game Page</h1>
      {gameData ? <p>{gameData}</p> : <p>Loading...</p>}
    </div>
  );
}
