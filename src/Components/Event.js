import { toReadableDate } from "../date";


export default function Event({ event, onUpdate, onDelete }) {
    return (
        <div className="event-container">
            <h4 className="title">{ event.title }</h4>
            <p className="date">Datum: { toReadableDate(event.date) }</p>
            <p className="description">{ event.description }</p>
            <div className="event-btn-row">
                <button
                    className="btn-update"
                    onClick={ () => onUpdate() }
                >Změnit</button>
                <button
                    className="btn-delete"
                    onClick={ () => onDelete(event) }
                >Odstranit</button>
            </div>
        </div>
    );
}
