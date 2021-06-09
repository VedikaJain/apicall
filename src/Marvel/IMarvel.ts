interface Thumbnail {
    extension: string;
    path: string;
}

export interface MarvelData {
    id: number;
    name: string;
    description: string;
    thumbnail: Thumbnail;
}