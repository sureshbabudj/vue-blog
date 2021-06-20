export default function (value) {
  const val = new Date(value);
  const date = [val.getDate(), val.getMonth() + 1, val.getFullYear()];
  const time = [val.getHours(), val.getMinutes()];
  return `${date.join("/")} ${time.join(":")}`;
}
