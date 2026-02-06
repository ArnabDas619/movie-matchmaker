export interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    rating: number; // 0-10
    description: string;
    cast: string[];
    languages: string[];
    genres: string[];
    releaseYear: number;
}
