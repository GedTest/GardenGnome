import { useState } from "react";
import { toJSDate } from "./date";


export default function CalendarForm({ date, markCell }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const formatedDate = toJSDate(date);
        const event = {title, description, formatedDate};
        
        fetch('http://localhost:8000/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        })

        markCell();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div>Datum:</div>
                <div>{ date }</div>
            </div>
            <div className="form-row">
                <input
                    type="text"
                    required value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Přidejte název"
                />
            </div>
            <div className="form-row">
                <textarea
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Přidejte popisek"
                />
            </div>
            <button>Přidat</button>
        </form>
    );
}
