import { Layout, Menu } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const { Header } = Layout;

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const Navigation = ({ username }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const result = await axios.get(
            `http://localhost:3001/api/db/registrations/${username}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(result.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [username]);

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <div
            style={{
              float: "right",
              color: "#fff",
              cursor: "pointer",
              marginLeft: "20px"
            }}
            onClick={handleLogout}
          >
            {user.username ? "Logout" : ""}
          </div>
          <div
            style={{
              float: "right",
              color: "#fff",
            }}
          >
            {user.username ? `Welcome! ${user.username}` : ""}
          </div>
          <Link to="/">
            <img
              style={{
                float: "left",
                marginRight: "20px",
              }}
              src="/logo.png"
              alt="logo"
            />
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={[
              {
                label: <Link to="/item-list">Item List</Link>,
                key: "2",
              },
            ]}
          />
        </Header>
      </Layout>
    </>
  );
};

export default Navigation;
