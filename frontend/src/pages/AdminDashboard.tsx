import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Target, Users, DollarSign, TrendingUp, AlertTriangle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    toast(
      "Logged out",
      {
      description: "Admin session ended successfully.",
    });
    navigate("/");
  };

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+15.2%",
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: "Total Savings",
      value: "$2.5M",
      change: "+8.7%",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      title: "Active Goals",
      value: "3,456",
      change: "+12.3%",
      icon: <Target className="w-4 h-4" />,
    },
    {
      title: "Success Rate",
      value: "78.5%",
      change: "+2.1%",
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", goals: 3, totalSaved: 12450, status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", goals: 2, totalSaved: 8900, status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", goals: 1, totalSaved: 2300, status: "Suspended" },
    { id: 4, name: "Alice Wilson", email: "alice@example.com", goals: 4, totalSaved: 18700, status: "Active" },
  ];

  const goals = [
    { id: 1, user: "John Doe", title: "Emergency Fund", target: 10000, current: 6500, status: "Active" },
    { id: 2, user: "Jane Smith", title: "Vacation", target: 5000, current: 4800, status: "Near Complete" },
    { id: 3, user: "Alice Wilson", title: "New Car", target: 25000, current: 3150, status: "Active" },
    { id: 4, user: "Bob Johnson", title: "House Deposit", target: 50000, current: 2300, status: "Paused" },
  ];

  const alerts = [
    { id: 1, type: "warning", message: "3 goals are overdue for review", timestamp: "2 hours ago" },
    { id: 2, type: "info", message: "System maintenance scheduled for tonight", timestamp: "4 hours ago" },
    { id: 3, type: "error", message: "Payment processor timeout reported", timestamp: "6 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Target className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">SaveFlow Admin</h1>
              <p className="text-sm text-gray-600">Administration Dashboard</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Alerts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Badge variant={alert.type === "error" ? "destructive" : alert.type === "warning" ? "default" : "secondary"}>
                      {alert.type}
                    </Badge>
                    <span className="text-sm">{alert.message}</span>
                  </div>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different management sections */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="goals">Goals Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Goals</TableHead>
                      <TableHead>Total Saved</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.goals}</TableCell>
                        <TableCell>${user.totalSaved.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Goals Management</CardTitle>
                <CardDescription>Monitor and manage user savings goals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Goal Title</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {goals.map((goal) => {
                      const progress = (goal.current / goal.target) * 100;
                      return (
                        <TableRow key={goal.id}>
                          <TableCell className="font-medium">{goal.user}</TableCell>
                          <TableCell>{goal.title}</TableCell>
                          <TableCell>${goal.target.toLocaleString()}</TableCell>
                          <TableCell>${goal.current.toLocaleString()}</TableCell>
                          <TableCell>{progress.toFixed(1)}%</TableCell>
                          <TableCell>
                            <Badge variant={goal.status === "Active" ? "default" : goal.status === "Near Complete" ? "secondary" : "destructive"}>
                              {goal.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Manage</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button>Configure Interest Rates</Button>
                    <Button>Manage Goal Categories</Button>
                    <Button>Set Penalty Rules</Button>
                    <Button>Update System Messages</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>Manage system operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">Backup Database</Button>
                    <Button variant="outline">System Health Check</Button>
                    <Button variant="outline">Clear Cache</Button>
                    <Button variant="outline">Generate Reports</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;