import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { WishContext } from "./App";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const wishlist = useContext(WishContext);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Link to={"/"} className={activeLink === "/" ? "underline" : undefined}>
        Home
      </Link>
      <Link
        to={"/library"}
        className={activeLink === "/library" ? "underline" : undefined}
      >
        Library
      </Link>
      <Link
        to={"/upcoming"}
        className={activeLink === "/upcoming" ? "underline" : undefined}
      >
        Upcoming
      </Link>
      <Link
        to={"/wishlist"}
        className={activeLink === "/wishlist" ? "underline" : undefined}
      >
        {wishlist.length !== 0 ? `Wishlist (${wishlist.length})` : `Wishlist`}
      </Link>
    </>
  );
};

export default Navbar;
