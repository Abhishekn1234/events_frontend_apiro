export const EVENT_CATEGORIES = ["Music", "Tech", "Workshop", "Sports", "Other"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) =>
  emailPattern.test(String(email || "").trim())
    ? ""
    : "Please provide a valid email address.";

export const validateRegistration = ({ name = "", email = "", password = "", role = "" } = {}) => {
  if (!name.trim() || !email.trim() || !password || !role) {
    return "Please fill in all fields.";
  }
  if (name.trim().length < 2 || name.trim().length > 80) {
    return "Name must be between 2 and 80 characters.";
  }
  if (validateEmail(email)) return validateEmail(email);
  if (password.trim().length === 0 || password.length < 8 || password.length > 128) {
    return "Password must be between 8 and 128 characters.";
  }
  if (!["CUSTOMER", "ORGANIZER"].includes(role)) return "Please choose a valid role.";

  return "";
};

export const validateLogin = ({ email = "", password = "" } = {}) => {
  if (!email.trim() || !password) return "Please fill in all fields.";
  if (validateEmail(email)) return validateEmail(email);
  if (password.trim().length === 0) return "Password cannot be blank.";
  if (password.length > 128) return "Password is too long.";

  return "";
};

export const validateEvent = ({ title, description, category, date, location, ticketPrice, totalTickets }) => {
  if (!title.trim() || !description.trim() || !category || !date || !location.trim() || ticketPrice === "" || totalTickets === "") {
    return "Please fill in all event fields.";
  }
  if (title.trim().length < 3 || title.trim().length > 150) return "Title must be between 3 and 150 characters.";
  if (description.trim().length < 10 || description.trim().length > 5000) return "Description must be between 10 and 5000 characters.";
  if (!EVENT_CATEGORIES.includes(category)) return "Please choose a valid category.";
  if (new Date(date).getTime() <= Date.now()) return "Event date must be in the future.";

  const price = Number(ticketPrice);
  const tickets = Number(totalTickets);
  if (!Number.isFinite(price) || price < 0 || price > 100000000) return "Ticket price must be a valid non-negative amount.";
  if (!Number.isInteger(tickets) || tickets < 1 || tickets > 100000000) return "Total tickets must be a whole number between 1 and 100000000.";
  if (location.trim().length < 2 || location.trim().length > 250) return "Location must be between 2 and 250 characters.";

  return "";
};

export const getMinimumDateTime = () => {
  const date = new Date(Date.now() + 60 * 1000);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000).toISOString().slice(0, 16);
};
