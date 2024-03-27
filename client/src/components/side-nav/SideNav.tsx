import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
// import { useMaterialTailwindController, setOpenSidenav } from "../context";
import { ReactElement, useState } from "react";
import { truncate } from "lodash";

interface Route {
  icon: ReactElement;
  name: string;
  path: string;
  // element:ReactElement
}

interface Routes {
  pages: Route[];
}

interface NavbarProps {
  routes: Routes[];
}

export function Sidenav({ routes }: NavbarProps) {
  //   const [controller, dispatch] = useMaterialTailwindController();
  const [selected, setSelected] = useState(true);
  const [openSidenav, setOpenSidenav] = useState(false);
  const sidenavType = "white";
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };
  const handleClick = () => {
    setSelected(true);
  };
  return (
    <div className="m-4 rounded-2xl border border-border">
      {routes.map(({ layout, title, pages }: any, key) => (
        <ul key={key} className="mb-4 px-4 py-8 flex flex-col gap-1 ">
          {pages.map(({ icon, name, path }: Route) => (
            <li key={name}>
              <NavLink to={path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={isActive ? "green" : "gray"}
                    className={`flex items-center gap-4 px-4 capitalize${
                      isActive && selected ? " bg-gray-700" : ""
                    }`}
                    fullWidth
                    onClick={handleClick}
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize text-white"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
