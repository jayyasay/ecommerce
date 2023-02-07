import { Layout, Menu } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";

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
              width: 120,
              height: 31,
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </div>
          <img
            style={{
              float: "left",
              marginRight: "20px",
            }}
            src="/logo.png"
            alt="logo"
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              {
                label: `Welcome! ${user.username}`,
                key: "1",
              },
            ]}
          />
        </Header>
      </Layout>
    </>
  );
};

export default Navigation;
