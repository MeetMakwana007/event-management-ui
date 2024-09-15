export const checkExpiryStatus = (event) => {
  if (!event?.expiryTime) return event?.status;
  const expiryMinutes = +event.expiryTime;
  const eventDateTime = new Date(event.dateTime);

  const expiryDateTime = new Date(
    eventDateTime.getTime() + expiryMinutes * 60 * 1000
  );

  if (expiryDateTime < new Date()) {
    return "Expired";
  }
  return event.status || "Pending";
};
