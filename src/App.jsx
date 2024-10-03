import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import {Calendar} from "react-big-calendar";
import MyCalendar from "./Calendar/Calendar.jsx";


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
          <h1>Lịch của tôi</h1>
          <MyCalendar/>
      </div>
    </>
  )
}

export default App
