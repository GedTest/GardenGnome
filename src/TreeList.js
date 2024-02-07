import useFetch from "./useFetch";
import { toReadableDate } from "./date";


export default function TreeList() {
    const { data: trees } = useFetch('http://localhost:8000/trees');

    return (
        <div>
            {trees && trees.map((tree) => (
                <a href="#" key={tree.id}>
                    <div className="list-row">
                        <img src={tree.imgPath} alt={tree.name}/>
                        <p>{ tree.name }</p>
                        <div className="date">Zasazeno: { toReadableDate(tree.plantingDate) }</div>
                    </div>
                </a>
            ))}
        </div>
    );
}
