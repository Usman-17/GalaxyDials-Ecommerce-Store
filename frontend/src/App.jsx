import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

import HomePage from "./pages/HomePage";
// imports End

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
