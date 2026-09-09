
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Mail,
  Lock,
  User,
  ArrowRight,
  UserRound,
  Building2,
} from "lucide-react";
import toast from "react-hot-toast";

import useAuthStore from "../../store/auth";
import { registerUser } from "../../services/authService";
import {
  FormField,
  InputField,
  PasswordField,
  SubmitButton,
} from "../../components/common/ui";
import { validateRegistration } from "../../utils/validation";
import { getApiErrorMessage, MESSAGES } from "../../constants/messages";

const Register = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateRegistration(form);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
      });

      setAuth(data.user, data.token);

      toast.success("Account created successfully!");

      if (data.user.role === "ORGANIZER") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, MESSAGES.auth.registrationFailed)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-600">

        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700" />

        <div className="relative z-10 p-12 flex flex-col justify-between w-full text-white">

          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <CalendarDays size={24} />
            </div>

            <span className="text-2xl font-bold">
              Evently
            </span>
          </Link>

          <div className="max-w-lg">

            <h1 className="text-5xl font-bold leading-tight">
              Bring people together.
              <span className="block text-indigo-200">
                Create memorable events.
              </span>
            </h1>

            <p className="mt-6 text-indigo-100 text-lg leading-8">
              Whether you're discovering events or creating
              them, Evently makes everything simple.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="p-5 rounded-2xl bg-white/10 border border-white/10">
                <UserRound size={24} />
                <p className="mt-3 font-semibold">
                  For Customers
                </p>
                <p className="text-sm text-indigo-100 mt-1">
                  Discover and book events.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/10">
                <Building2 size={24} />
                <p className="mt-3 font-semibold">
                  For Organizers
                </p>
                <p className="text-sm text-indigo-100 mt-1">
                  Create and manage events.
                </p>
              </div>

            </div>

          </div>

          <p className="text-sm text-indigo-100">
            Join thousands of people using Evently.
          </p>

        </div>

      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <Link
            to="/"
            className="flex lg:hidden justify-center items-center gap-2 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <CalendarDays size={21} />
            </div>

            <span className="text-2xl font-bold">
              Evently
            </span>
          </Link>

          <div className="mb-7">
            <h2 className="text-3xl font-bold text-slate-900">
              Create your account
            </h2>

            <p className="mt-2 text-slate-500">
              Get started with Evently today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <FormField label="Full name" htmlFor="register-name">
              <InputField
                id="register-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                icon={User}
                required
                maxLength={80}
              />
            </FormField>

            <FormField label="Email address" htmlFor="register-email">
              <InputField
                id="register-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                icon={Mail}
                required
                maxLength={254}
              />
            </FormField>

            <FormField label="Password" htmlFor="register-password" hint="Use 8 to 128 characters.">
              <PasswordField
                id="register-password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                icon={Lock}
                required
                minLength={8}
                maxLength={128}
              />
            </FormField>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                I want to
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      role: "CUSTOMER",
                    })
                  }
                  className={`p-4 rounded-xl border text-left transition ${
                    form.role === "CUSTOMER"
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <UserRound
                    size={22}
                    className={
                      form.role === "CUSTOMER"
                        ? "text-indigo-600"
                        : "text-slate-400"
                    }
                  />

                  <p className="font-semibold mt-2">
                    Attend events
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Book tickets
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      role: "ORGANIZER",
                    })
                  }
                  className={`p-4 rounded-xl border text-left transition ${
                    form.role === "ORGANIZER"
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <Building2
                    size={22}
                    className={
                      form.role === "ORGANIZER"
                        ? "text-indigo-600"
                        : "text-slate-400"
                    }
                  />

                  <p className="font-semibold mt-2">
                    Create events
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Manage events
                  </p>
                </button>

              </div>
            </div>

            <SubmitButton loading={loading} loadingLabel="Creating account" icon={ArrowRight} className="h-12 w-full">
              Create account
            </SubmitButton>

          </form>

          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600"
            >
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Register;

