import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api, { AUTH_PATH } from "../../utils/apiConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      const response = await api.post(`${AUTH_PATH}/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/"); // Redirige al home o dashboard
    } catch (err) {
      setError(
        err.response?.data?.message || "Credenciales incorrectas o error de servidor"
      );
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: 400 }}>
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h3 className="mb-4 text-center fs-2">Iniciar sesión</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fs-5">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control fs-5"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fs-5">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control fs-5"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-primary fs-5 py-2">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 