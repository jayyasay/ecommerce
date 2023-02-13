import { Layout, Menu } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AutoComplete, Input } from "antd";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const Navigation = ({ username }) => {
  const { Header } = Layout;

  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3001/api/db/products");
      setOptions(result.data.map((item) => ({ value: item.itemName })));
    };
    fetchData();
  }, []);

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

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredOptions = options.filter(
      (option) => option.value.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setOptions(filteredOptions);
  };

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
              marginLeft: "20px",
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
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: "300px",
            position: "absolute",
            zIndex: 999,
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          options={options}
          // onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search
            size="large"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search"
            enterButton
          />
        </AutoComplete>
      </Layout>
    </>
  );
};

export default Navigation;
