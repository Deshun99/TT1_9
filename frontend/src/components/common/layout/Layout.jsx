import "./Layout.css";

import React from "react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
	return (
		<>
			<div className="grid grid-cols-1 grid-rows-12 h-screen">
				<Header />
				<div className="row-span-11 flex flex-col">
					<div className="container w-1/2 my-auto">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
