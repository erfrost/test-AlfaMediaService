import "./PrivatePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../api/getUser";
import { Spin } from "antd";
import { dateTransform } from "../../utils/dateTransform";

const PrivatePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const getInfo = async () => {
    if (!data) {
      setLoading(true);
      setServerError(null);
      try {
        const { data } = await getUser();
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
        if (error.response.statusText === "Unauthorized") navigate("/auth");
        else setServerError(error);
      } finally {
        setLoading(false);
      }
    } else return;
  };

  useEffect(() => {
    getInfo();
  }, []);

  const onExit = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return navigate("/auth");
  };

  if (serverError) {
    return (
      <div className="notice-container">
        <span className="error-status">{serverError.response.status}</span>
        <span className="error-message">{serverError.response.statusText}</span>
      </div>
    );
  }

  return loading ? (
    <div className="notice-container">
      <Spin />
    </div>
  ) : (
    <div className="PrivatePage">
      <div className="btn" onClick={onExit}>
        Exit
      </div>
      <div className="user-info">
        <div className="user-info-df">
          <span className="user-info">Email: </span>
          <span className="user-info info-value">{data.email}</span>
        </div>
        <div className="user-info-df">
          <span className="user-info">Nickname: </span>
          <span className="user-info info-value">{data.nickname}</span>
        </div>
        <div className="user-info-df">
          <span className="user-info">ID: </span>
          <span className="user-info info-value">{data._id}</span>
        </div>
        <div className="user-info-df">
          <span className="user-info">Created at: </span>
          <span className="user-info info-value">
            {dateTransform(data.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
