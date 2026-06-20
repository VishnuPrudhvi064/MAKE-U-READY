import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { ArtistDashboard } from './pages/ArtistDashboard';
import { BrideDashboard } from './pages/BrideDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/artist" element={<ArtistDashboard />} />
        <Route path="/bride" element={<BrideDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
