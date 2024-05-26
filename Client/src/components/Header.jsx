import { NavLink } from "react-router-dom"
export default function Header() {
    function logout() {
        localStorage.removeItem("currentUser");
    }
    const activeStyle = {
        fontWeight: "bold",
        color: "white"
    }
    function login() {
        localStorage.setItem("currentUser", "true");
    if (localStorage.getItem("currentUser") === "true") {
        return (
            <>

            </>
        );
        };
    } 
    return (
        <>
            <nav>
                <NavLink className="navLink" to='.' end style={({ isActive }) => isActive ? activeStyle : null}>HOME</NavLink>
                <NavLink className="navLink" to={`todos`} style={({ isActive }) => isActive ? activeStyle : null}>Todos</NavLink>
                <NavLink className="navLink" to={`info`} style={({ isActive }) => isActive ? activeStyle : null} >Info</NavLink>
                <NavLink className="navLink" to={`albums`} style={({ isActive }) => isActive ? activeStyle : null}>Albums</NavLink>
                <NavLink className="navLink" to={`posts`} style={({ isActive }) => isActive ? activeStyle : null}>Posts</NavLink>
                <NavLink className="navLink" onClick={() => login()} to={`/login`} style={({ isActive }) => isActive ? activeStyle : null}>Login</NavLink>
                <NavLink className="navLink" onClick={() => logout()} to={`/login`} style={({ isActive }) => isActive ? activeStyle : null}>Logout</NavLink>

            </nav>
        </>
    )
}


