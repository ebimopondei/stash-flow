import TransactionsApi from '@/api/transactions/transactions-api';
import { UserSidebar } from '@/components/layout/UserSidebar';
import TransactionHistory from '@/components/TransactionHistory';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import useDeposit from '@/hooks/form-hooks/use-deposit-hook';
import type { TransactionsAttribute } from '@/types/transactions';
import { useEffect, useState } from 'react';



const Transactions = () => {

  
    const { triggerRefresh } = useDeposit();
  
    const { getTransactions } = TransactionsApi()
  const [ recentTransactions, setRecenTransactions ] = useState<TransactionsAttribute[]>([])

  useEffect(()=>{
    
    async function handleGetTransactions() {
      const response = await getTransactions(1, 3);
      setRecenTransactions(response.data.transactions)
    }

    handleGetTransactions();

  }, [triggerRefresh]);
  return (
<SidebarProvider>
        <div className="min-h-screen flex w-full">
            <UserSidebar />
            <main className='flex-1  p-6 bg-gray-50'>
                <div className="max-w-7xl">
                <div className="mb-8 flex items-center space-x-4">
                    <SidebarTrigger />
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
                      <p className="text-gray-600">View all your transaction history</p>
                    </div>
                </div>

                <TransactionHistory transactions={recentTransactions} />
                </div>
            </main>
    </div>
</SidebarProvider>
  );
};

export default Transactions;