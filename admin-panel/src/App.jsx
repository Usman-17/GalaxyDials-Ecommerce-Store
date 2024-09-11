import "./App.scss";
import SideBar from "./components/common/SideBar";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>
  );
};

export default App;
