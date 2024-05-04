"use client";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState<String>();
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState<String>();
  const [passwordErr, setPasswordErr] = useState(false);
  const [seePass, setSeePass] = useState<boolean>(false);
  let storedUser;
  if (typeof window !== "undefined") {
    storedUser = localStorage.getItem("user");
  }
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  useEffect(() => {
    if (parsedUser) {
      if (typeof window !== "undefined") {
        location.href = "/";
      }
    }
  });
  const Login = async (e: any) => {
    console.log("start login");
    e.preventDefault();
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      if ((data.err as string).includes("Email")) {
        setEmailErr(true);
        setEmail("");
      }
      if ((data.err as string).includes("Password")) {
        setPasswordErr(true);
        setPassword("");
        setSeePass(true);
      }
    }
    if (res.ok) {
      if (data.user.role === "admin") {
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(data.refreshToken)
          );
          location.href = "/";
        }
      } else {
        setPassword("");
        setEmail("");
        if (typeof window !== "undefined") {
          location.href = "/error";
        }
      }
    }
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#e5e7eb]">
      <div className="w-[70%] h-[70%] flex items-center">
        <div className="w-1/2 flex items-center h-full bg-white rounded-md translate-x-[15px]">
          <div className="w-full -translate-y-[10%]">
            <h1 className="text-[1.5rem] font-bold text-center ">
              {" "}
              Good to see you Again{" "}
            </h1>
            <p className="font-normal text-[0.9rem] text-center -translate-y-[4px]">
              {" "}
              Let&apos;s reach those goals{" "}
            </p>
            <form className="w-[70%] mx-auto mt-10">
              <label className="block text-[0.85rem] tracking-[0.9px]">
                {" "}
                Email{" "}
              </label>
              <input
                className={`w-full pb-1 border-b border-solid rounded-sm focus:outline-none placeholder:text-[red] px-3 mb-8 ${
                  emailErr ? "border-[red]" : "border-black"
                }`}
                onChange={(e: any) => setEmail(e.target.value)}
                type="email"
                value={email as string}
                placeholder={emailErr ? "email is incorrect" : ""}
              />
              <label className="block text-[0.85rem] tracking-[0.9px]">
                {" "}
                Password{" "}
              </label>
              <div
                className={`w-full pb-1 border-b border-black border-solid rounded-sm flex items-center justify-between mb-12 ${
                  passwordErr ? "border-[red]" : "border-black"
                }`}
              >
                <input
                  type={seePass ? "text" : "password"}
                  className="focus:outline-none px-3 w-[80%] placeholder:text-[red]"
                  onChange={(e: any) => setPassword(e.target.value)}
                  value={password as string}
                  placeholder={passwordErr ? "password is incorrect" : ""}
                />
                {seePass ? (
                  <FaEye
                    className=" cursor-pointer"
                    onClick={() => setSeePass(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className=" cursor-pointer"
                    onClick={() => setSeePass(true)}
                  />
                )}
              </div>
              <button
                className="w-3/5 py-2 text-center rounded-lg bg-primary block mx-auto text-white font-medium"
                onClick={(e) => Login(e)}
              >
                {" "}
                Login{" "}
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 h-full bg-primary rounded-md flex justify-center items-center">
          <img src="/Admin-bro.png" className="w-[90%]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
