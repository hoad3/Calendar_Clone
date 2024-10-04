import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {addEvent} from "../Slices/calendarSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../Component/InputCalendar.jsx";
import {useEffect, useState} from "react";
import {enqueueSnackbar} from "notistack";
import '../index.css'
import MonthCustomToolbar from "../Component/MonthCustomToolbar.jsx";
import { getRandomColor } from '../Component/RamdomColor.jsx'
import WeekCustomToolbar from "../Component/WeekCustomToolbar.jsx";
import DayCustomToolbar from "../Component/DayCustomtoolbar.jsx";
import TimeDisplay from "../Component/TimeDisplay.jsx";
import AOS from'aos'
// eslint-disable-next-line no-unused-vars
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
    // const currentMonth = moment().format('YYYY-MM'); // Tháng hiện tại
    const [ setHasEvent] = useState(false); // Thêm trạng thái để theo dõi sự kiện
    const [eventDays, setEventDays] = useState([]); // Mảng lưu trữ các ngày có sự kiện
    const [ setSelectedEvent] = useState(null); // Trạng thái để lưu sự kiện đã chọn
    const [selectedDate] = useState(new Date()); // Ngày đã
    const myFunction = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }, []);
    // Khởi động AOS
    // eslint-disable-next-line no-undef
    AOS.init({
        duration: 1000, // Thời gian hiệu ứng
        easing: 'ease-in-out', // Phương thức easing
    });
    const handleSelectSlot = (slotInfo) => {
        const selectedDate = slotInfo.start;

        // Tìm tất cả các sự kiện trong ngày đã chọn
        const eventsOnSelectedDate = events.filter(event =>
            moment(selectedDate).isSame(moment(event.start), 'day')
        );

        if (eventsOnSelectedDate.length > 0) {
            // Nếu có sự kiện trong ngày đã chọn
            if (view === 'month') {
                setSelectedEvent(eventsOnSelectedDate); // Lưu mảng sự kiện đã chọn

            } else {
                // Ở chế độ Week hoặc Day, cho phép tạo sự kiện mới
                setNewEvent({
                    ...newEvent,
                    start: new Date(selectedDate),
                    end: new Date(selectedDate.getTime() + 60 * 60 * 1000),
                });
                setOpen(true); // Mở modal để tạo sự kiện
            }
        } else {
            // Nếu không có sự kiện nào, mở modal để tạo sự kiện mới
            setNewEvent({
                ...newEvent,
                start: new Date(selectedDate),
                end: new Date(selectedDate.getTime() + 60 * 60 * 1000),
            });
            setOpen(true); // Mở modal để tạo sự kiện
        }
    };
    const handleSelectEvent = (event) => {
        setSelectedEvent(event); // Lưu sự kiện đã chọn để hiển thị thông tin
        console.log("adasdas",setSelectedEvent(event))
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
            const color = getRandomColor(0.9); // Đặt độ trong suốt là 0.3
            dispatch(addEvent({ ...newEvent, start: new Date(start), end: new Date(end), color }));
            // setHasEvent(true);
            // Lưu ngày có sự kiện vào mảng
            const eventDay = moment(newEvent.start).format('YYYY-MM-DD');
            setEventDays(prev => [...prev, eventDay]); // Thêm ngày mới vào mảng
            enqueueSnackbar('Tạo lịch thành công', { variant: 'success' });
            setOpen(false); // Đóng modal
            console.log("Modal closed"); // Debug log
        } else {
            enqueueSnackbar('Vui lòng nhập tiêu đề sự kiện', { variant: 'error' });
        }

    };
    const handleSelectDay = (slotInfo) => {

        setView('day');
        selectedDate((slotInfo.start))
    };

    return (
        <div  className='flex flex-col justify-center items-center bg-gray-200 min-h-screen overflow-hidden relative dark-mode-1 '>
            <div className='h-24 w-full flex flex-col justify-center items-center border-b-2 border-gray-400 z-50 fixed top-0 left-0 bg-gray-200 dark-mode-1' >
                <div className='flex flex-row justify-center'> <h2 className='z-40 text-6xl font-bold'>Welcome</h2>
                    <button
                        id="toggle-theme"
                        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded dark-mode-2"
                        onClick={myFunction}>
                        Chuyển sang chế độ tối
                    </button>
                </div>
            </div>
            <div className='flex flex-row justify-center items-start w-full min-h-screen'>
                <div className='w-3/4 h-full top-56 bg-gray-200 rounded-bl-full shadow-2xl z-0 absolute dark-mode-3'>

                </div>
                {/* Lịch tháng thứ nhất */}
                <div className='w-2/4 flex flex-col justify-center m-8 bg-gray-100 z-40 top-28 relative rounded-2xl dark-mode-4' data-aos="slide-right">
                    <div>
                        <TimeDisplay/>
                    </div>
                    <div className={`w-full mt-10 calendar-month`} >
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            defaultView="month"
                            views={['month']}
                            selectable={true}
                            // toolbar={true}
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleSelectDay}
                            dayPropGetter={(date) => {
                                const dayString = moment(date).format('YYYY-MM-DD');
                                return {
                                    className: eventDays.includes(dayString) ? 'bg-violet-900' : '', // Thay đổi màu nền nếu ngày có sự kiện
                                };
                            }}
                            eventPropGetter={(event) => ({
                                style: {
                                    backgroundColor: event.color || '#3174ad',
                                    color: 'white',
                                    border: 'none'
                                },
                            })}
                            components = {{
                                toolbar: MonthCustomToolbar,
                            }}
                        />
                        {/* Hiển thị thông tin sự kiện */}

                    </div>
                </div>

                <div className='w-3/4 h-2/3 m-8 z-40 relative top-28'>
                    <div className='w-full bg-gray-100 dark-mode-5'>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            defaultView="week"
                            views={['week']}
                            selectable = {true}
                            onView={(newView) => setView(newView)} // Cập nhật trạng thái khi người dùng thay đổi chế độ xem
                            onSelectEvent={(event) => alert(event.title)}
                            onSelectSlot={handleSelectSlot}
                            eventPropGetter={(event) => ({
                                style: {
                                    backgroundColor: event.color || '#3174ad',
                                    color: 'white',
                                    border: 'none'
                                },
                            })}
                            components ={{
                                toolbar: WeekCustomToolbar,
                            }}
                        />
                    </div>
                    <div className='w-full mt-4 bg-gray-100 dark-mode-6'>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            defaultView="day"
                            views={[ 'day']}
                            selectable = {true}
                            onView={(newView) => setView(newView)} // Cập nhật trạng thái khi người dùng thay đổi chế độ xem
                            onSelectEvent={(event) => alert(event.title)}
                            onSelectSlot={handleSelectSlot}
                            eventPropGetter={(event) => ({
                                style: {
                                    backgroundColor: event.color || '#3174ad',
                                    color: 'white',
                                    border: 'none'
                                },
                            })}
                            components ={{
                                toolbar:DayCustomToolbar,
                            }}
                        />
                    </div>
                </div>

            </div>




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
