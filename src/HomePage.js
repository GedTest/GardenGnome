import Calendar from './Calendar';
import TreeList from './TreeList';


export default function HomePage() {

    return (
        <div className="home-container">
            <TreeList />
            <Calendar isDisabled={ true } />
        </div>
    );
}
