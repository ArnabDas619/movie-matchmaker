"use client";

import React, { useState } from "react";
import SwipeDeck from "@/components/SwipeDeck";
import { WatchlistView } from "@/components/WatchlistView";
import { useMovieContext } from "@/context/MovieContext";
import { Flame, List, Heart } from "lucide-react";

type View = "swipe" | "watchlist" | "mustWatch";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("swipe");
  const { watchlist, mustWatchList } = useMovieContext();

  return (
    <main className="flex flex-col min-h-screen bg-black text-white relative">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-30 bg-black/80 backdrop-blur-md">
        <h1 className="text-2xl font-black tracking-tighter text-pink-500 flex items-center gap-2">
          <Flame className="w-6 h-6 fill-pink-500" />
          MovieMatch
        </h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {currentView === "swipe" && (
          <div className="pt-4 h-full flex flex-col justify-center">
            <SwipeDeck />
            <div className="text-center mt-6 text-zinc-500 text-sm animate-pulse">
              Swipe Right to Save • Up to Super Like
            </div>
          </div>
        )}
        {currentView === "watchlist" && (
          <WatchlistView title="Watchlist" movies={watchlist} />
        )}
        {currentView === "mustWatch" && (
          <WatchlistView title="Must Watch" movies={mustWatchList} />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md rounded-full px-6 py-3 border border-zinc-800 shadow-2xl z-40 flex items-center gap-8">
        <button
          onClick={() => setCurrentView("swipe")}
          className={`flex flex-col items-center gap-1 transition-colors ${currentView === "swipe" ? "text-pink-500" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          <Flame className={`w-6 h-6 ${currentView === "swipe" ? "fill-pink-500" : ""}`} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Discover</span>
        </button>

        <button
          onClick={() => setCurrentView("watchlist")}
          className={`flex flex-col items-center gap-1 transition-colors ${currentView === "watchlist" ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          <List className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Watchlist</span>
        </button>

        <button
          onClick={() => setCurrentView("mustWatch")}
          className={`flex flex-col items-center gap-1 transition-colors ${currentView === "mustWatch" ? "text-purple-500" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          <Heart className={`w-6 h-6 ${currentView === "mustWatch" ? "fill-purple-500" : ""}`} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Must Watch</span>
        </button>
      </nav>
    </main>
  );
}
