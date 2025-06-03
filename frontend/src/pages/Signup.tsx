import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";
import { Link} from "react-router-dom";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useSignup from "@/hooks/form-hooks/use-signup-hook";

const Signup = () => {

  const { onSignUp, form, isLoading } = useSignup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900">
            <Target className="w-8 h-8 text-primary" />
            <span>SaveFlow</span>
          </Link>
        </div>
        
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join SaveFlow and start saving today
            </CardDescription>
          </CardHeader>
          <CardContent>

            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSignUp)}>
                <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                      name="lastname"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                  </div> 
                </div>

                <div className="space-y-2">
                    <FormLabel>Email</FormLabel>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
                        <FormItem className="flex-1">
                          <FormControl >
                            <Input className="flex-1" placeholder="john@doe.com" {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <Button>Get OTP</Button>

                  </div>

                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({field}) => (
                        <FormItem className="flex-1">
                            <FormLabel>Password</FormLabel>
                          <FormControl >
                            <Input placeholder="Create password" {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                      />

                  </div>

                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({field}) => (
                        <FormItem className="flex-1">
                            <FormLabel>Confirm Password</FormLabel>
                          <FormControl >
                            <Input placeholder="Confirm password" {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                      />

                  </div>

                </div>

                <Button className="w-full" disabled={isLoading} type="submit">{isLoading ? <div className="spinner"></div> : "Create Account"}</Button>
                </form>
            </Form>
            
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;