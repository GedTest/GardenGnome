import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { toReadableDate } from "../date";


export default function Detail() {
    const { id } = useParams();
    const { data: tree } = useFetch('http://localhost:8000/trees/' + id);
    const navigate = useNavigate();


    return (<>
        { tree && (
            <div className="tree-info-container">
                <img src={ `../img/${tree.image}` } alt={ tree.name } />
                <div className="info">
                    <h2>{ tree.name } (zasazeno { toReadableDate(tree.plantingDate) })</h2>
                    <p>{ tree.description }</p>
                    <button>ahoj</button>
                </div>
            </div>
        )}
    </>);
}
