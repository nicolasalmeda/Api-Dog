import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import DogCreated from "./Components/DogCreated/DogCreated";
import DogDetail from "./Components/DogDetail/DogDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home/:id" component={DogDetail} />
          <Route path="/home" component={Home} />
          <Route path="/addDog" component={DogCreated} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
