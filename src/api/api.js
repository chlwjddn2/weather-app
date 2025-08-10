const API_KEY = 'fe7a63959f4875251b8082ecf6229447';

export default async function fetchWeather(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("날씨 정보를 가져오는 데 실패했습니다.");
  const data = await res.json();
  return data
}
