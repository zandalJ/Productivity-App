import { Fragment } from "react";
import HeaderNav from "./HeaderNav";
import SideNav from "./SideNav";

const Nav = () => {
	return (
		<Fragment>
            <HeaderNav></HeaderNav>
            <SideNav></SideNav>
        </Fragment>
	);
};

export default Nav;
