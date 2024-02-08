// import { useState } from "react";
// import { toJSDate } from "./date";


// export default function CalendarForm({ selectedDate, markCell, onFetch }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     function handleSubmit(e) {
//         e.preventDefault();

//         const date = toJSDate(selectedDate);
//         const event = {title, description, date};

//         createEvent(event);
//     }
    
//     function createEvent(event) {
//         fetch('http://localhost:8000/events', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(event)
//         }).then(() => onFetch());

//         markCell();
//     }
 
//     function updateEvent(event) {
//         fetch('http://localhost:8000/events/' + event.id, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(event)
//         }).then(() => onFetch());
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="form-row">
//                 <div>Datum:</div>
//                 <div>{ selectedDate }</div>
//             </div>
//             <div className="form-row">
//                 <input
//                     type="text"
//                     required value={title}
//                     onChange={e => setTitle(e.target.value)}
//                     placeholder="Přidejte název"
//                 />
//             </div>
//             <div className="form-row">
//                 <textarea
//                     required
//                     value={description}
//                     onChange={e => setDescription(e.target.value)}
//                     placeholder="Přidejte popisek"
//                 />
//             </div>
//             <button>Přidat</button>
//         </form>
//     );
// }





import BaseForm from "./BaseForm";


export default function CreateForm({ selectedDate, markCell, onFetch }) {
    
    function createEvent(event) {
        fetch('http://localhost:8000/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        }).then(() => onFetch());

        markCell();
    }

    return (
        <BaseForm
            selectedDate={ selectedDate }
            text="Přidat"
            callback={ createEvent }
        />
    );
}

