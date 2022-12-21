import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/');
    }

    return (
        <section className="container">
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/dashboard">Go to the Admin page</Link>
            <br />
            <br />
            <Link to="/events">Go to the events page</Link>
            <br/>
            <br/>
            <div className="flexGrow">
                <button onClick={logout} className="btn btn-block">Sign Out</button>
            </div>
        </section>
    )
}

export default Home