export interface Image {
    id: string
    thumbnail: string;
    tiff: string;
    data: string;
    bbox: number[]
    mascara?: string;
}