import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

//************************************
// Description: Phần Header cho trang chung của người dùng.
//************************************

// Mảng lưu trữ thông tin chuyển hướng cho navigation section trên header.
const navigation = [
  { name: "DS công bố", href: "/", current: false },
  { name: "Sim sắp đấu giá", href: "/", current: false },
  { name: "Phòng đấu giá", href: "/", current: false },
  { name: "Kết quả đấu giá", href: "/", current: false },
  { name: "Thông báo đấu giá", href: "/", current: false },
];

// Hàm tạo một chuỗi tên lớp dựa trên các đối số đầu vào.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function UserHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.clear(); // Clear localStorage
      console.log("LocalStorage cleared successfully!");

      console.log("fehi");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      // Handle error gracefully, e.g., display an error message
    }
  };

  return (
    <Disclosure as="nav" className="bg-background z-50">
      {({ open }) => (
        <>
          <div className="lg:mx-2 mx-auto px-4 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Tên của trang web */}
              <a
                href="/homepage"
                className="text-white flex text-bold text-4xl font-logo"
              >
                DGS
              </a>

              {/* Tương ứng với một đối tượng trong mảng navigation, tạo ra một bộ chuyển hướng có tên và đường dẫn đã được lưu. */}
              {/* Navigation trên kích thước lớn hơn kích thước điện thoại (lgall).*/}
              <div className="flex-1 justify-center items-center hidden lg:flex">
                <div className="flex space-x-4 ">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        "text-white hover:text-currentText",
                        "rounded-lg px-3 py-2 text-base font-mediun"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 flex lg:relative lg:block">
                <div className="flex lg:hidden">
                  {/* Nút mở navigation đối với điện thoại*/}
                  <Disclosure.Button className="flex float-right items-center rounded-lg p-2 text-white hover:bg-white hover:bg-opacity-30 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full text-sm hover:opacity-50">
                      <span className="sr-only">Open user menu</span>
                      <svg
                        className="w-8 h-8 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-background">
                      <Menu.Item>
                        <text
                          className={classNames(
                            "block px-4 py-2 text-sm hover:opacity-50"
                          )}
                        >
                          {/* {employerDetails?.name ?? ""} */}
                        </text>
                      </Menu.Item>
                      <Menu.Item>
                        <Link to={"/"}>
                          <button
                            className={classNames(
                              "block px-4 py-2 text-sm hover:opacity-50"
                            )}
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            Đăng xuất
                          </button>
                        </Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Navigation của trang web trên điện thoại. Khi lớn hơn kích thước điện thoại thì nó sẽ không xuất hiện. */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    "bg-white bg-opacity-20 text-textColor",
                    "hover:text-currentText",
                    "block rounded-lg px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default UserHeader;
export {};
