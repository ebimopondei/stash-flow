import ContactSupport from "@/components/contact-support";
import Faq from "@/components/faq";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Goal-Based Savings",
      description: "Set specific savings goals and watch your progress grow with automated tracking."
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "Secure & Locked",
      description: "Your savings are locked until maturity, helping you stay disciplined and focused."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Track Progress",
      description: "Visual progress tracking and milestone celebrations keep you motivated."
    }
  ];

  const benefits = [
    "Automated savings disbursement",
    "Goal-based financial planning",
    "Progress tracking & analytics",
    "Secure fund management",
    "Flexible goal categories",
    "Achievement milestones"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b bg-white/80 dark:bg- backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Target className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">SaveFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build Your Future with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Disciplined Savings
            </span>
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Create locked savings goals, track your progress, and achieve your financial dreams with automated disbursement when you reach your targets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Start Saving Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to='#'>
              <Button size="lg" variant="ghost" className="text-white border-white ">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Smart Savings Made Simple
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines goal-setting psychology with automated financial discipline to help you achieve your dreams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-blue-50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose SaveFlow?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Take control of your financial future with our comprehensive savings platform designed to build lasting wealth-building habits.
              </p>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="gradient-bg rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Join thousands of users who have already achieved their savings goals with SaveFlow.
                </p>
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    Create Your Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

        <section className="py-20 ">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Faq />
            <ContactSupport />
          </div>
        </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6" />
                <span className="text-xl font-bold">SaveFlow</span>
              </div>
              <p className="text-gray-400">
                Building disciplined savers, one goal at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Contact</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Disclaimer</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SaveFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;