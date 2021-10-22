import React from "react";
import { Route } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Content from "../components/AdminContent";
import { Layout } from "antd";

const DoctorLayout = ({ routes }) => {
  return (
    <Layout>
      <Route>
        <AdminSidebar routes={routes} />
        <Content routes={routes} />
      </Route>
    </Layout>
  );
};

export default DoctorLayout;
