import Calendar from './Calendar';
import TreeList from './TreeList';
import Map from './Map';


export default function HomePage() {

    return (
        <div className="home-container">
            <div className="home-row">
                <TreeList />
                <Calendar isDisabled={ true } />
            </div>
            <div className="home-row">
                <Map />
            </div>
        </div>
    );
}
