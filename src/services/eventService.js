import api from "../api/api";

export const getEvents = async (params = {}) => {
  const response = await api.get("/events", {
    params,
  });

  return response.data;
};


export const getEventById = async (eventId) => {
  const response = await api.get(`/events/${eventId}`);

  return response.data;
};


export const createEvent = async (eventData) => {
  const response = await api.post("/events", eventData);

  return response.data;
};

export const getMyEvents = async () => {
  const response = await api.get("/events/organizer/my-events");

  return response.data;
};

export const getEventAttendees = async (eventId) => {
  const response = await api.get(`/events/${eventId}/attendees`);

  return response.data;
};
