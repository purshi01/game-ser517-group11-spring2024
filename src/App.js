import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoginPage from './Pages/LoginPage';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
      <div className="App">
        <Header />
        <LoginPage/>
        <Footer />
      </div>
  );
}

export default App;
