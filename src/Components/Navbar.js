import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <h2>Zahradní skřítek</h2>
            <div className="links">
                <Link to="/">Domů</Link>
                <Link to="/calendar">Kalendář</Link>
                <Link to="">Plánek zahrady</Link>
                <Link to="">Archiv</Link>
            </div>
        </nav>
    );
}
