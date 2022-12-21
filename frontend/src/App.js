import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./components/Unauthorized";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./components/RequireAuth";
import Details from "./pages/Details";


function App() {
  
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/unauthorized" element={<Unauthorized/>}/>
            <Route element={<RequireAuth allowedRoles={["visitor","admin"]}/>}>
              <Route path="/home" element={<Home/>}/>
              <Route path="/events" element={<Events/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={["admin"]}/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="details/:id" element={<Details/>}/>
            </Route> 
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
