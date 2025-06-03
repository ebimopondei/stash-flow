import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ContactSupport(){
    const handleSubmitSupport = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Support request submitted successfully!');
    };
    return(
        <div>
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitSupport} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="account">Account Issues</option>
                      <option value="goals">Savings Goals</option>
                      <option value="transactions">Transactions</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue in detail..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    Submit Support Request
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Other ways to reach us:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📧 Email: support@savegoal.app</p>
                    <p>📞 Phone: +234 800 SAVEGOAL</p>
                    <p>💬 Live Chat: Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
    )
}