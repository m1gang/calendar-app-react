import { useState } from "react";
import Modal from "react-modal"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const onCloseModal = () => {
        console.log("Cerrando modal");
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1>Hola</h1>
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, architecto. Iusto distinctio enim accusantium sequi ratione? Consequatur voluptas minima dolorum libero, ut commodi? Quibusdam minus, alias et in architecto unde!</p>
        </Modal>
    )
}
