import axios from "axios";

export const signUp = async (nickname, email, password) => {
  const data = await axios.post("http://localhost:8080/api/signUp", {
    email: email,
    nickname: nickname,
    password: password,
  });
  return data;
};
