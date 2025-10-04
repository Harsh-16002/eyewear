// AdminDashboard.js
import React from "react";
import Layout from "../pages/layout";
import StatsCards from "./StatesCards";
import OverviewTab from "./OverviewTab";

const AdminDashboard = () => {
  return (
    <Layout>
      <StatsCards />
      <OverviewTab />
    </Layout>
  );
};

export default AdminDashboard;
