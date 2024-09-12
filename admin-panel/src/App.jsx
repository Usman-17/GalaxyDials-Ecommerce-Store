import "./App.scss";
import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
    <BrowserRouter>
      <SideBar />
      <Header />

      <Routes>
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
