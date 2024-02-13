import { useState } from "react";
import { toJSDate } from "../date";


export default function BaseForm({ selectedDate, text, callback }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const date = toJSDate(selectedDate);
        const event = {title, description, date};

        callback(event);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div>Datum:</div>
                <div>{ selectedDate }</div>
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
            <button>{ text }</button>
        </form>
    );
}
