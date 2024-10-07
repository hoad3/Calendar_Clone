

// eslint-disable-next-line react/prop-types
import moment from "moment";
import Modal from "./InputCalendar.jsx";

// eslint-disable-next-line react/prop-types
const EventInfo = ({ events, isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold">Sự kiện trong ngày</h2>
            <ul className="mt-4">
                {/* eslint-disable-next-line react/prop-types */}
                {events.length > 0 ? (
                    // eslint-disable-next-line react/prop-types
                    events.map((event) => (
                        <li key={event.id} className="mb-2">
                            <strong>{event.title}</strong>: {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
                        </li>
                    ))
                ) : (
                    <p>Không có sự kiện nào trong ngày này.</p>
                )}
            </ul>
            <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Đóng
            </button>
        </Modal>
    );
};

export default EventInfo;
