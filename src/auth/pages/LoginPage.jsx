import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import "./LoginPage.css";
import { sileo } from "sileo";

const logingFormFields = {
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

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(logingFormFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

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
            <h3>Ingreso</h3>
            <form onSubmit={loginSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input type="submit" className="btnSubmit" value="Login" />
              </div>
            </form>
          </section>

          <div className="auth-divider" aria-hidden="true"></div>

          <section className="auth-panel login-form-2">
            <h3>Registro</h3>
            <form onSubmit={registerSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="registerName"
                  value={registerName}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                />
              </div>

              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña"
                  name="registerPassword2"
                  value={registerPassword2}
                  onChange={onRegisterInputChange}
                />
              </div>

              <div className="form-group mb-2">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Crear cuenta"
                />
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
