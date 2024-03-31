import {
  FaChartBar,
  FaBriefcase,
  FaEnvelope,
  FaFacebookMessenger,
  FaUser,
} from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GoHistory } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaSimCard } from "react-icons/fa";

//************************************
// Description: Xử lý navigation
//************************************

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const NavRoutes = [
  {
    layout: "user",
    pages: [
      {
        icon: <FaRegUser {...icon} />,
        name: "Thông tin tài khoản",
        path: "/user/profile",
      },
      {
        icon: <MdOutlineShoppingCart {...icon} />,
        name: "Giỏ hàng",
        path: "/user/applications",
      },
      {
        icon: <FaSimCard {...icon} />,
        name: "Sim chờ đấu giá",
        path: "/user/messenger",
      },
      {
        icon: <GoHistory {...icon} />,
        name: "Lịch sử đấu giá",
        path: "/auction/history",
      },
     
     
    ],
  },
];
