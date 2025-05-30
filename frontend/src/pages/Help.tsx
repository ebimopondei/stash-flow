import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserSidebar } from '@/components/layout/UserSidebar';

const Help = () => {
  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support request submitted successfully!');
  };

  return (
    <SidebarProvider>
        <div className="min-h-screen flex w-full">
            <UserSidebar />
            <main className='flex-1  p-6 bg-gray-50'>
                 <div className="max-w-6xl ">
        <div className="mb-8 flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600 text-sm">Find answers or get in touch with our support team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div>
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create a savings goal?</AccordionTrigger>
                    <AccordionContent>
                      To create a savings goal, go to your dashboard and click the "New Goal" button. Fill in the goal details including name, target amount, target date, and payee information.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What happens when I unlock a goal early?</AccordionTrigger>
                    <AccordionContent>
                      When you unlock a goal early, a 5% penalty is applied to your current savings amount. The remaining funds are then released to you.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How does automatic disbursement work?</AccordionTrigger>
                    <AccordionContent>
                      When your goal reaches its target date, the system automatically disburses the funds to the payee details you provided when creating the goal.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I modify a goal after creating it?</AccordionTrigger>
                    <AccordionContent>
                      Currently, you can only modify certain details of active goals. Contact support if you need to make significant changes to your savings goal.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is my money safe with SaveGoal?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we use bank-level security measures and partner with licensed financial institutions to ensure your funds are secure and protected.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
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
        </div>
      </div>
            </main>
    </div>
    </SidebarProvider>
  );
};

export default Help;