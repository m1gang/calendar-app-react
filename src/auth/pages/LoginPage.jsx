import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import "./LoginPage.css";
import { sileo } from "sileo";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const passwordsMismatch =
    registerPassword2.length > 0 && registerPassword !== registerPassword2;

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = (event) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2) {
      sileo.error({
        title: "Error de autenticación",
        description: (
          <span className="text-white font-medium text-center">
            Las contraseñas no coinciden
          </span>
        ),
        fill: "dark",
      });
      return;
    }
    startRegister({
      email: registerEmail,
      name: registerName,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      sileo.error({
        title: "Error de autenticación",
        description: (
          <span className="text-white font-medium text-center">
            {errorMessage}
          </span>
        ),
        fill: "dark",
      });
    }
  }, [errorMessage]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <div className="auth-brand">
            <span className="auth-brand-icon">
              <i className="fa-regular fa-calendar-days"></i>
            </span>
            Calendar App
          </div>
          <p className="auth-subtitle">
            Organiza tus eventos y mantén tu agenda al día
          </p>
        </header>

        <div className="auth-body">
          <section className="auth-panel login-form-1">
            <h3 className="auth-title">
              <i className="fa-solid fa-right-to-bracket"></i> Ingreso
            </h3>
            <p className="auth-hint">Bienvenido de nuevo, ingresa a tu cuenta</p>
            <form onSubmit={loginSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="loginEmail">
                  Correo
                </label>
                <div className="auth-input-group">
                  <span className="auth-input-icon">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    id="loginEmail"
                    type="email"
                    className="form-control auth-input"
                    placeholder="tucorreo@ejemplo.com"
                    name="loginEmail"
                    value={loginEmail}
                    onChange={onLoginInputChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="loginPassword">
                  Contraseña
                </label>
                <div className="auth-input-group">
                  <span className="auth-input-icon">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    id="loginPassword"
                    type={showLoginPassword ? "text" : "password"}
                    className="form-control auth-input auth-input-with-toggle"
                    placeholder="••••••••"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={onLoginInputChange}
                    autoComplete="current-password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="auth-toggle"
                    onClick={() => setShowLoginPassword((v) => !v)}
                    aria-label={
                      showLoginPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                    title={
                      showLoginPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    <i
                      className={
                        showLoginPassword
                          ? "fa-regular fa-eye-slash"
                          : "fa-regular fa-eye"
                      }
                    ></i>
                  </button>
                </div>
              </div>
              <div className="auth-actions">
                <button type="submit" className="btnSubmit auth-btn">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <span>Ingresar</span>
                </button>
              </div>
            </form>
          </section>

          <div className="auth-divider" aria-hidden="true"></div>

          <section className="auth-panel login-form-2">
            <h3 className="auth-title auth-title-light">
              <i className="fa-solid fa-user-plus"></i> Registro
            </h3>
            <p className="auth-hint auth-hint-light">
              Crea tu cuenta en segundos
            </p>
            <form onSubmit={registerSubmit}>
              <div className="auth-field">
                <label className="auth-label-light" htmlFor="registerName">
                  Nombre
                </label>
                <div className="auth-input-group">
                  <span className="auth-input-icon">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    id="registerName"
                    type="text"
                    className="form-control auth-input"
                    placeholder="Tu nombre"
                    name="registerName"
                    value={registerName}
                    onChange={onRegisterInputChange}
                    autoComplete="name"
                    required
                    minLength={2}
                  />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label-light" htmlFor="registerEmail">
                  Correo
                </label>
                <div className="auth-input-group">
                  <span className="auth-input-icon">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    id="registerEmail"
                    type="email"
                    className="form-control auth-input"
                    placeholder="tucorreo@ejemplo.com"
                    name="registerEmail"
                    value={registerEmail}
                    onChange={onRegisterInputChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="auth-field-row">
                <div className="auth-field">
                  <label
                    className="auth-label-light"
                    htmlFor="registerPassword"
                  >
                    Contraseña
                  </label>
                  <div className="auth-input-group">
                    <input
                      id="registerPassword"
                      type={showRegisterPassword ? "text" : "password"}
                      className="form-control auth-input auth-input-with-toggle"
                      placeholder="Mínimo 6 caracteres"
                      name="registerPassword"
                      value={registerPassword}
                      onChange={onRegisterInputChange}
                      autoComplete="new-password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="auth-toggle auth-toggle-light"
                      onClick={() => setShowRegisterPassword((v) => !v)}
                      aria-label={
                        showRegisterPassword
                          ? "Ocultar contraseñas"
                          : "Mostrar contraseñas"
                      }
                      title={
                        showRegisterPassword
                          ? "Ocultar contraseñas"
                          : "Mostrar contraseñas"
                      }
                    >
                      <i
                        className={
                          showRegisterPassword
                            ? "fa-regular fa-eye-slash"
                            : "fa-regular fa-eye"
                        }
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <label
                    className="auth-label-light"
                    htmlFor="registerPassword2"
                  >
                    Repetir
                  </label>
                  <input
                    id="registerPassword2"
                    type={showRegisterPassword ? "text" : "password"}
                    className={`form-control auth-input ${
                      passwordsMismatch ? "auth-input-error" : ""
                    }`}
                    placeholder="Repite tu contraseña"
                    name="registerPassword2"
                    value={registerPassword2}
                    onChange={onRegisterInputChange}
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {passwordsMismatch && (
                <p className="auth-error" role="alert">
                  <i className="fa-solid fa-circle-exclamation"></i> Las
                  contraseñas no coinciden
                </p>
              )}

              <div className="auth-actions">
                <button
                  type="submit"
                  className="btnSubmit auth-btn auth-btn-light"
                >
                  <i className="fa-solid fa-check"></i>
                  <span>Crear cuenta</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
