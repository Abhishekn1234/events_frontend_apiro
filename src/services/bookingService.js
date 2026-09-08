
import api from "./api";


export const bookEvent = async (eventId, requestedTickets) => {
  const response = await api.post(`/events/${eventId}/book`, {
    requestedTickets,
  });

  return response.data;
};


export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");

  return response.data;
};

