import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {addEvent} from "../Slices/calendarSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../Component/InputCalendar.jsx";
import {useState} from "react";
import {enqueueSnackbar} from "notistack";
// eslint-disable-next-line react/prop-types
// Localizer cho phép lịch đồng bộ với định dạng ngày/giờ
const localizer = momentLocalizer(moment);

// Dữ liệu mẫu cho các sự kiện
function MyCalendar() {
    const events = useSelector((state) => state.calendar.events);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', end: new Date(new Date().getTime() + 60 * 60 * 1000),}); // Thời gian kết thúc mặc định 1 giờ sau
    const [view, setView] = useState('week');

    const handleSelectSlot = (slotInfo) => {
        const selectedDate = slotInfo.start;
        setNewEvent({
            ...newEvent,
            start: new Date(selectedDate),
            end: new Date(selectedDate.getTime() + 60 * 60 * 1000), // Đặt thời gian kết thúc là 1 giờ sau
        });
        setOpen(true); // Mở modal
    };

    const handleClose = () => {
        setOpen(false); // Đóng modal
    };

    const handleSave = () => {
        const { start, end, title } = newEvent;

        // Kiểm tra điều kiện và cập nhật thời gian
        if (end <= start) {
            // Nếu end nhỏ hơn hoặc bằng start, cộng thêm 1 giờ cho start
            enqueueSnackbar("Thời gian kết thúc không thể nhỏ hơn hoặc bằng thời gian bắt đầu. Thời gian kết thúc đã được tự động điều chỉnh.", { variant: "warning" });
            end.setHours(start.getHours() + 1);
        }

        // Nếu tiêu đề không trống, thêm sự kiện vào store
        if (title) {
            dispatch(addEvent({ ...newEvent, start: new Date(start), end: new Date(end) }));
            enqueueSnackbar('Tạo lịch thành công', { variant: 'success' });
        } else {
            enqueueSnackbar('Vui lòng nhập tiêu đề sự kiện', { variant: 'error' });
        }

        setOpen(false); // Đóng modal
    };
    return (
        <div style={{ height: '500px' }}>
            <h2>Lịch sự kiện của bạn</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                defaultView="week"
                views={['month', 'week', 'day']}
                selectable = {true}
                onView={(newView) => setView(newView)} // Cập nhật trạng thái khi người dùng thay đổi chế độ xem
                onSelectEvent={(event) => alert(event.title)}
                onSelectSlot={handleSelectSlot}

            />

            {/* Modal thêm sự kiện */}
            <Modal
                isOpen={open}
                onClose={handleClose}
                onSave={handleSave}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
            />
        </div>
    );
}


export default MyCalendar;
