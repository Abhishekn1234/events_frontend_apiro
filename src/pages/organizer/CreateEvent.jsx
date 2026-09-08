import { useState } from "react";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createEvent } from "../../services/eventService";
import {
  FormField,
  InputField,
  PageHeader,
  SelectField,
  SubmitButton,
  TextAreaField,
} from "../../components/common/ui";
import { EVENT_CATEGORIES, getMinimumDateTime, validateEvent } from "../../utils/validation";
import { useOrganizerTheme } from "../../context/OrganizerThemeContext";

const initialForm = {
  title: "",
  description: "",
  category: "Music",
  date: "",
  location: "",
  ticketPrice: "",
  totalTickets: "",
};

export default function CreateEvent() {
  const { theme } = useOrganizerTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");

  const update = (event) => {
    if (event.target.name === "title") setTitleError("");
    if (event.target.name === "date") setDateError("");
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const validationError = validateEvent(form);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setSaving(true);
    try {
      await createEvent({
        ...form,
        ticketPrice: Number(form.ticketPrice),
        totalTickets: Number(form.totalTickets),
        date: new Date(form.date).toISOString(),
      });
      toast.success("Event created successfully");
      navigate("/organizer/events");
    } catch (error) {
      const message = error.response?.data?.message || "Unable to create event.";
      if (error.response?.status === 409) {
        if (message.toLowerCase().includes("title")) setTitleError(message);
        if (message.toLowerCase().includes("date")) setDateError(message);
      }
      toast.error(
        message
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${theme === "quiet" ? "bg-slate-900" : "bg-slate-50"}`}
      data-organizer-theme={theme}
    >
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/organizer/dashboard"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>
      
      <PageHeader
        eyebrow="Create event"
        title="Give people somewhere to gather."
        description="Add the essentials now. You can share the event once it is ready."
      />

      <form
        onSubmit={submit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Event title" htmlFor="event-title" error={titleError} className="sm:col-span-2">
            <InputField
              id="event-title"
              required
              name="title"
              value={form.title}
              onChange={update}
              placeholder="e.g. Future of Design"
              maxLength={150}
              aria-invalid={Boolean(titleError)}
            />
          </FormField>
          
          <FormField label="Description" htmlFor="event-description" className="sm:col-span-2">
            <TextAreaField
              id="event-description"
              required
              name="description"
              value={form.description}
              onChange={update}
              rows="4"
              placeholder="What should guests know?"
              maxLength={5000}
            />
          </FormField>
          
          <FormField label="Category" htmlFor="event-category">
            <SelectField
              id="event-category"
              name="category"
              value={form.category}
              onChange={update}
            >
                {EVENT_CATEGORIES.map(
                (category) => (
                  <option key={category}>{category}</option>
                )
              )}
            </SelectField>
          </FormField>
          
          <FormField label="Date and time" htmlFor="event-date" error={dateError}>
            <InputField
              id="event-date"
              required
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={update}
              min={getMinimumDateTime()}
              aria-invalid={Boolean(dateError)}
            />
          </FormField>
          
          <FormField label="Location" htmlFor="event-location" className="sm:col-span-2">
            <InputField
              id="event-location"
              required
              name="location"
              value={form.location}
              onChange={update}
              placeholder="Venue or online link"
              maxLength={250}
            />
          </FormField>
          
          <FormField label="Ticket price" htmlFor="event-price" hint="Set 0 for a free event.">
            <InputField
              id="event-price"
              required
              min="0"
              step="0.01"
              type="number"
              name="ticketPrice"
              value={form.ticketPrice}
              onChange={update}
              placeholder="0"
            />
          </FormField>
          
          <FormField label="Total tickets" htmlFor="event-tickets">
            <InputField
              id="event-tickets"
              required
              min="1"
              step="1"
              type="number"
              name="totalTickets"
              value={form.totalTickets}
              onChange={update}
              placeholder="100"
            />
          </FormField>
        </div>

        <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
          <SubmitButton loading={saving} loadingLabel="Publishing..." icon={CalendarPlus}>
            Publish event
          </SubmitButton>
        </div>
      </form>
      </div>
    </div>
  );
}
