import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DoctorsList from './pages/DoctorsList';
import DoctorProfile from './pages/DoctorProfile';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;