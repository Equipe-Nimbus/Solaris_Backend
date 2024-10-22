export function unix_to_date(unix: number): Date {
    let date = new Date(unix * 1000);
    date.setHours(date.getHours() - 3); // Ajusta para o fuso horário de Brasília
    return date;
}