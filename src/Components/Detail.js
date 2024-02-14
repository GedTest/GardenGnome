import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { toReadableDate } from "../date";


export default function Detail() {
    const { id } = useParams();
    const { data: trees } = useFetch('http://localhost:8000/trees/' + id);
    const navigate = useNavigate();

    console.log(trees);

    return (<>
        { trees && (
            <div className="tree-info-container">
                <img src={ `../img/${trees.image}` } alt={ trees.name } />
                <div className="info">
                    <h2>{ trees.name } (zasazeno { toReadableDate(trees.plantingDate) })</h2>
                    <p>{ trees.description }</p>
                    <button>ahoj</button>
                </div>
            </div>
        )}
    </>);
}
