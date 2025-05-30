import { ArrowDownCircle, ArrowUpCircle, AlertTriangle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: string;
  goalId: string;
  goalName: string;
  type: 'Deposit' | 'Disbursement' | 'Early Unlock Penalty';
  amount: number;
  description: string;
  date: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return <ArrowUpCircle className="w-5 h-5 text-green-500" />;
      case 'Disbursement':
        return <ArrowDownCircle className="w-5 h-5 text-blue-500" />;
      case 'Early Unlock Penalty':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'Deposit':
        return 'text-green-600';
      case 'Disbursement':
        return 'text-blue-600';
      case 'Early Unlock Penalty':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAmountDisplay = (type: string, amount: number) => {
    const sign = type === 'Deposit' ? '+' : '-';
    return `${sign}₦${amount.toLocaleString()}`;
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Calendar className="w-5 h-5 mr-2 text-gray-600" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-600">Your transaction history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {transaction.goalName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {transaction.description}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                    {getAmountDisplay(transaction.type, transaction.amount)}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {transaction.type.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;