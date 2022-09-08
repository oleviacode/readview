export default function currentDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const fullDate = day + '-' + month + '-' + year;
  return fullDate;
}
