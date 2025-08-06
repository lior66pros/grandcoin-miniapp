
// App.jsx – קובץ ראשי למיני אפליקציית Grandcoin
import { useEffect, useState } from "react";

export default function App() {
  const [tgUser, setTgUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      const user = tg.initDataUnsafe?.user;
      setTgUser(user);

      fetch("https://your-backend-url.com/wallet/balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId: user?.id })
      })
        .then((res) => res.json())
        .then((data) => setBalance(data.balance || 0));
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-4 text-center text-xl font-bold text-yellow-400 relative">
        <img
          src="https://cdn.discordapp.com/attachments/1143142607605329961/1143898019009902752/grandcoin-logo.png"
          alt="Grandcoin Logo"
          className="w-16 h-16 mx-auto mb-2 rounded-full shadow-lg"
        />
        GRANDCOIN
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl mb-2">שלום {tgUser?.first_name || "משתמש"} 👋</h1>
        <p className="text-blue-400">ברוך הבא למערכת הכרייה של Grandcoin</p>
        <p className="mt-4 text-yellow-400 text-lg">יתרה: {balance} GC</p>
      </div>

      <div className="flex justify-around bg-gray-900 text-sm py-3 border-t border-gray-800">
        <button className="text-yellow-400">🏠 בית</button>
        <button className="text-white">💰 ארנק</button>
        <button className="text-white">🧩 משימות</button>
        <button className="text-white">👤 פרופיל</button>
      </div>
    </div>
  );
}
