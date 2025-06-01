import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/layout/UserSidebar";
import {  Dialog,DialogContent,DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Target, Calendar, DollarSign, Edit2, Trash2 } from "lucide-react";
import { toast } from 'sonner'
import useCreateGoal from "@/hooks/form-hooks/use-create-goal-hook";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import GoalsApi from "@/api/goals/goals-api";
import { type CreateGoalFormData } from '@shared/validation/signup-schema'


const UserGoals = () => {

  const { form, onCreateGoal, isDialogOpen, setIsDialogOpen } = useCreateGoal();

  const { getGoals } = GoalsApi()

  const [goals, setGoals] = useState<CreateGoalFormData[]>([]);

  useEffect(()=>{

    async function handleGetGoals(){
      const response = await getGoals();
      setGoals(response.data)
      console.log(response.data)
    } 

    handleGetGoals();

  }, [])




  const handleDeposit = (goalId: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, savedAmount: String(Number(goal.savedAmount) + amount) }
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

                <Form {...form}>
                  <form className="" onSubmit={form.handleSubmit(onCreateGoal)}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <FormField 
                          control={form.control}
                          name="title"
                          render={({field}) =>(
                            <FormItem>
                              <FormLabel>Goal Title *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Emergency Fund" {...field} />
                              </FormControl>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormField 
                          control={form.control}
                          name="description"
                          render={({field}) =>(
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Describe your goal..." {...field} />
                              </FormControl>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField 
                            control={form.control}
                            name="targetAmount"
                            render={({field}) =>(
                              <FormItem>
                                <FormLabel>Target Amount*</FormLabel>
                                <FormControl>
                                  <Input placeholder="10000" {...field}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                              </FormItem>
                            )}
                          />  
                        </div>

                        <div className="space-y-2">
                          <FormField 
                            control={form.control}
                            name="deadline"
                            render={({field}) =>(
                              <FormItem>
                                <FormLabel>Deadline *</FormLabel>
                                <FormControl>
                                  <Input type="date"  {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField 
                            control={form.control}
                            name="category"
                            render={({field}) =>(
                              <FormItem>
                                <FormLabel>Category *</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value} >
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
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <FormField 
                            control={form.control}
                            name="frequency"
                            render={({field}) =>(
                              <FormItem>
                                <FormLabel>Select Frequency *</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Weekly">Weekly</SelectItem>
                                      <SelectItem value="Monthly">Monthly</SelectItem>
                                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Create Goal
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Goals Grid */}
          <div className="grid gap-6">
            {goals?.map((goal) => {
              const progress = (Number(goal.savedAmount) / Number(goal.targetAmount)) * 100;
              const remaining = Number(goal.targetAmount) - Number(goal.savedAmount);
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
                        <Badge variant={goal.status === "active" ? "default" : "secondary"}>
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
                            ${Number(goal.savedAmount).toLocaleString()} / ${goal.targetAmount.toLocaleString()}
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
                          <span>{goal.frequency} contributions</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleDeposit(String(goal.id), 100)}
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

          {goals?.length === 0 && (
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