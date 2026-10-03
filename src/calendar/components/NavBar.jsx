import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = () => {
  const { startLogout, user } = useAuthStore();
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt" aria-hidden="true"></i>
        &nbsp; {user.name}
      </span>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={startLogout}
      >
        <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
