import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

//************************************
// Description: Phần Header cho trang chung của người dùng.
//************************************

// Mảng lưu trữ thông tin chuyển hướng cho navigation section trên header.
const navigation = [
  { name: "DS công bố", href: "/", current: false },
  { name: "Sim sắp đấu giá", href: "/", current: false },
  { name: "Phòng đấu giá", href: "/", current: false },
  { name: "Kết quả đấu giá", href: "/", current: false },
];

// Hàm tạo một chuỗi tên lớp dựa trên các đối số đầu vào.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function CommonHeader() {
  return (
    <Disclosure as="nav" className="bg-background z-50">
      {({ open }) => (
        <>
          <div className="sm:mx-2 mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Nút mở navigation đối với điện thoại*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Tên của trang web */}
              <a
                href="/homepage"
                className="sm:flex-1 sm:justify-start text-white flex w-full justify-center text-bold text-4xl font-logo"
              >
                DGS
              </a>

              {/* Tương ứng với một đối tượng trong mảng navigation, tạo ra một bộ chuyển hướng có tên và đường dẫn đã được lưu. */}
              {/* Navigation trên kích thước lớn hơn kích thước điện thoại (small).*/}
              <div className="flex-4 hidden sm:block ">
                <div className="flex space-x-4 ">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        "text-white hover:text-currentText",
                        "rounded-md px-3 py-2 text-base font-mediun"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 flex-1 sm:relative sm:block">
                <Disclosure.Button className="flex-1 items-center float-right rounded-md p-2 hover:bg-activeButton hover:text-white text-textColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <a href="/signup">Đăng ký</a>
                </Disclosure.Button>
                {/* Nút đăng nhập --> Chuyển hướng sang trang đăng nhập tài khoản. */}
                <Disclosure.Button className="flex-1 items-center float-right rounded-md p-2 hover:bg-activeButton hover:text-white text-textColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <a href="/login">Đăng nhập</a>
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Navigation của trang web trên điện thoại. Khi lớn hơn kích thước điện thoại thì nó sẽ không xuất hiện. */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    "bg-buttonBlue text-textColor",
                    "hover:bg-gray-200 opacity-75",
                    "block rounded-md px-3 py-2 text-base font-medium"
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

export default CommonHeader;
export {};
