// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const TimeDisplay = () => {
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const updateGreeting = () => {
        const now = new Date();
        const hours = now.getUTCHours();
        const minutes = now.getUTCMinutes();
        const seconds = now.getUTCSeconds();
        const vietnamutc = (hours + 7) % 24; // Giờ Việt Nam (UTC +7)

        // Xác định thông điệp chào mừng
        let greetingMessage = '';
        if (vietnamutc >= 6 && vietnamutc < 12) {
            greetingMessage = 'Chào buổi sáng!'; // Morning
        } else if (vietnamutc >= 12 && vietnamutc < 18) {
            greetingMessage = 'Chào buổi chiều!'; // Afternoon
        } else {
            greetingMessage = 'Chào buổi tối!'; // Evening/Night
        }

        setGreeting(greetingMessage);

        // Định dạng thời gian
        const formattedTime = `${String(vietnamutc).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        setCurrentTime(formattedTime);
    };

    useEffect(() => {
        updateGreeting(); // Khởi tạo thông điệp chào mừng và thời gian
        const interval = setInterval(updateGreeting, 1000); // Cập nhật mỗi giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị gỡ bỏ
    }, []);

    return (
        <div className="flex flex-col items-center bg-blue-200 p-4 rounded-lg shadow-lg dark-mode-7">
            <div className='reponsive-time clk'>

                <h2 className="text-2xl font-bold mb-2 text-center">{greeting}</h2>
                <p className="text-xl text-center">{currentTime}</p>
            </div>

        </div>
    );
};

export default TimeDisplay;
