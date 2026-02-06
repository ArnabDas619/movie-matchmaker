"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Movie } from "@/lib/types";
import { Star } from "lucide-react";

interface MovieCardProps {
    movie: Movie;
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    onSwipeUp: () => void;
    onClick: () => void;
    isFront: boolean;
}

export function MovieCard({
    movie,
    onSwipeRight,
    onSwipeLeft,
    onSwipeUp,
    onClick,
    isFront,
}: MovieCardProps) {
    const [exitX, setExitX] = useState<number | null>(null);
    const [exitY, setExitY] = useState<number | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (!isFront) return;

        const threshold = 100;
        const upThreshold = -100;

        if (info.offset.x > threshold) {
            setExitX(200);
            onSwipeRight();
        } else if (info.offset.x < -threshold) {
            setExitX(-200);
            onSwipeLeft();
        } else if (info.offset.y < upThreshold) {
            setExitY(-200);
            onSwipeUp();
        } else {
            // Snap back
            x.set(0);
            y.set(0);
        }
    };

    if (!isFront) {
        return (
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800 scale-95 opacity-50 transform translate-y-4 -z-10">
                {/* Background card placeholder style */}
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover grayscale opacity-30"
                    draggable={false}
                />
            </div>
        )
    }

    return (
        <motion.div
            style={{ x, y, rotate, opacity }}
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            animate={exitX !== null ? { x: exitX * 5, opacity: 0 } : exitY !== null ? { y: exitY * 5, opacity: 0 } : {}}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800 cursor-grab active:cursor-grabbing"
            onClick={onClick}
        >
            <div className="relative w-full h-full">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10 pointer-events-none" />

                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover pointer-events-none"
                />

                <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
                    <div className="flex justify-between items-end mb-2">
                        <h2 className="text-3xl font-bold leading-tight drop-shadow-md">{movie.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-lg font-semibold">{movie.rating}</span>
                        <span className="text-sm text-zinc-300">• {movie.releaseYear}</span>
                        <span className="text-sm text-zinc-300">• {movie.genres[0]}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
