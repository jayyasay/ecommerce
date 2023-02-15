import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

function BreadCrumb(props) {
  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item><Link to="/catalogue">Catalogue</Link></Breadcrumb.Item>
      <Breadcrumb.Item>{props.itemName}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadCrumb;
