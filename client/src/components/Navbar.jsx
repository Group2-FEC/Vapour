import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ wishlist }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Link to={"/"} className={activeLink === "/" && "underline"}>
        Home
      </Link>
      <Link
        to={"/library"}
        className={activeLink === "/library" && "underline"}
      >
        Library
      </Link>
      <Link
        to={"/upcoming"}
        className={location.pathname === "/upcoming" && "underline"}
      >
        Upcoming
      </Link>
      <Link
        to={"/wishlist"}
        className={location.pathname === "/wishlist" && "underline"}
      >
        {wishlist.length !== 0 ? `Wishlist (${wishlist.length})` : `Wishlist`}
      </Link>
    </>
  );
};

export default Navbar;
