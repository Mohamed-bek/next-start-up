"use client";
import ErrorB from "../images/Error/OppsB.png";
import ErrorBl from "../images/Error/OppsBl.png";

interface Props {}

export default function NotFound(props: Props) {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[90%] h-[90%] flex items-center">
        <div className="w-1/2">
          <h1 className="text-[7rem] font-bold"> Oooops !</h1>
          <p className="-mt-4 pl-2">
            {" "}
            we con't go to here you dont have the access{" "}
          </p>
          <a
            href="/login"
            className="block px-5 py-3 ml-5 rounded-lg my-4 bg-primary text-[1.3rem] text-white font-semibold w-fit"
          >
            {" "}
            back to login{" "}
          </a>
        </div>
        <div className="w-1/2">
          <img src="/error.png" alt="" />
        </div>
      </div>
    </div>
  );
}
