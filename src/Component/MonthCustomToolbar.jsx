
// eslint-disable-next-line no-unused-vars
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa'; // Import các biểu tượng

const MonthCustomToolbar = (props) => {
    // eslint-disable-next-line react/prop-types
    const { label, onNavigate, today } = props;

    return (
        <div className="toolbar flex justify-center items-center bg-blue-200 h-14 dark-mode-10">
            <span></span>
            <button onClick={() => onNavigate('PREV')}><FaChevronLeft  className='text-blue-500 shadow-lg shadow-indigo-500/50' size='30'/></button>
            <span className='text-4xl font-bold text-blue-900 flex items-center ml-10 mr-10 dark-mode-month'>{label}</span>
            <button onClick={() => onNavigate('NEXT')}><FaChevronRight size='30'className='text-blue-500 shadow-lg shadow-indigo-500/50' /></button>
            {/* eslint-disable-next-line react/prop-types */}
        </div>
    );
};

export default MonthCustomToolbar;