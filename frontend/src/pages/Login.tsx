import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useLogin from "@/hooks/form-hooks/use-login-hook";


const Login = () => {

  const { form, onLogin, isLoading } = useLogin()

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
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your SaveFlow account
            </CardDescription>
          </CardHeader>
          <CardContent>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                <Button disabled={isLoading} className="w-full" type="submit"> {isLoading ? <div className="spinner"></div> : "Sign In"} </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;