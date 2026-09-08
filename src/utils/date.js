export const formatEventDateTime = (value) => {
  if (!value) return "Date and time TBA";

  const eventDate = new Date(value);
  if (Number.isNaN(eventDate.getTime())) return "Date and time TBA";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(eventDate)
    .replace(/\b(am|pm)\b/i, (period) => period.toUpperCase());
};
