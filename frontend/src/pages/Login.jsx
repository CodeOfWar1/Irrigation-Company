import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer";
import { useDocTitle } from "../components/CustomHook";

const Login = () => {
  useDocTitle("Login | Lawn Irrigation Technologies");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [isForgot, setIsForgot] = useState(false);
  const navigate = useNavigate();

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/appointments");
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("error");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
    } else {
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      navigate("/appointments");
    }
    setLoading(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("error");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/update-password`,
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
    } else {
      setMessage("Password reset email sent. Check your inbox.");
      setMessageType("success");
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero strip */}
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-800 text-white py-8 sm:py-10 md:py-14">
          <div className="m-auto max-w-4xl px-4 text-center">
            <p className="text-green-200 text-xs sm:text-sm font-semibold uppercase tracking-widest">
              Client portal
            </p>
            <h1 className="mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">
              {isForgot ? "Reset Password" : "Sign In"}
            </h1>
            <p className="mt-2 text-green-100 text-sm sm:text-lg max-w-xl mx-auto">
              {isForgot
                ? "Enter your email and we'll send you a reset link."
                : "Sign in to manage your appointments and projects."}
            </p>
          </div>
        </div>

        <div className="m-auto max-w-md px-4 -mt-6 relative z-10 pb-16">
          <div
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            data-aos="fade-up"
          >
            <div className="border-l-4 border-green-900 bg-green-50/60 px-5 py-4">
              <h2 className="text-lg font-bold text-green-900">
                {isForgot ? "Reset your password" : "Welcome back"}
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                {isForgot
                  ? "We'll email you a secure link to create a new password."
                  : "Enter your credentials to access your account."}
              </p>
            </div>

            <form
              onSubmit={isForgot ? handleReset : handleLogin}
              className="p-6 sm:p-8 space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow"
                  placeholder="you@example.com"
                />
              </div>

              {!isForgot && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-3d w-full bg-green-900 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {loading
                  ? "Processing..."
                  : isForgot
                  ? "Send reset link"
                  : "Sign in"}
              </button>
            </form>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
              <div className="text-center">
                {!isForgot ? (
                  <button
                    type="button"
                    onClick={() => { setIsForgot(true); setMessage(""); }}
                    className="text-sm font-semibold text-green-900 hover:text-green-700 hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setIsForgot(false); setMessage(""); }}
                    className="text-sm font-semibold text-green-900 hover:text-green-700 hover:underline transition-colors"
                  >
                    Back to sign in
                  </button>
                )}
              </div>

              {message && (
                <div
                  className={`text-center text-sm font-medium p-3 rounded-xl ${
                    messageType === "success"
                      ? "text-green-800 bg-green-50 border border-green-200"
                      : "text-red-700 bg-red-50 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="pt-2 text-center">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  ← Back to home
                </Link>
              </div>

              <p className="text-center text-xs text-gray-400 pt-2">
                Account creation is by invitation only. Contact us for access.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
