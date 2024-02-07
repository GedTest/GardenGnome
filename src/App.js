import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Calendar from './Calendar';
import HomePage from './HomePage';


export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/calendar" element={ <Calendar /> } />
        </Routes>
      </div>
    </Router>
  );
}
