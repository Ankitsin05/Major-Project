import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editorpage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <><div>
      <Toaster position="bottom-right" toastOptions={{
                                         success:{
                                          iconTheme: {
                                          primary:'#73ed4a',
                                          },
                                          },
                                        }}
                                         ></Toaster>
    </div><BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<Editor />} />
        </Routes>
      </BrowserRouter></>
    
  );
}

export default App;