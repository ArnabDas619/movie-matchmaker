"use client";

import React from "react";
import { Movie } from "@/lib/types";
import { Star, Trash2 } from "lucide-react";

interface WatchlistViewProps {
    title: string;
    movies: Movie[];
    onRemove?: (id: string) => void;
}

export function WatchlistView({ title, movies, onRemove }: WatchlistViewProps) {
    if (movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full pt-20 text-center px-6">
                <h2 className="text-xl font-semibold mb-2 text-zinc-500">Your {title} is empty</h2>
                <p className="text-zinc-600">Start swiping to add movies!</p>
            </div>
        )
    }

    return (
        <div className="pb-24 pt-4 px-4">
            <h2 className="text-2xl font-bold mb-4 px-2">{title}</h2>
            <div className="grid grid-cols-2 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="relative rounded-xl overflow-hidden aspect-[2/3] group bg-zinc-900">
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 p-3 w-full">
                                <p className="text-sm font-bold text-white truncate">{movie.title}</p>
                                <div className="flex items-center gap-1 text-xs text-zinc-300">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    {movie.rating}
                                </div>
                            </div>
                        </div>
                        {onRemove && (
                            <button
                                onClick={() => onRemove(movie.id)}
                                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-zinc-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
