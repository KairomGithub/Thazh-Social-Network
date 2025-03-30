export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short"
  });
}