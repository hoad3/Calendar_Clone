//eslint-disable-next-line react/prop-types
import {enqueueSnackbar} from "notistack";

//eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, onSave, newEvent, setNewEvent }) => {
    if (!isOpen) return null; // Không hiển thị modal nếu `isOpen` là false

    const handleTimeChange = (time, type) => {
        const [hours, minutes] = time.split(':'); // Tách giờ và phút
        const updatedEvent = { ...newEvent };

        if (type === 'start') {
            // Cập nhật thời gian bắt đầu
            const newStart = new Date(updatedEvent.start);
            newStart.setHours(hours, minutes);
            updatedEvent.start = newStart;

            // Cập nhật thời gian kết thúc nếu cần
            if (updatedEvent.end < newStart) {
                enqueueSnackbar("Thời gian kết thúc đã được tự động điều chỉnh để phù hợp.", { variant: "warning" });
                updatedEvent.end = new Date(newStart);
                updatedEvent.end.setHours(newStart.getHours() + 1); // Cộng thêm 1 giờ
            }
        } else if (type === 'end') {
            // Cập nhật thời gian kết thúc
            const newEnd = new Date(updatedEvent.start);
            newEnd.setHours(hours, minutes);

            // Nếu thời gian kết thúc nhỏ hơn hoặc bằng thời gian bắt đầu, cộng thêm một giờ
            if (newEnd < updatedEvent.start) {

                enqueueSnackbar("Thời gian kết thúc không thể nhỏ hơn hoặc bằng thời gian bắt đầu. Nó đã được tự động điều chỉnh.", { variant: "warning" });
                newEnd.setHours(updatedEvent.start.getHours() + 1);
                updatedEvent.end = newEnd; // Cập nhật thời gian kết thúc
            }

            else if(newEnd == updatedEvent.end)
            {
                newEnd.setHours(updatedEvent.start.getDate() + 1);
            }

        }

        setNewEvent(updatedEvent); // Cập nhật trạng thái sự kiện
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-bold mb-4">Thêm sự kiện mới</h2>

                {/* Trường nhập tiêu đề sự kiện */}
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Tiêu đề sự kiện"
                    //eslint-disable-next-line react/prop-types
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />

                {/* Trường nhập thời gian bắt đầu */}
                <label className="block mb-2">Thời gian bắt đầu:</label>
                <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    //eslint-disable-next-line react/prop-types
                    value={newEvent.start.toTimeString().substring(0, 5)}
                    onChange={(e) => handleTimeChange(e.target.value, 'start')}
                />

                {/* Trường nhập thời gian kết thúc */}
                <label className="block mb-2">Thời gian kết thúc:</label>
                <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    //eslint-disable-next-line react/prop-types
                    value={newEvent.end.toTimeString().substring(0, 5)}
                    onChange={(e) => handleTimeChange(e.target.value, 'end')}
                />

                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={onSave}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

