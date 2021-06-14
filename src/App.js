import './App.css';
import Login from './Components/login'
import SignUp from './Components/SignUp'
import { loginClasses } from "./Styles/madeStyles";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login classes={loginClasses()} identity={'admin'}/>
      </header>
    </div>
  );
}

export default App;
