// TimeDropdown.js

// eslint-disable-next-line react/prop-types
const TimeDropdown = ({ selectedTime, onChange, timeSlots }) => {
    return (
        <div>
            <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={selectedTime}
                onChange={onChange}
            />
            <select
                className="w-full p-2 border border-gray-300 rounded mb-4"
                onChange={onChange}
            >
                <option value="" disabled>Chọn thời gian</option>
                {/* eslint-disable-next-line react/prop-types */}
                {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                ))}
            </select>
        </div>
    );
};

export default TimeDropdown;
