import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50";

export function FormField({ label, htmlFor, hint, error, children, className = "" }) {
  return (
    <label htmlFor={htmlFor} className={`block ${className}`}>
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-slate-400">{hint}</span>
      ) : null}
    </label>
  );
}

export function InputField({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      )}
      <input
        {...props}
        className={`${inputClass} ${Icon ? "pl-11" : ""} ${className}`}
      />
    </div>
  );
}

export function PasswordField({ showLabel = "Show password", hideLabel = "Hide password", ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <InputField {...props} type={visible ? "text" : "password"} className="pr-12" />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label={visible ? hideLabel : showLabel}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export function SelectField({ children, className = "", ...props }) {
  return (
    <select {...props} className={`${inputClass} ${className}`}>
      {children}
    </select>
  );
}

export function TextAreaField({ className = "", ...props }) {
  return <textarea {...props} className={`${inputClass} ${className}`} />;
}

export function SubmitButton({ children, loading = false, loadingLabel = "Saving...", icon: Icon, className = "" }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? <LoaderCircle size={18} className="animate-spin" /> : Icon && <Icon size={18} />}
      {loading ? loadingLabel : children}
    </button>
  );
}

export function IconButton({ label, icon: Icon, className = "", ...props }) {
  return (
    <button
      {...props}
      type={props.type || "button"}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = "indigo",
}) {
  const accents = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accents[accent]}`}
        >
          <Icon size={19} />
        </span>
      </div>
      {detail && <p className="mt-3 text-xs font-medium text-slate-400">{detail}</p>}
    </div>
  );
}

export function StatusBadge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <p className="text-lg font-bold text-slate-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-16 text-sm font-semibold text-slate-500">
      <LoaderCircle className="mr-2 animate-spin" size={18} />
      Loading workspace
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="flex flex-col items-center gap-3 text-sm font-semibold text-slate-500">
        <LoaderCircle className="animate-spin text-indigo-600" size={30} />
        <span>Loading Evently</span>
      </div>
    </div>
  );
}

export function ErrorState({ title = "Unable to load data", message, action }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-14 text-center">
      <p className="text-lg font-bold text-red-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-red-700">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}