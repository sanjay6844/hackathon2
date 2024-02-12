import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { arrayOf, node, shape } from "prop-types";

const SplitFormLayout = ({ children, rowCss = {} }) => {
  const totalGrid = 24;
  const firstColPadding = { paddingRight: "7px" };
  const otherColPadding = { paddingLeft: "7px", paddingRight: "7px" };
  const lastColPadding = { paddingLeft: "7px" };

  const getLayout = () => {
    return Math.floor(totalGrid / children.length);
  };

  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const l = getLayout();
    const elements = React.Children.toArray(children).map((x, idx) => {
      let style;
      switch (idx) {
      case 0:
        style = firstColPadding;
        break;
      case children.length - 1:
        style = lastColPadding;
        break;
      default:
        style = otherColPadding;
      }
      return (
        <Col key={idx} span={l} style={style}>
          {x}
        </Col>
      );
    });
    setLayout(elements);
  }, [children]);

  return <Row style={rowCss}>{layout}</Row>;
};

SplitFormLayout.propTypes = {
  children: arrayOf(node).isRequired,
  rowCss: shape({}),
};

export default SplitFormLayout;
