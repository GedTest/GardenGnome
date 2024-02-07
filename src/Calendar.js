import { useState, useEffect } from "react";
import CalendarForm from "./CalendarForm";
import useFetch from "./useFetch";
import Event from "./Event";
import { toReadableDate } from "./date";


const weekday = ["PO", "ÚT", "ST", "ČT", "PÁ", "SO", "NE"];
const months = [
    "Leden","Únor","Březen",
    "Duben","Květen","Červen",
    "Červenec","Srpen","Září",
    "Říjen","Listopad","Prosinec"
];


export default function Calendar() {
    const [now, setNow] = useState(new Date());
    const [clickedDate, setClickedDate] = useState(null);
    const [lastCell, setLastCell] = useState(null);
    const { data: events } = useFetch('http://localhost:8000/events');
    const [isEventVisible, setIsEventVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    

    useEffect(() => {
        if (events) {
            const cells = document.querySelectorAll('.calendar-grid .day-cell');
            events.map(ev => {
                const day = parseInt(ev.dateFormat.split('-')[2]) - 1;
                cells[day].classList.add('has-event');
            });
        }
    }, [events]);


    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth()+1, 0);

    const days = new Array(lastDay.getDate())
        .fill()
        .map((_, index) => index + 1);

    const emptyCellCount = (firstDay.getDay() + weekday.length-1) % weekday.length;
    const emtpyCells = new Array(emptyCellCount).fill('');

    const rows = 6;
    const cols = weekday.length;
    const lastEmptyCellCount = rows*cols - lastDay.getDate() - emptyCellCount;
    const lastEmtpyCells = new Array(lastEmptyCellCount).fill('');


    function handleClick(e) {
        if(lastCell) {
            lastCell.classList.remove('selected-day');
        }
        
        const cell = e.target;
        if(cell.classList.contains('has-event')) {
            toggleEvent(cell);
        } else {
            toggleForm(cell);
        }

        setLastCell(cell);
        if(cell !== lastCell) {
            cell.classList.add('selected-day');
        }
    }

    function toggleEvent(cell) {
        setIsFormVisible(false);
        setClickedDate(null);

        if(cell === lastCell && isEventVisible) {
            setIsEventVisible(false);
        } else if (!isEventVisible) {
            setIsEventVisible(true);
        }
    }

    function toggleForm(cell) {
        setIsEventVisible(false);
            
        const day = parseInt(cell.innerText);
        const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), day);
        setClickedDate(date);
        
        if(cell === lastCell && isFormVisible) {
            setIsFormVisible(false);
        } else if (!isFormVisible) {
            setIsFormVisible(true);
        }
    }

    function markCell() {
        lastCell.classList.add('has-event');
    }

    return (
        <div className="calendar-wrapper">
            <div className="calendar-container">
                <div className="calendar-header">
                    { `${months[now.getMonth()]} ${now.getFullYear()}` }
                </div>
                <div className="calendar-grid">
                    { weekday.map((day, index) => (
                        <div key={index} className="weekday-cell">{ day }</div>
                    )) }
                    { emtpyCells && emtpyCells.map((_, index) => (
                        <div key={index} className="empty-cell"></div>
                    )) }
                    { days && days.map((day, index) => (
                        <div
                            key={index}
                            onClick={handleClick}
                            className={
                                `day-cell ${day === now.getDate() ? 'current-day' : ''}`
                            }>{ day }</div>
                    ))}
                    { lastEmtpyCells && lastEmtpyCells.map((_, index) => (
                        <div key={index} className="empty-cell"></div>
                    )) }
                </div>
            </div>
            { isFormVisible && <CalendarForm date={ toReadableDate(clickedDate) } callback={markCell}/> }
            { isEventVisible && <Event /> }
        </div>
    );
}
