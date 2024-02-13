import { useState, useEffect } from "react";
import CreateForm from "./CreateForm";
import useFetch from "../Hooks/useFetch";
import Event from "./Event";
import { toReadableDate } from "../date";
import UpdateForm from "./UpdateForm";
import { Link } from "react-router-dom";


const weekday = ["PO", "ÚT", "ST", "ČT", "PÁ", "SO", "NE"];
const months = [
    "Leden","Únor","Březen",
    "Duben","Květen","Červen",
    "Červenec","Srpen","Září",
    "Říjen","Listopad","Prosinec"
];


export default function Calendar({ isDisabled }) {
    const [now, setNow] = useState(new Date());
    const [clickedDate, setClickedDate] = useState(null);
    const [lastCell, setLastCell] = useState(null);
    const { data: events, setData: setEvents } = useFetch('http://localhost:8000/events');
    const [isEventVisible, setIsEventVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isUpdateForm, setIsUpdateForm] = useState(false);
    

    useEffect(() => {
        if (events) {
            const cells = document.querySelectorAll('.calendar-grid .day-cell');
            events.map(ev => {
                const day = parseInt(ev.date.split('-')[2]) - 1;
                cells[day].classList.add('has-event');
            });
        }
    }, [events]);

    async function handleFetchEvents() {
        const response = await fetch('http://localhost:8000/events');
        const data = await response.json();
        setEvents(data);

        toggleEvent(lastCell);
    };


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
        setIsUpdateForm(false);
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

    function getSelectedEvent() {
        if (events) {
            const selectedDay = parseInt(lastCell.innerText);
            for(let ev of events) {
                const day = parseInt(ev.date.split('-')[2]);
                if(selectedDay === day) { return ev; }
            }
        }
    }

    function handleDelete(event) {
        fetch('http://localhost:8000/events/' + event.id, {
            method: 'DELETE'
        })
        lastCell.classList.remove('has-event');
        toggleEvent(lastCell);
        
    }

    function handleUpdate() {
        toggleForm(lastCell);
        setIsUpdateForm(true);
    }

    return (
        <div className="calendar-wrapper">
            <div className="calendar-container">



                <div className={isDisabled ? "" : "ahoj"}><Link to={isDisabled ? "/calendar" : null}>



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
                
                </Link></div>

            </div>
            
            { !isDisabled && isFormVisible && (
                isUpdateForm ? (
                    <UpdateForm
                        onFetch={ handleFetchEvents }
                        event={ getSelectedEvent() }
                    />
                ) : (
                    <CreateForm
                        selectedDate={ toReadableDate(clickedDate) }
                        markCell={ markCell }
                        onFetch={ handleFetchEvents }
                    />
                )
            ) }
                
            { !isDisabled && isEventVisible &&
                <Event
                    event={ getSelectedEvent() }
                    onUpdate={ handleUpdate }
                    onDelete={ handleDelete }
            /> }
        </div>
    );
}
