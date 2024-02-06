import { useState } from "react";


export default function TreeList() {
    const [trees, setTrees] = useState(null);

    fetch('http://localhost:8000/trees')
    .then(response => {
        if(!response.ok) { throw Error('could not fetch data from ' + response.url); }
        return response.json();
    })
    .then(data => {
        setTrees(data);
    })
    .catch(err => {
        console.log(err.message);
    });


    function toTwoDigit(n) { return (n < 10) ? '0' + n : n; }
    function formatDate(date) {
        let newDate = date;
        if (typeof date === "string") { newDate = new Date(date); }
        return `${toTwoDigit(newDate.getDate())}. ${toTwoDigit(newDate.getMonth()+1)}. ${newDate.getFullYear()}`;
    }


    return (
        <div>
            {trees && trees.map((tree) => (
                <a href="#" key={tree.id}>
                    <div className="list-row">
                        <img src={tree.imgPath} alt={tree.name}/>
                        <p>{ tree.name }</p>
                        <div className="date">Zasazeno: { formatDate(tree.plantingDate) }</div>
                    </div>
                </a>
            ))}
        </div>
    );
}
