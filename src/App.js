import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Calendar from './Components/Calendar';
import HomePage from './Components/HomePage';
import Detail from './Components/Detail';
import NotFound from './Components/NotFound';


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
