export default function conversion(rawRating: number) {
  const num = (rawRating / 10) * 5;
  return Math.round(num * 10) / 10;
}
