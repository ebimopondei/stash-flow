import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/layout/UserSidebar";
import {  Dialog,DialogContent,DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Target, Calendar, DollarSign, Edit2, Trash2 } from "lucide-react";
import { toast } from 'sonner'

const UserGoals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Emergency Fund",
      description: "6 months of living expenses",
      target: 10000,
      current: 6500,
      deadline: "2024-08-15",
      category: "Emergency",
      status: "Active",
      contributionFrequency: "Monthly",
    },
    {
      id: 2,
      title: "Vacation to Japan",
      description: "Dream trip to Tokyo and Kyoto",
      target: 5000,
      current: 2800,
      deadline: "2024-12-01",
      category: "Travel",
      status: "Active",
      contributionFrequency: "Weekly",
    },
    {
      id: 3,
      title: "New Car",
      description: "Down payment for electric vehicle",
      target: 25000,
      current: 3150,
      deadline: "2025-06-01",
      category: "Transportation",
      status: "Active",
      contributionFrequency: "Monthly",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    category: "",
    contributionFrequency: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline || !newGoal.category) {
      toast("Error",
        {
        description: "Please fill in all required fields.",
      });
      return;
    }

    const goal = {
      id: goals.length + 1,
      title: newGoal.title,
      description: newGoal.description,
      target: parseFloat(newGoal.target),
      current: 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      status: "Active",
      contributionFrequency: newGoal.contributionFrequency,
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: "",
      description: "",
      target: "",
      deadline: "",
      category: "",
      contributionFrequency: "",
    });
    setIsDialogOpen(false);
    toast("Goal Created!",
      {
      description: `${goal.title} has been added to your goals.`,
    });
  };

  const handleDeposit = (goalId: number, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: goal.current + amount }
        : goal
    ));
    toast("Deposit Successful",
      {
      description: `$${amount} has been added to your goal.`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <UserSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-3xl font-bold">My Goals</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger >
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Savings Goal</DialogTitle>
                  <DialogDescription>
                    Set up a new goal to start your savings journey.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Goal Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Emergency Fund"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your goal..."
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target">Target Amount *</Label>
                      <Input
                        id="target"
                        type="number"
                        placeholder="10000"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline *</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={newGoal.category} onValueChange={(value:any) => setNewGoal({ ...newGoal, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Emergency">Emergency</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Contribution Frequency</Label>
                      <Select value={newGoal.contributionFrequency} onValueChange={(value:any) => setNewGoal({ ...newGoal, contributionFrequency: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleCreateGoal} className="w-full">
                    Create Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Goals Grid */}
          <div className="grid gap-6">
            {goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              const remaining = goal.target - goal.current;
              const daysRemaining = Math.ceil(
                (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <Card key={goal.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="w-5 h-5" />
                          <span>{goal.title}</span>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {goal.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge>{goal.category}</Badge>
                        <Badge variant={goal.status === "Active" ? "default" : "secondary"}>
                          {goal.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Section */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">
                            ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={progress} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{progress.toFixed(1)}% completed</span>
                          <span>${remaining.toLocaleString()} remaining</span>
                        </div>
                      </div>

                      {/* Goal Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>{goal.contributionFrequency} contributions</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleDeposit(goal.id, 100)}
                          className="flex-1"
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Quick Deposit ($100)
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {goals.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Goals Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first savings goal to get started!
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Goal
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserGoals;