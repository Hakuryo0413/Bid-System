import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../../features/redux/slices/account/accountLoginAuthSlice";

const links = [
  { name: "Phù hợp cho tất cả giai đoạn phát triển", href: "#" },
  // { name: "Come with or without an idea", href: "#" },
  { name: "Dự án đa dạng", href: "#" },
  { name: "Tự mình khám phá và trải nghiệm", href: "#" },
];
const stats = [
  { name: "Dự án", value: "1000+" },
  // { name: "Full-time Part-time etc", value: "Different jobs" },
  { name: "Nhà sáng lập", value: "100+" },
  { name: "Miễn phí", value: "Không giới hạn" },
];
const navigation = [{ name: "Khám phá", href: "user/login", current: false }];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
function HomePage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userAuth.isLoggedIn
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess());
    }
    // if (isLoggedIn === true) {
    //   navigate("/user/home");
    // }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-15 bg-white ">
      <div className="max-w-8xl px-6 lg:px-8 ">
        <div className="flex items-center" style={{ marginTop: -20 }}>
          <div className="" style={{ marginLeft: 40 }}>
            <h2 className="text-sm font-black font-mono text-black sm:text-5xl">
              Unlock Your Identity: Bid for Your Signature Sim!<br></br>
              {/* <p>
                <span style={{ color: "green", display: "inline" }}>DGS</span>
              </p> */}
            </h2>
            <p className="mt-6 text-xl leading-8 text-h6 font-semibold text-black  ">
              Một chiếc sim số đẹp sẽ giúp chủ nhân mang tới nhiều may mắn,
              thành công trong cuộc sống.
            </p>
            <br></br>
            <br></br>
            <div className="flex items-center justify-center gap-x-6 lg:justify-start">
              {/* <a
                href="#"
                className="rounded-md bg-buttonPurple px-3.5 py-2.5 text-xl font-normal text-white shadow-sm 
                hover:bg-buttonPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-white"
              >
                Khám phá
              </a> */}
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-activeButton text-white "
                      : "text-white hover:bg-buttonPurple bg-activeButton hover:text-white",
                    "rounded-md  px-3 py-2 text-xl font-semibold"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#"
                className="text-xl font-semibold leading-6 text-black"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <img
            src={
              "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*3jEGMFM-bDYe9g30nbn5LA.jpeg"
            }
            alt="Img"
            style={{ marginLeft: 180, width: 520, height: 450 }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
