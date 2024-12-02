export const converteDatetime = (datetime: string): [number, number] => {
  const [data1, data2] = datetime.split('/');
  

  const converterParaUnixtime = (data: string): number => {
    const [dia, mes, ano] = data.split('-').map(Number);
    const dataObjeto = new Date(dia, mes - 1, ano);
    return Math.floor(dataObjeto.getTime() / 1000);
  };

  const unixtime1 = converterParaUnixtime(data1);
  const unixtime2 = converterParaUnixtime(data2);
  const listaDatasOrdenadas: number[] = [unixtime1, unixtime2].sort((data1, data2) => data1 - data2);

  return [listaDatasOrdenadas[0],listaDatasOrdenadas[1]];
} 