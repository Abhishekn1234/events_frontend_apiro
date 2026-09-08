
import { lazy, Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { PageLoader } from "../components/common/ui";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

import Layout from "../layouts/Layout";

import useAuthStore from "../store/auth";

const CustomerDashboard = lazy(() => import("../pages/customer/CustomerDashboard"));
const EventDetails = lazy(() => import("../pages/customer/EventDetails"));
const MyBookings = lazy(() => import("../pages/customer/MyBookings"));
const OrganizerDashboard = lazy(() => import("../pages/organizer/OrganizerDashboard"));
const MyEvents = lazy(() => import("../pages/organizer/MyEvents"));
const CreateEvent = lazy(() => import("../pages/organizer/CreateEvent"));
const Attendees = lazy(() => import("../pages/organizer/Attendees"));


const Home = () => (
  <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Events worth showing up for</p><h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 sm:text-7xl">Find your next <span className="text-indigo-600">favorite day.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">Discover thoughtful gatherings, book your place, and make room for something memorable.</p><Link to="/customer/dashboard" className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700">Explore events</Link></div></div>
);


const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return (
      <Navigate
        to={
          user?.role === "ORGANIZER"
            ? "/organizer/dashboard"
            : "/customer/dashboard"
        }
        replace
      />
    );
  }

  return children;
};


export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />


      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />



      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute role="CUSTOMER">
            <Layout>
              <CustomerDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/events/:id"
        element={
          <ProtectedRoute role="CUSTOMER">
            <Layout>
              <EventDetails />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/customer/my-bookings"
        element={
          <ProtectedRoute role="CUSTOMER">
            <Layout>
              <MyBookings />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/organizer/dashboard"
        element={
          <ProtectedRoute role="ORGANIZER">
            <Layout>
              <OrganizerDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="/organizer/events" element={<ProtectedRoute role="ORGANIZER"><Layout><MyEvents /></Layout></ProtectedRoute>} />
      <Route path="/organizer/events/new" element={<ProtectedRoute role="ORGANIZER"><Layout><CreateEvent /></Layout></ProtectedRoute>} />
      <Route path="/organizer/attendees" element={<ProtectedRoute role="ORGANIZER"><Layout><Attendees /></Layout></ProtectedRoute>} />


      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

      </Routes>
    </Suspense>
  );
}

