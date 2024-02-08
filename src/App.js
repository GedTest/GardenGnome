import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Calendar from './Calendar';
import HomePage from './HomePage';
import Detail from './Detail';


export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/calendar" element={ <Calendar isDisabled={ false } /> } />
          <Route path="/trees/:id" element={ <Detail /> } />
        </Routes>
      </div>
    </Router>
  );
}
