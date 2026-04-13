import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editorpage';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/Landingpage';
import Loginpage from './pages/Loginpage'; 
import Signuppage from './pages/Signuppage';

function App() {
  return (
    <>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          success: {
            iconTheme: { primary: '#73ed4a' },
          },
        }} 
      />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Yahan changes kiye hain: div hata kar actual components dale hain */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/editor/:roomId" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;