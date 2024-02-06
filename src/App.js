import './App.css';
import TreeList from './TreeList';
import Navbar from './Navbar';
import Calendar from './Calendar';


export default function App() {
  return (
    <div className="container">
      <Navbar />

      <TreeList />

      <Calendar />
    </div>
  );
}
