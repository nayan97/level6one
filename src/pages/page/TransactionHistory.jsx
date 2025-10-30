import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import Header_web from '../Shared/Header_web';
import Link_Arrow from '../Shared/Link_Arrow';

// Mock Transaction Data
const mockTransactions = [
  {
    id: 1,
    description: "Order Delivery Charge for 3455",
    amount: "130.00",
    date: "Jul 19, 2025 7:20 PM",
    status: "Completed",
    statusColor: "text-green-500",
  },
  {
    id: 2,
    description: "Voucher Purchase Refund (ID: 987)",
    amount: "50.00",
    date: "Jul 18, 2025 10:30 AM",
    status: "Completed",
    statusColor: "text-green-500",
  },
  {
    id: 3,
    description: "Referral Bonus Received",
    amount: "20.00",
    date: "Jul 18, 2025 9:00 AM",
    status: "Completed",
    statusColor: "text-green-500",
  },
  {
    id: 4,
    description: "Withdrawal Request to bKash",
    amount: "250.00",
    date: "Jul 17, 2025 4:45 PM",
    status: "Pending",
    statusColor: "text-yellow-600",
  },
  {
    id: 5,
    description: "Service Fee Deduction",
    amount: "10.00",
    date: "Jul 17, 2025 11:15 AM",
    status: "Completed",
    statusColor: "text-red-500",
  },
];

// Transaction Card Component
const TransactionItem = ({ transaction }) => (
  <div className="flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition duration-150">
    <div className="flex flex-col">
      <span className="font-semibold text-gray-800 text-base md:text-lg">
        {transaction.description}
      </span>
      <span className="text-sm text-gray-500 mt-1">
        {transaction.date}
      </span>
    </div>
    <div className="text-right">
      <span className={`font-bold text-lg md:text-xl text-gray-800`}>
        ৳ {transaction.amount}
      </span>
      {/* Dynamic status color */}
      <span className={`block text-xs font-medium ${transaction.statusColor}`}>
        {transaction.status}
      </span>
    </div>
  </div>
);


const TransactionHistory = () => {
     const { t } = useTranslation();
  const [transactions, setTransactions] = useState(mockTransactions);

  return (
    <div className="min-h-screen mx-auto lg:max-w-7xl font-sans antialiased flex flex-col items-center">
      {/* Top Header Section (Yellow Background) */}
      
      <div className="w-full top-0 sticky  bg-[#ff9100] p-4 pb-4 text-white">
        <Header_web></Header_web>
        <div className="flex items-center space-x-4 mb-2 pt-4">
          {/* Back Arrow Icon (Lucide-react equivalent SVG) */}
          <Link_Arrow></Link_Arrow>
          
          <h1 className="text-white text-lg lg:text-2xl font-bold">{t("Transactions")}</h1>
        </div>
      </div>

      {/* Transaction List Container (White Background Card) */}
      <div className="w-full max-w-lg min-h-screen lg:max-w-7xl  p-0 bg-[#ff9100] rounded-t-[50px] shadow-2xl overflow-hidden">
        {/* The transaction list */}
        <div className="divide-y min-h-screen divide-gray-100">
          {transactions.map(tx => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>
        
        {/* Placeholder/Footer for spacing */}
        <div className="p-4 text-center text-gray-500 text-sm">
          {transactions.length === 0 ? "No transactions found." : "End of list."}
        </div>
      </div>
      
      {/* Ensure responsive padding at the bottom for navigation bar space */}
      <div className="h-16 md:h-8"></div>
    </div>
  );
};

export default TransactionHistory;
