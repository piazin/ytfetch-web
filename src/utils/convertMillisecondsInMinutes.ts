function convertMillisecondsInMinutes(milliseconds: string): string {
  return (Number(milliseconds) / 60000).toFixed(2);
}

export function getVideoDuration(milliseconds: string) {
  let minutes = convertMillisecondsInMinutes(milliseconds);
  minutes = minutes.replace(".", ":");

  return minutes;
}
