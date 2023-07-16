import { Alert, Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/signUp";
import "./AuthPage.css";

const errorMessage =
  "Никнейм должен состоять минимум из 6 латинских символов, Пароль должен содержать минимум 8 символов";

const AuthPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async () => {
    setError(null);
    try {
      const response = await signUp(nickname, email, password);
      console.log(response);

      const { accessToken, refreshToken } = response.data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      {error ? (
        <Alert
          message="Проверьте правильность введенных данных"
          description={error}
          type="error"
          closeIcon
        />
      ) : null}
      <div className="auth-block">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Nickname"
            name="nickname"
            rules={[{ required: true, message: "Please input your nickname!" }]}
          >
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
