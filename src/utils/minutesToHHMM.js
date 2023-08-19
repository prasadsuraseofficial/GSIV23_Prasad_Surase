export default function minutesToHHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes =
    remainingMinutes < 10
      ? `0${remainingMinutes}`
      : remainingMinutes.toString();

  return `${formattedHours}:${formattedMinutes}`;
}
