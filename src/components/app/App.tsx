import React from "react";
import { Layout } from "antd";
import MovieGrid from "../movie-grid";

const { Content } = Layout;

import './App.css'

function App() {

  return (
    <Layout style={{ padding: "20px", background: "#f0f2f5" }}>
      <Content>
        <MovieGrid />
      </Content>
    </Layout>
  );
}

export default App
