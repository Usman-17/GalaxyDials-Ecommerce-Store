import "./App.scss";
import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <SideBar />
      <Header />
    </BrowserRouter>
  );
};

export default App;
