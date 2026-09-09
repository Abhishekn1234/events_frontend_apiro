
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageLoader } from "../components/common/ui";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

import Layout from "../layouts/Layout";

import useAuthStore from "../store/auth";
import { ProtectedRoute } from "./ProtectedRoute";
const CustomerDashboard = lazy(() => import("../pages/customer/CustomerDashboard"));
const EventDetails = lazy(() => import("../pages/customer/EventDetails"));
const MyBookings = lazy(() => import("../pages/customer/MyBookings"));
const OrganizerDashboard = lazy(() => import("../pages/organizer/OrganizerDashboard"));
const MyEvents = lazy(() => import("../pages/organizer/MyEvents"));
const CreateEvent = lazy(() => import("../pages/organizer/CreateEvent"));
const Attendees = lazy(() => import("../pages/organizer/Attendees"));







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

