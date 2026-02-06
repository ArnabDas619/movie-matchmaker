"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Movie } from "@/lib/types";
import { fetchMovies } from "@/lib/movies";

interface MovieContextType {
    movies: Movie[]; // The current stack of movies to show
    watchlist: Movie[];
    mustWatchList: Movie[];
    seenIds: Set<string>;
    loading: boolean;
    handleSwipeRight: (movie: Movie) => void;
    handleSwipeLeft: (movie: Movie) => void;
    handleSwipeUp: (movie: Movie) => void;
    removeMovieFromStack: (id: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [watchlist, setWatchlist] = useState<Movie[]>([]);
    const [mustWatchList, setMustWatchList] = useState<Movie[]>([]);
    const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovies() {
            setLoading(true);
            try {
                const data = await fetchMovies();
                setMovies(data);
            } catch (error) {
                console.error("Failed to load movies", error);
            } finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, []);

    const removeMovieFromStack = (id: string) => {
        setMovies((prev) => prev.filter((m) => m.id !== id));
        setSeenIds((prev) => new Set(prev).add(id));
    };

    const handleSwipeRight = (movie: Movie) => {
        setWatchlist((prev) => [...prev, movie]);
        removeMovieFromStack(movie.id);
    };

    const handleSwipeLeft = (movie: Movie) => {
        // Just remove from stack, maybe track in seenIds (already done in removeMovieFromStack)
        removeMovieFromStack(movie.id);
    };

    const handleSwipeUp = (movie: Movie) => {
        setMustWatchList((prev) => [...prev, movie]);
        // Also add to watchlist? Or separate? Usually separate or inclusive.
        // Let's keep it separate for now, or maybe add to both.
        // "save that movie to a must watch list" - implies specific list.
        removeMovieFromStack(movie.id);
    };

    return (
        <MovieContext.Provider
            value={{
                movies,
                watchlist,
                mustWatchList,
                seenIds,
                loading,
                handleSwipeRight,
                handleSwipeLeft,
                handleSwipeUp,
                removeMovieFromStack,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export function useMovieContext() {
    const context = useContext(MovieContext);
    if (context === undefined) {
        throw new Error("useMovieContext must be used within a MovieProvider");
    }
    return context;
}
