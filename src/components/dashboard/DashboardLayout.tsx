import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart4,
  Calendar,
  Clock,
  CalendarDays,
} from "lucide-react";
import SubscriptionPlansManagement from "./SubscriptionPlansManagement";
import MemberManagement from "./MemberManagement";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardLayout = () => {
  const [reportType, setReportType] = useState("daily");

  // Daily report data (last 7 days)
  const dailyData = [
    { name: "Mon", visits: 24, revenue: 420, newMembers: 3 },
    { name: "Tue", visits: 18, revenue: 380, newMembers: 2 },
    { name: "Wed", visits: 32, revenue: 560, newMembers: 5 },
    { name: "Thu", visits: 26, revenue: 490, newMembers: 4 },
    { name: "Fri", visits: 35, revenue: 620, newMembers: 6 },
    { name: "Sat", visits: 42, revenue: 780, newMembers: 8 },
    { name: "Sun", visits: 28, revenue: 510, newMembers: 3 },
  ];

  // Monthly report data (last 6 months)
  const monthlyData = [
    {
      name: "Jan",
      visits: 580,
      revenue: 9800,
      newMembers: 24,
      cancelations: 8,
    },
    {
      name: "Feb",
      visits: 620,
      revenue: 10400,
      newMembers: 28,
      cancelations: 6,
    },
    {
      name: "Mar",
      visits: 750,
      revenue: 12500,
      newMembers: 32,
      cancelations: 9,
    },
    {
      name: "Apr",
      visits: 680,
      revenue: 11200,
      newMembers: 26,
      cancelations: 7,
    },
    {
      name: "May",
      visits: 790,
      revenue: 13600,
      newMembers: 35,
      cancelations: 10,
    },
    {
      name: "Jun",
      visits: 820,
      revenue: 14200,
      newMembers: 38,
      cancelations: 12,
    },
  ];

  // Yearly report data (last 5 years)
  const yearlyData = [
    {
      name: "2019",
      visits: 8200,
      revenue: 142000,
      newMembers: 320,
      cancelations: 95,
      retention: 78,
    },
    {
      name: "2020",
      visits: 7400,
      revenue: 128000,
      newMembers: 280,
      cancelations: 120,
      retention: 72,
    },
    {
      name: "2021",
      visits: 9100,
      revenue: 156000,
      newMembers: 350,
      cancelations: 105,
      retention: 80,
    },
    {
      name: "2022",
      visits: 10500,
      revenue: 182000,
      newMembers: 410,
      cancelations: 115,
      retention: 82,
    },
    {
      name: "2023",
      visits: 12200,
      revenue: 210000,
      newMembers: 480,
      cancelations: 125,
      retention: 85,
    },
  ];

  // Plan popularity data
  const planData = [
    { name: "Basic", members: 45, percentage: 35 },
    { name: "Standard", members: 62, percentage: 48 },
    { name: "Premium", members: 21, percentage: 17 },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Subscription Management System
          </h1>
          <Button variant="outline">Logout</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-1">
        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscription Plans
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Dashboard Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-medium text-gray-500">Total Members</h3>
                    <p className="text-3xl font-bold">128</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-medium text-gray-500">
                      Active Subscriptions
                    </h3>
                    <p className="text-3xl font-bold">98</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-medium text-gray-500">
                      Monthly Revenue
                    </h3>
                    <p className="text-3xl font-bold">$4,250</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <SubscriptionPlansManagement />
          </TabsContent>

          <TabsContent value="members">
            <MemberManagement />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Reports Dashboard</h2>
                  <div className="flex gap-2">
                    <Button
                      variant={reportType === "daily" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReportType("daily")}
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-4 w-4" /> Daily
                    </Button>
                    <Button
                      variant={reportType === "monthly" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReportType("monthly")}
                      className="flex items-center gap-1"
                    >
                      <Calendar className="h-4 w-4" /> Monthly
                    </Button>
                    <Button
                      variant={reportType === "yearly" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReportType("yearly")}
                      className="flex items-center gap-1"
                    >
                      <CalendarDays className="h-4 w-4" /> Yearly
                    </Button>
                  </div>
                </div>

                {reportType === "daily" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Daily Visits & Revenue (Last 7 Days)
                      </h3>
                      <div className="h-72 bg-white p-4 rounded-lg shadow">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={dailyData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="visits"
                              stroke="#8884d8"
                              activeDot={{ r: 8 }}
                              name="Visits"
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="revenue"
                              stroke="#82ca9d"
                              name="Revenue ($)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        New Member Signups (Last 7 Days)
                      </h3>
                      <div className="h-64 bg-white p-4 rounded-lg shadow">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={dailyData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="newMembers"
                              fill="#8884d8"
                              name="New Members"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {reportType === "monthly" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Monthly Performance (Last 6 Months)
                      </h3>
                      <div className="h-72 bg-white p-4 rounded-lg shadow">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={monthlyData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="visits"
                              stackId="1"
                              stroke="#8884d8"
                              fill="#8884d8"
                              name="Visits"
                            />
                            <Area
                              type="monotone"
                              dataKey="newMembers"
                              stackId="2"
                              stroke="#82ca9d"
                              fill="#82ca9d"
                              name="New Members"
                            />
                            <Area
                              type="monotone"
                              dataKey="cancelations"
                              stackId="2"
                              stroke="#ffc658"
                              fill="#ffc658"
                              name="Cancelations"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Monthly Revenue (Last 6 Months)
                      </h3>
                      <div className="h-64 bg-white p-4 rounded-lg shadow">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={monthlyData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="revenue"
                              fill="#82ca9d"
                              name="Revenue ($)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {reportType === "yearly" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Yearly Growth (Last 5 Years)
                      </h3>
                      <div className="h-72 bg-white p-4 rounded-lg shadow">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={yearlyData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="revenue"
                              stroke="#82ca9d"
                              name="Revenue ($100s)"
                            />
                            <Line
                              type="monotone"
                              dataKey="newMembers"
                              stroke="#8884d8"
                              name="New Members"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Member Retention Rate (%)
                      </h3>
                      <div className="h-64 bg-white p-4 rounded-lg shadow">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={yearlyData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="retention"
                              fill="#8884d8"
                              name="Retention Rate (%)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Current Plan Distribution
                      </h3>
                      <div className="h-64 bg-white p-4 rounded-lg shadow">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={planData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" orientation="left" />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              domain={[0, 100]}
                            />
                            <Tooltip />
                            <Legend />
                            <Bar
                              yAxisId="left"
                              dataKey="members"
                              fill="#8884d8"
                              name="Members"
                            />
                            <Bar
                              yAxisId="right"
                              dataKey="percentage"
                              fill="#82ca9d"
                              name="Percentage (%)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Outlet />
      </div>

      <footer className="bg-white shadow-sm mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500">
          &copy; 2023 Subscription Management System
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
