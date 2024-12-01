export const transformaBbox = (bbox: string): number[] => {
    return bbox.split(',').map(coord => parseFloat(coord));
}