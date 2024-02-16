import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Login } from './Pages/SignUp';
import './App.css';

function App() {
    return (
      <div className="App">
      <Header />
        <div>
          <Login/>
        </div>    
      <Footer />
    </div>
    );
}

export default App;
