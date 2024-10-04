

// eslint-disable-next-line react/prop-types
const EventInfo = ({ event, onClose }) => {
    if (!event) return null; // Không hiển thị nếu không có sự kiện

    return (
        <div className="flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-bold mb-4">Thông tin sự kiện</h2>
                {Array.isArray(event) ? (
                    // eslint-disable-next-line react/prop-types
                    event.map((evt, index) => (
                        <div key={index}>
                            <p><strong>Tiêu đề:</strong> {evt.title}</p>
                            <p><strong>Ngày:</strong> {evt.start.toLocaleDateString()}</p>
                            <p><strong>Thời gian bắt đầu:</strong> {evt.start.toLocaleTimeString()}</p>
                            <p><strong>Thời gian kết thúc:</strong> {evt.end.toLocaleTimeString()}</p>
                            <hr className="my-2" />
                        </div>
                    ))
                ) : (
                    <div>
                        {/* eslint-disable-next-line react/prop-types */}
                        <p><strong>Tiêu đề:</strong> {event.title}</p>
                        {/* eslint-disable-next-line react/prop-types */}
                        <p><strong>Ngày:</strong> {event.start.toLocaleDateString()}</p>
                        {/* eslint-disable-next-line react/prop-types */}
                        <p><strong>Thời gian bắt đầu:</strong> {event.start.toLocaleTimeString()}</p>
                        {/* eslint-disable-next-line react/prop-types */}
                        <p><strong>Thời gian kết thúc:</strong> {event.end.toLocaleTimeString()}</p>
                    </div>
                )}
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventInfo;
