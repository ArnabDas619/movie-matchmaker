"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/lib/types";
import { X, Star, Calendar, Globe, User } from "lucide-react";

interface MovieDetailsModalProps {
    movie: Movie | null;
    onClose: () => void;
}

export function MovieDetailsModal({ movie, onClose }: MovieDetailsModalProps) {
    if (!movie) return null;

    return (
        <AnimatePresence>
            {movie && (
                <React.Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 bg-zinc-900 w-full max-w-lg mx-auto rounded-t-3xl z-50 overflow-hidden shadow-2xl border-t border-zinc-800 flex flex-col max-h-[90vh] left-0 right-0 sm:inset-x-auto"
                    >
                        <div className="relative h-64 flex-shrink-0">
                            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover opactiy-60" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white backdrop-blur-md">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 pb-10">
                            <h2 className="text-3xl font-bold mb-2 text-white">{movie.title}</h2>

                            <div className="flex items-center gap-4 mb-6 text-sm text-zinc-300">
                                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {movie.rating}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {movie.releaseYear}</span>
                                <span className="bg-zinc-800 px-2 py-1 rounded-md">{movie.genres[0]}</span>
                            </div>

                            <p className="text-zinc-300 leading-relaxed mb-6">
                                {movie.description}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Cast</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.cast.map(actor => (
                                            <div key={actor} className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-full text-sm">
                                                <User className="w-3 h-3 text-zinc-400" /> {actor}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Languages</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.languages.map(lang => (
                                            <div key={lang} className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-full text-sm">
                                                <Globe className="w-3 h-3 text-zinc-400" /> {lang}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
}
