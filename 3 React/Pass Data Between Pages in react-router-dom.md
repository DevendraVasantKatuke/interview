##### App.jsx
```
import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Peoplest from "./URL_search_params/People";
import Viewprofilest from "./URL_search_params/Viewprofile";

import Viewprofileparams from "./URL_params/Viewprofile";
import Peopleparams from "./URL_params/People";
import Viewprofilestates from "./URL_states/Viewprofile";
import Peoplestates from "./URL_states/People";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/peoplest" element={<Peoplest />} />
        <Route exact path="/viewst" element={<Viewprofilest />} />
        <Route exact path="/peopleparams" element={<Peopleparams />} />
        <Route exact path="/viewparams/:id" element={<Viewprofileparams />} />
        <Route exact path="/peoplestate" element={<Peoplestates />} />
        <Route exact path="/viewstate" element={<Viewprofilestates />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
```