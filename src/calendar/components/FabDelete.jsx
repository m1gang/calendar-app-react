import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => startDeletingEvent();

  return (
    <button
      type="button"
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      aria-label="Eliminar evento seleccionado"
      title="Eliminar evento seleccionado"
      style={{
        display: hasEventSelected ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt" aria-hidden="true"></i>
    </button>
  );
};
