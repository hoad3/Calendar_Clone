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
import {BsFillMoonStarsFill} from "react-icons/bs";
import {IoSunny} from "react-icons/io5";
import EventInfo from "../Component/EventInfo.jsx";
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
    // const [ setHasEvent] = useState(false); // Thêm trạng thái để theo dõi sự kiện
    const [eventDays, setEventDays] = useState([]); // Mảng lưu trữ các ngày có sự kiện
    const [ setSelectedEvent] = useState(null); // Trạng thái để lưu sự kiện đã chọn
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [isToggled, setIsToggled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const myFunction = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
        setIsToggled(prevState => !prevState);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        console.log('list event', events)
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
            const color = getRandomColor(0.9);
            dispatch(addEvent({ ...newEvent, start: new Date(start), end: new Date(end), color }));
            // setHasEvent(true);
            // Lưu ngày có sự kiện vào mảng
            const eventDay = moment(newEvent.start).format('YYYY-MM-DD');
            setEventDays(prev => [...prev, eventDay]); // Thêm ngày mới vào mảng
            console.log("Modal closed",newEvent);
            enqueueSnackbar('Tạo lịch thành công', { variant: 'success' });
            setOpen(false); // Đóng modal
            console.log("Modal closed"); // Debug log
        } else {
            enqueueSnackbar('Vui lòng nhập tiêu đề sự kiện', { variant: 'error' });
        }

    };
    const handleSelectDay = (slotInfo) => {
        const selectedDate = slotInfo.start;
        console.log('ssasdasdasd')
        // Lọc sự kiện trong ngày đã chọn
        const eventsOnSelectedDate = events.filter(event =>
            moment(selectedDate).isSame(moment(event.start), 'day')
        );

        // Hiển thị các sự kiện trên form/modal
        setSelectedDateEvents(eventsOnSelectedDate);
        setIsModalOpen(true); // Mở modal
    };
    return (
        <div className='flex flex-col justify-center items-center bg-gray-200 min-h-screen overflow-hidden relative dark-mode-1'>
            <div className='h-24 w-full flex flex-col justify-center items-center border-b-2 border-gray-400 z-50 fixed top-0 left-0 bg-gray-200 dark-mode-1'>
                <div className='flex flex-row w-full justify-between px-5 sm:justify-center'>
                    <h2 className='z-40 text-6xl font-bold w-full flex justify-end items-center ml-56 [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] text-indigo-600 md:text-6xl leading-snug font-manrope '>Welcome</h2>
                    <div className="flex items-center justify-end w-full">
                        <label htmlFor="toggle" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggle"
                                    className="hidden"
                                    onChange={myFunction} // Gọi myFunction khi thay đổi
                                />
                                <div className="block bg-gray-400 w-14 h-8 rounded-full"></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isToggled ? 'translate-x-full' : ''}`}></div>
                            </div>
                            <div className="ml-3 text-gray-700 font-medium flex items-center">
                                {isToggled ? <BsFillMoonStarsFill className="text-xl text-gray-500" /> : <IoSunny className="text-xl" />}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-start w-full min-h-screen'>
                <div className='w-full md:w-3/4 h-full top-56 bg-gray-200 rounded-bl-full shadow-2xl z-0 absolute dark-mode-3'></div>

                {/* Lịch tháng thứ nhất */}
                <div className='reponsive-month dark-mode-4' data-aos="slide-right">
                    <div>
                        <TimeDisplay />
                    </div>
                    <div className={`w-full mt-10 calendar-month`}>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            defaultView="month"
                            views={['month']}
                            selectable={true}
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
                            components={{
                                toolbar: MonthCustomToolbar,
                            }}
                        />
                    </div>

                </div>

                <div className='reponsive-week'>
                    <div className='w-full bg-gray-100 dark-mode-5'>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            defaultView="week"
                            views={['week']}
                            selectable={true}
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
                            components={{
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
                            views={['day']}
                            selectable={true}
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
                            components={{
                                toolbar: DayCustomToolbar,
                            }}
                        />

                    </div>
                    <h1>Event List</h1>
                    <ul>
                        {/* Duyệt qua các sự kiện và hiển thị */}
                        {events && events.length > 0 ? (
                            events.map((event) => (
                                <li key={event.id}>
                                    <h2>{event.title}</h2>
                                    <p>Date: {event.date}</p>
                                    <p>{event.description}</p>
                                </li>
                            ))
                        ) : (
                            <p>No events available</p>
                        )}
                    </ul>
                    {/*<MonthView/>*/}
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
