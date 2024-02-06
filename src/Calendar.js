import { useState } from "react";
import CalendarForm from "./CalendarForm";


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

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth()+1, 0);

    const days = new Array(lastDay.getDate())
        .fill()
        .map((_, index) => index + 1);

    const emptyCellCount = (firstDay.getDay() + weekday.length-1) % weekday.length;
    const emtpyCells = new Array(emptyCellCount).fill('');

    const rows = 6;
    const cols = weekday.length;
    const gridCellCount = rows*cols;
    const lastEmptyCellCount = gridCellCount - lastDay.getDate() - emptyCellCount;
    const lastEmtpyCells = new Array(lastEmptyCellCount).fill('');



    function toTwoDigit(n) { return (n < 10) ? '0' + n : n; }
    function formatDate(date) {
        if(!date) { return; }
        let newDate = date;
        if (typeof date === "string") { newDate = new Date(date); }
        return `${toTwoDigit(newDate.getDate())}. ${toTwoDigit(newDate.getMonth()+1)}. ${newDate.getFullYear()}`;
    }

    function handleClick(e) {
        const cell = e.target;
        const day = parseInt(cell.innerText);
        
        
        const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), day);
        setClickedDate(date);

        setLastCell(cell);
    }


    return (
        <div className="calendar-container">
            <div className="calendar-header">
                { `${months[now.getMonth()]} ${now.getFullYear()}` }
            </div>
            <div className="calendar-grid">
                { weekday.map(day => (<div className="weekday-cell">{ day }</div>)) }
                { emtpyCells && emtpyCells.map(_ => (<div className="empty-cell"></div>)) }
                { days && days.map(day => (
                    <div onClick={handleClick}
                        className={
                            `day-cell ${day === now.getDate() ? 'current-day' : ''}`
                        }>{ day }</div>
                ))}
                { lastEmtpyCells && lastEmtpyCells.map(_ => (<div className="empty-cell"></div>)) }
            </div>
        </div>
    );
}
