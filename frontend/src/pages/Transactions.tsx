import { UserSidebar } from '@/components/layout/UserSidebar';
import TransactionHistory from '@/components/TransactionHistory';
import { SidebarProvider } from '@/components/ui/sidebar';

// Mock data (same as in Index.tsx)
const mockTransactions = [
  {
    id: '1',
    goalId: '1',
    goalName: 'July Rent Payment',
    type: 'Deposit' as const,
    amount: 25000,
    description: 'Weekly contribution',
    date: '2025-05-25'
  },
  {
    id: '2',
    goalId: '2',
    type: 'Deposit' as const,
    goalName: 'Emergency Fund',
    amount: 50000,
    description: 'Monthly contribution',
    date: '2025-05-20'
  },
  {
    id: '3',
    goalId: '3',
    type: 'Disbursement' as const,
    goalName: 'Laptop Purchase',
    amount: 800000,
    description: 'Goal completed - funds disbursed',
    date: '2025-05-15'
  }
];

const Transactions = () => {
  return (
<SidebarProvider>
        <div className="min-h-screen flex w-full">
            <UserSidebar />
            <main className='flex-1  p-6 bg-gray-50'>
                <div className="max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
                    <p className="text-gray-600">View all your transaction history</p>
                </div>

                <TransactionHistory transactions={mockTransactions} />
                </div>
            </main>
    </div>
</SidebarProvider>
  );
};

export default Transactions;