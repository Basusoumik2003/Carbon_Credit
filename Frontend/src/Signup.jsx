import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError({ general: data.message || "Signup failed" });
        return;
      }

      // ✅ Save token and user/org to localStorage
      localStorage.setItem("token", data.token);

      if (data.user.role === "organization") {
        localStorage.setItem("organization", JSON.stringify(data.user));
        navigate("/orgDashboard");
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/userDashboard");
      }

      if (onClose) onClose();

    } catch (err) {
      setError({ general: "Server error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal signup-modal">
        <div className="modal-header">
          <h2>Create Account</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
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
                  <span className="role-title">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input"
              placeholder="Enter your name"
              required
            />
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
              placeholder="Enter a password"
              required
            />
          </div>

          {error.general && <p className="error-text">{error.general}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Already have an account?{" "}
            <button className="link-btn" onClick={onSwitchToLogin}>
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
