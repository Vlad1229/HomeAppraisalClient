import { Link } from "react-router-dom";

const Navbar = ({isAdmin, isUser, handleLogOut}) => {
  return (
    <nav className="navbar">
      <h1>Оцінка нерухомості</h1>
      <div className="links">
        <Link to="/">Домашня сторінка</Link>
        {isUser && !isAdmin &&  <Link to="/dwellings">Квартири</Link>}
        {isAdmin ? <Link to="/regions">Райони</Link> : isAdmin}
        {!isUser && <Link to="/login">Увійти в систему</Link>}
        {isUser && <Link onClick={handleLogOut} to="/">Вийти</Link>}
      </div>
    </nav>
  );
}

export default Navbar;