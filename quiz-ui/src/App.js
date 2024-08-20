import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Quiz from './pages/Quiz';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TestCompleted from './pages/TestCompleted';
import ModifiedComponent from './pages/GetCameraAccess'
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Signup />} />
            <Route path='/test-completed' element={<TestCompleted />} />
            <Route path='/get-camer-access' element={<ModifiedComponent />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;