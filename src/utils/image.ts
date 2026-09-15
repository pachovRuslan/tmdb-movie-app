export const getImageUrl = (path: string | null, size: string = 'w342'): string => {
    if (!path) {
        return 'https://placehold.co/342x513?text=No+Poster';
    }
    return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}/${path}`;
};