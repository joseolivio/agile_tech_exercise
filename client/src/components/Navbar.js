import React from "react";

const Navbar = () => {
  return (
    <nav>
      <h2>Menu</h2>
      <div className="user">
        <div className="user__icon"></div>
        <h2 className="user__name">User Name</h2>
      </div>
      <h2 className="sales">Sales Report</h2>
    </nav>
  );
};

export default Navbar;
