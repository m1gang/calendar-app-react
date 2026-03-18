import { addHours } from "date-fns";
import { useUiStore } from "../../hooks"
import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabAddNew = () => {

    const {openDateModal} = useUiStore();
    const {setActiveEvent} = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#eb4b4c',
            user: {
                _id: '123',
                name: 'Miguel'
            }
        });
        openDateModal();
    }

  return (
    <button 
    className='btn btn-primary fab'
    onClick={handleClickNew}
    >
        <i className="fas fa-plus "></i>
    </button>
  )
}
