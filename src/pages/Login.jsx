import React, { useState, useEffect } from "react"; // Added useEffect
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const navigate = useNavigate();

  // --- ADDED: Check if user is already logged in ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/appointments");
      }
    };
    
    checkUser();
  }, [navigate]);
  // ------------------------------------------------

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      console.log(error);
    } else {
      setMessage("Login successful!");
      navigate("/appointments");
    }

    setLoading(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Note: Update this URL for your production environment later
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password reset email sent.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center">
          {isForgot ? "Reset Password" : "Welcome Back"}
        </h2>

        <form
          onSubmit={isForgot ? handleReset : handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-900 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          {!isForgot && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-900 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-900 hover:bg-green-800 text-white font-bold py-2.5 rounded-xl transition duration-300 shadow-lg disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : isForgot
              ? "Send Reset Link"
              : "Login"}
          </button>
        </form>

        <div className="mt-5 text-center">
          {!isForgot ? (
            <button
              onClick={() => setIsForgot(true)}
              className="text-sm font-semibold text-green-900 hover:underline"
            >
              Forgot Password?
            </button>
          ) : (
            <button
              onClick={() => setIsForgot(false)}
              className="text-sm font-semibold text-green-900 hover:underline"
            >
              Back to Login
            </button>
          )}
        </div>

        {message && (
          <div className="mt-4 text-center text-sm font-medium text-red-500 bg-red-50 p-2 rounded-lg">
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-400">
          No account creation available.
        </div>
      </div>
    </div>
  );
};

export default Login;