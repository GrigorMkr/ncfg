export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getInitials(fullName: string): string {
  const parts = fullName.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
}
