import BaseForm from "./BaseForm";
import { toReadableDate } from "../date";


export default function UpdateForm({ onFetch, event }) {
    
    function updateEvent(updatedEvent) {
        fetch('http://localhost:8000/events/' + event.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEvent)
        }).then(() => onFetch());
    }

    return (
        <BaseForm
            selectedDate={ toReadableDate(event.date) }
            text="Uložit"
            callback={ updateEvent }
        />
    );
}
