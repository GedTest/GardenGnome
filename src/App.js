import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Calendar from './Calendar';
import HomePage from './HomePage';
import Detail from './Detail';
import NotFound from './NotFound';


export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/calendar" element={ <Calendar isDisabled={ false } /> } />
          <Route path="/trees/:id" element={ <Detail /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </div>
    </Router>
  );
}
