import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setUsername(value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        login({
          id: "3",
          name: username,
          avatar: "user3.png",
        })
      );
      navigate("/message");
    },
    [username, dispatch, navigate]
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="max-w-[360px] w-full p-8 rounded-xl bg-[#EEF1F4] flex flex-col gap-2">
          <input
            className="w-full rounded-lg px-8 py-2"
            value={username}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="border border-white px-4 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
