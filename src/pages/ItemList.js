import { useState } from "react";
import { Layout, theme } from "antd";
import FormUpdate from "../components/FormUpdate";
import List from "../components/List";

function ItemList() {
  const { Sider } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <Layout>
        <Layout hasSider>
          <Sider
            width={500}
            style={{
              width: "600px",
              background: colorBgContainer,
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <FormUpdate handleRefresh={handleRefresh}/>
          </Sider>
          <Layout
            className="site-layout"
            style={{
              float: "right",
              marginLeft: 0,
            }}
          >
            <List refresh={refresh}/>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default ItemList;
