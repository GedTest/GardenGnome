import useFetch from "./useFetch";
import { toReadableDate } from "./date";
import { Link } from "react-router-dom";


export default function TreeList() {
    const { data: trees } = useFetch('http://localhost:8000/trees');

    return (
        <div className="list-container">
            {trees && trees.map((tree) => (
                <Link to={ `/trees/${tree.id}` } key={tree.id}>
                    <div className="list-row">
                        <img src={tree.imgPath} alt={tree.name}/>
                        <p>{ tree.name }</p>
                        <div className="date">Zasazeno: { toReadableDate(tree.plantingDate) }</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
