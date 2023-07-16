import axios from "axios";

export const getUser = async () => {
  const data = await axios.get("http://localhost:8080/api/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data;
};
