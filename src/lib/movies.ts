import { Movie } from "./types";

export const MOCK_MOVIES: Movie[] = [
    {
        id: "1",
        title: "Inception",
        posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        rating: 8.8,
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
        languages: ["English", "Japanese", "French"],
        genres: ["Sci-Fi", "Action", "Thriller"],
        releaseYear: 2010,
    },
    {
        id: "2",
        title: "Interstellar",
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniL6E8ahDaNBkRLTiNOSjM.jpg",
        rating: 8.6,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        languages: ["English"],
        genres: ["Sci-Fi", "Drama", "Adventure"],
        releaseYear: 2014,
    },
    {
        id: "3",
        title: "The Dark Knight",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: 9.0,
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        languages: ["English"],
        genres: ["Action", "Crime", "Drama"],
        releaseYear: 2008,
    },
    {
        id: "4",
        title: "Parasite",
        posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        rating: 8.5,
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
        languages: ["Korean"],
        genres: ["Comedy", "Thriller", "Drama"],
        releaseYear: 2019,
    },
    {
        id: "5",
        title: "Spider-Man: Across the Spider-Verse",
        posterUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        rating: 8.7,
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
        cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
        languages: ["English"],
        genres: ["Animation", "Action", "Adventure"],
        releaseYear: 2023,
    },
];

export async function fetchMovies(): Promise<Movie[]> {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_MOVIES);
        }, 500);
    });
}
