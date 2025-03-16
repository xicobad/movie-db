import { Alert } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";

import "./error-indicator.css";

const ErrorIndicator = () => {
  return (
    <Alert
    className="error-indicator"
    
      message="Error! Failed to receive data"
      type="error"
      closable={{
        "aria-label": "close",
        closeIcon: <CloseSquareOutlined />,
      }}
    />
  );
};

export default ErrorIndicator;
