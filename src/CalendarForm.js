import { useState } from "react";


export default function CalendarForm({ date }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const event = {title, description};
        
        fetch('http://localhost:8000/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div>Datum:</div>
                <div>{ date }</div>
            </div>
            <div className="form-row">
                <label>Název</label>
                <input
                    type="text"
                    required value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className="form-row">
                <label>Popis</label>
                <textarea
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <button>Přidat</button>
        </form>
    );
}
