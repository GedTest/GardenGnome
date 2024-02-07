export default function Event() {

    return (
        <div className="event-container">
            <h4 id="title"></h4>
            <p id="date"></p>
            <div>
                <button id="change">Změnit</button>
                <button id="delete">Odstranit</button>
            </div>
        </div>
    );
}
