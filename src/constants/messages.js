export const MESSAGES = {
  actions: {
    retry: "Try again",
    clearFilters: "Clear filters",
  },
  errors: {
    loadEventsTitle: "Unable to load events",
    loadBookingsTitle: "Unable to load bookings",
    loadOrganizerEventsTitle: "Unable to load your events",
    loadDashboardTitle: "Unable to load your dashboard",
  },
  auth: {
    loginFailed: "Invalid email or password.",
    registrationFailed: "Registration failed. Please try again.",
  },
  bookings: {
    loadFailed: "Unable to load your bookings. Please try again.",
    bookingFailed: "Booking failed. Please try again.",
    confirmed: "Booking confirmed successfully!",
    chooseTicket: "Choose at least one ticket.",
    soldOut: "This event is sold out.",
    insufficientTickets: "Not enough tickets available.",
  },
  events: {
    loadFailed: "Unable to load events. Please try again.",
    detailsLoadFailed: "Unable to load event details. Please try again.",
    createFailed: "Unable to create event. Please try again.",
    organizerLoadFailed: "Unable to load your events. Please try again.",
    attendeesLoadFailed: "Unable to load attendees. Please try again.",
  },
};

export function getApiErrorMessage(error, fallback) {
  return error?.response?.data?.message || fallback;
}