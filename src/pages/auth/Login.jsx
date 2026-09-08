
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Mail,
  Lock,
  ArrowRight,
  Ticket,
} from "lucide-react";
import toast from "react-hot-toast";

import useAuthStore from "../../store/auth";
import { loginUser } from "../../services/authService";
import {
  FormField,
  InputField,
  PasswordField,
  SubmitButton,
} from "../../components/common/ui";
import { validateLogin } from "../../utils/validation";

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    const validationError = validateLogin(form);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        ...form,
        email: form.email.trim(),
      });

      setAuth(data.user, data.token);

      toast.success("Welcome back!");

      if (data.user.role === "ORGANIZER") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
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

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 text-sm">
              <Ticket size={16} />
              Discover unforgettable experiences
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Your next great
              <span className="block text-indigo-200">
                experience starts here.
              </span>
            </h1>

            <p className="mt-6 text-indigo-100 text-lg leading-8">
              Discover amazing events, book your tickets,
              and create unforgettable memories.
            </p>

          </div>

          <div className="flex gap-8 text-sm text-indigo-100">
            <span>10K+ Events</span>
            <span>50K+ Attendees</span>
            <span>Trusted Platform</span>
          </div>

        </div>

        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-purple-400/20" />

      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="flex lg:hidden justify-center items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <CalendarDays size={21} />
            </div>

            <span className="text-2xl font-bold">
              Evently
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to continue to your Evently account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <FormField label="Email address" htmlFor="login-email">
              <InputField
                id="login-email"
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

            <FormField label="Password" htmlFor="login-password">
              <PasswordField
                id="login-password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                icon={Lock}
                required
                maxLength={128}
              />
            </FormField>

            <SubmitButton loading={loading} loadingLabel="Signing in" icon={ArrowRight} className="h-12 w-full">
              Sign in
            </SubmitButton>

          </form>

          <p className="text-center text-sm text-slate-500 mt-7">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600"
            >
              Create account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;
