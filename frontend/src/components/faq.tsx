import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export default function Faq(){
    return(
        <div>
              {/* FAQ div */}
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
    )
}