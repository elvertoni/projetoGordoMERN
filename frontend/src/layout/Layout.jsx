import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

function Layout(props) {
  return (
    <>
      <Nav />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
