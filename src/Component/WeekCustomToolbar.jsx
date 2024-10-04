import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export const WeekCustomToolbar = (props) => {
    // eslint-disable-next-line react/prop-types
    const { label, onNavigate} = props;

    return (
        <div className="toolbar flex justify-center items-center bg-blue-200 h-14 dark-mode-8">
            <button onClick={() => onNavigate('PREV')}><FaChevronLeft size='30' className='text-blue-500 shadow-lg shadow-indigo-500/50'/></button>
            <span className='text-responsive-3 dark-mode-week'>{label}</span>
            <button onClick={() => onNavigate('NEXT')}><FaChevronRight size='30' className='text-blue-500 shadow-lg shadow-indigo-500/50'/></button>
            {/* eslint-disable-next-line react/prop-types */}
        </div>
    );
};

export default WeekCustomToolbar;