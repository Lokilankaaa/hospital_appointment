import './App.css';
import Login from './login'
import {loginClasses} from "./madeStyles";

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
