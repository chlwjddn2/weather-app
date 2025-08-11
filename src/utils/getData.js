export default function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0부터 시작하니까 +1
  const day = now.getDate();

  return `${year}년 ${month}월 ${day}일`;
}