"use client";

import React, { useState } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { MovieCard } from "./MovieCard";
import { MovieDetailsModal } from "./MovieDetailsModal";
import { Movie } from "@/lib/types";

export default function SwipeDeck() {
    const { movies, loading, handleSwipeLeft, handleSwipeRight, handleSwipeUp } = useMovieContext();
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full text-center px-6">
                <h2 className="text-2xl font-bold mb-2">No more movies!</h2>
                <p className="text-zinc-400">Check back later or review your watchlist.</p>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-[360px] h-[600px] mx-auto">
            {movies.map((movie, index) => {
                // Only render the top few cards for performance
                const isFront = index === movies.length - 1;
                if (index < movies.length - 2) return null;

                return (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onSwipeLeft={() => handleSwipeLeft(movie)}
                        onSwipeRight={() => handleSwipeRight(movie)}
                        onSwipeUp={() => handleSwipeUp(movie)}
                        onClick={() => setSelectedMovie(movie)}
                        isFront={isFront}
                    />
                );
            })}

            {/* Modal is rendered outside the mapping */}
            {selectedMovie && (
                <MovieDetailsModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
}
