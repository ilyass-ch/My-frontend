import React, { useState,useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/login/LoginSlice";
import { Navigate, Link, useNavigate  } from "react-router-dom";
import { Spin } from "antd";


import Image from "../assets/image.webp";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../features/auth/login/LoginStyle.css";

const LoginPage = () => {
  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});
  console.log(auth);
  const { accessToken, loading, error } = useSelector((state) => {
    console.log("access token ",state.auth);
    return state.auth || { accessToken: null, loading: false, error: null };
  });

  const navigate = useNavigate();



  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Veuillez remplir tous les champs.");
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/", { state: { showLoginSuccess: true } });
    }
  }, [accessToken, navigate]);

  return (
    <div className="login-main">
      {/* LEFT: Image */}
      <div className="login-left">
        <img src={Image} alt="Illustration" />
      </div>

      {/* RIGHT: Form */}
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="login-center">
            <h2 style={{ color: "#141f50" }}>Bienvenue !</h2>
            <p>Veuillez entrer vos identifiants</p>

            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">Se souvenir de moi</label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Mot de passe oublié ?
                </a>
              </div>

              <div className="login-center-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? <Spin size="small" /> : "Se connecter"}
                </button>
                <button type="button" className="google-btn">
                  <img src={GoogleSvg} alt="Google" />
                  Connexion avec Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
