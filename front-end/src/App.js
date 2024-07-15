import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Recipe from "./Components/Recipe/Recipe";
import Banner from "./Components/Banner/Banner";
import Explore from "./Components/Explore/Explore";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <div className="items">
            {" "}
            <Banner />
          </div>

          <div className="items">
            {" "}
            <Outlet />
          </div>
        </div>

        <Routes>
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/recipe/new" element={<Recipe />} />
          <Route path="/recipe/all" element={<Explore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
