import { ModeToggle } from "../../theme/ModeToggle";
import "./Header.css";

// import React from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
	return (
		<div className="container flex py-2">
			<NavigationMenu className=" ms-auto my-auto">
				<NavigationMenuList>
					<ModeToggle />
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default Header;
