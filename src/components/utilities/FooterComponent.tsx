import React from "react";
import { Layout, Row, Col, Typography, Divider } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

export const FooterComponent: React.FC = () => {
  return (
    <Footer style={{ backgroundColor: "#f0f0f0", bottom: 0, width: "100%" }}>
      <Row justify="center" align="middle">
        <Col span={24}>
          <Row justify="center">
            <Col xs={24} sm={24} md={12} lg={6}>
              <Title level={4}>Shop</Title>
              <Text>Men's Collection</Text>
              <br />
              <Text>Women's Collection</Text>
              <br />
              <Text>Kids' Collection</Text>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Title level={4}>About Us</Title>
              <Text>About the Company</Text>
              <br />
              <Text>Our Team</Text>
              <br />
              <Text>Contact Us</Text>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Title level={4}>Customer Service</Title>
              <Text>Shipping</Text>
              <br />
              <Text>Returns</Text>
              <br />
              <Text>FAQs</Text>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Title level={4}>Follow Us</Title>
              <a href="https://www.facebook.com">
                <FacebookOutlined style={{ fontSize: 24, marginRight: 10 }} />
              </a>
              <a href="https://www.instagram.com">
                <InstagramOutlined style={{ fontSize: 24, marginRight: 10 }} />
              </a>
              <a href="https://www.twitter.com">
                <TwitterOutlined style={{ fontSize: 24, marginRight: 10 }} />
              </a>
              <a href="https://www.youtube.com">
                <YoutubeOutlined style={{ fontSize: 24 }} />
              </a>
            </Col>
          </Row>
          <Divider />
          <Row justify="center">
            <Col span={24} style={{ textAlign: "center" }}>
              <Text>
                &copy; {new Date().getFullYear()} AboutYou Webstore. All Rights
                Reserved.
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
};
