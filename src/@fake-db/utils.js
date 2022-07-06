function generateDayWiseTimeSeries(baseval, count, yrange) {
  const series = [];

  // eslint-disable-next-line
  for (let i = 0; i < count; i++) {
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([baseval, y]);
    baseval += 604800000;
  }
  return series;
}

export default generateDayWiseTimeSeries;
