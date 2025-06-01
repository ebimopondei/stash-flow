import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/layout/UserSidebar";
import { Target, TrendingUp, DollarSign, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardApi from "@/api/dashboard/dashboard-api";
import { useEffect, useState } from "react";
import type { Statistics } from "@/types/dashboard";



const Dashboard = () => {

  const { getDashboardStats } = DashboardApi()

  const [ stats, setStats ] = useState<Statistics| null>(null);


  

  useEffect(()=>{
    async function handleGetDashboardStats() {
      const response = await getDashboardStats();
      setStats(response.data)
    }

    handleGetDashboardStats();

  }, []);
  
  const recentTransactions = [
    { id: 1, description: "Monthly deposit - Emergency Fund", amount: 500, date: "2024-01-15", type: "deposit" },
    { id: 2, description: "Weekly deposit - Vacation", amount: 100, date: "2024-01-12", type: "deposit" },
    { id: 3, description: "Monthly deposit - Car Fund", amount: 300, date: "2024-01-10", type: "deposit" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <UserSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-3xl font-bold">Welcome</h1>
            </div>
            <Link to="/dashboard/goals">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Main Wallet</CardTitle>
                  {<DollarSign className="w-4 h-4" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats?.wallets.main}</div>
                  <p className="text-xs text-muted-foreground">+16%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sub Wallet</CardTitle>
                  {<DollarSign className="w-4 h-4" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats?.wallets.sub}</div>
                  <p className="text-xs text-muted-foreground">+3%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                  {<DollarSign className="w-4 h-4" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats?.totalSaved}</div>
                  <p className="text-xs text-muted-foreground">+10%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
                  {<Target className="w-4 h-4" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.activeGoals}</div>
                  <p className="text-xs text-muted-foreground">+0</p>
                </CardContent>
              </Card>
            {/* {stats.map((stat, index) => (
            ))} */}
          </div>

          {/* Goals Overview */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Active Goals</CardTitle>
                <CardDescription>Your current savings progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats?.goals.map((goal) => {
                  const progress = (Number(goal.savedAmount) / Number(goal.targetAmount)) * 100;
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{goal.title}</h4>
                        <span className="text-sm text-muted-foreground">
                          ${String(goal.savedAmount).toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{goal.category}</span>
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest activity on your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          +${transaction.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/dashboard/transactions">
                  <Button variant="outline" className="w-full mt-4">
                    View All Transactions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your savings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/dashboard/goals">
                  <Button className="w-full h-20 flex flex-col space-y-2">
                    <Target className="w-6 h-6" />
                    <span>Create New Goal</span>
                  </Button>
                </Link>
                <Button className="w-full h-20 flex flex-col space-y-2" variant="outline">
                  <DollarSign className="w-6 h-6" />
                  <span>Make Deposit</span>
                </Button>
                <Link to="/dashboard/settings">
                  <Button className="w-full h-20 flex flex-col space-y-2" variant="outline">
                    <TrendingUp className="w-6 h-6" />
                    <span>View Analytics</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;