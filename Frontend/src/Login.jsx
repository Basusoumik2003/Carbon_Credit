import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onClose, onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError({ general: data.message || "Invalid credentials" });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (onLogin) onLogin(data.user);
      if (onClose) onClose();

      if (data.user.role === "user") {
        navigate("/userDashboard");
      } else if (data.user.role === "organization") {
        navigate("/orgDashboard");
      }

    } catch (err) {
      setError({ general: "Server error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal login-modal">
        <div className="modal-header">
          <h2>Welcome Back</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="role-selector">
            {["user", "organization"].map((role) => (
              <label key={role} className="role-option">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={formData.role === role}
                  onChange={handleChange}
                />
                <div className="role-card">
                  <span className="role-icon">{role === "user" ? "👤" : "🏢"}</span>
                  <span className="role-title">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="Enter your password"
              required
            />
          </div>

          {error.general && <p className="error-text">{error.general}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Don’t have an account?{" "}
            <button className="link-btn" onClick={onSwitchToSignup}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
