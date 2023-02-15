import { Layout, Menu } from "antd";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AutoComplete, Input } from "antd";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const Navigation = ({ username }) => {
  const navigate = useNavigate();

  const { Header } = Layout;

  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navStyle = useMemo(
    () => ({
      header: {
        backgroundColor: "#C4A484"
      },
    }),
    []
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get("http://localhost:3001/api/db/products");
  //     setOptions(result.data.map((item) => ({ value: item.itemName })));
  //   };
  //   fetchData();
  // }, []);

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

  const handleSearch = async (value) => {
    setSearchText(value);
    if (value === "") {
      setOptions([]);
    } else {
      const result = await axios.get(`http://localhost:3001/api/db/products`);
      const filteredOptions = result.data.filter((item) =>
        item.itemName.toLowerCase().includes(value.toLowerCase())
      );
      setTimeout(() => {
        if (value === "") {
          setOptions([]);
        } else {
          setOptions(
            filteredOptions.map((item) => ({
              id: item._id,
              value: item.itemName,
            }))
          );
        }
      }, 500);
    }
  };

  const onSelect = async (value, option) => {
    await axios
      .get(`http://localhost:3001/api/db/products/${option.id}`)
      .then((res) => {
        navigate(`/edit/${res.data._id}`);
      });
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
            ...navStyle.header
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
          <AutoComplete
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            style={{
              marginRight: "30px",
              float: "right",
              height: "64px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input.Search
              size="large"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Quick search"
              enterButton
            />
          </AutoComplete>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              display: "flex",
              alignItems: "center",
              ...navStyle.header
            }}
            items={[
              {
                label: <Link to="/item-list">Item List</Link>,
                key: "2",
              },
              {
                label: <Link to="/catalogue">Catalogue</Link>,
                key: "3",
              },
            ]}
          />
        </Header>
      </Layout>
    </>
  );
};

export default Navigation;
