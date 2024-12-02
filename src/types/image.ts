export interface Image {
    id: string
    thumbnail: string;
    tiff: string;
    data: string;
    bbox: number[];
    mascara?: string;
    download_links?: string;
    estatistica_fundo?: string;
    estatistica_nuvem?: string;
    estatistica_sombra?: string;
}