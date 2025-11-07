import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Header_web from '../Shared/Header_web';
import Link_Arrow from '../Shared/Link_Arrow';
import Swal from 'sweetalert2';

const Withdrawl = () => {
  const { t } = useTranslation();
  const axios = useAxiosSecure();

  const [amount, setAmount] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch only current balance
useEffect(() => {
  const fetchBalance = async () => {
    try {
      const res = await axios.get("/balance");
      console.log("✅ Balance fetched:", res.data);

      const balance = res.data?.data;

      if (balance && balance.current_bl !== undefined) {
        const parsedBalance = parseFloat(balance.current_bl);
        setCurrentBalance(isNaN(parsedBalance) ? 0 : parsedBalance);
        console.log("💰 Current balance set:", parsedBalance);
      } else {
        Swal.fire({
          icon: "warning",
          title: "No Balance Found",
          text: "Could not find your current balance.",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("❌ Error fetching balance:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Balance",
        text: "Something went wrong while fetching your balance.",
        confirmButtonColor: "#d33",
      });
    }
  };

  fetchBalance();
}, []);

// ✅ Withdraw Calculation
const chargeRate = 0.02;
const numericAmount = parseFloat(amount) || 0;
const receivedAmount = numericAmount > 0 ? numericAmount * (1 - chargeRate) : 0;

// ✅ Handle Withdrawal
const handleWithdrawal = async () => {
  console.log("🟡 Withdraw button clicked");

  if (!numericAmount || !selectedWallet || !paymentMethod || !paymentNumber) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Information",
      text: "Please fill in all fields before submitting.",
      confirmButtonColor: "#f6c23e",
    });
    return;
  }

  try {
    setLoading(true);

    console.log("📤 Sending withdrawal request...");
    const res = await axios.post("/withdraws", {
      amount: numericAmount,
      method: paymentMethod,
      account_number: paymentNumber,
      note: `Withdraw from ${selectedWallet} wallet`,
    });

    console.log("📥 Response from server:", res.data);

    if (
      res.data?.status === 200 ||
      res.data?.status === true ||
      res.data?.status === "success"
    ) {
      Swal.fire({
        icon: "success",
        title: "Withdrawal Submitted!",
        text: "Your withdrawal request has been submitted successfully.",
        showConfirmButton: false,
        timer: 2000,
      });
      setAmount("");
      setPaymentNumber("");
      setSelectedWallet("");
      setPaymentMethod("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Withdrawal Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  } catch (error) {
    console.error("❌ Error submitting withdrawal:", error);
    Swal.fire({
      icon: "error",
      title: "Request Failed",
      text: "Unable to submit your withdrawal request.",
      confirmButtonColor: "#d33",
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen lg:mx-auto lg:max-w-7xl font-sans antialiased flex flex-col items-center">
      <div className="w-full top-0 sticky bg-[#ff9100] p-4 pb-4 text-white">
        <Header_web />
        <div className="sticky bg-[#ff9100] top-0 z-10">
          <div className="flex items-center space-x-4 mb-8 py-4">
            <Link_Arrow />
            <h1 className="text-white text-lg lg:text-2xl font-bold">{t('Withdrawl')}</h1>
          </div>
        </div>

        {/* ✅ Display only Current Balance */}
        <div className="flex justify-center text-center mt-4">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{t('CurrentBalance')}</span>
            <span className="text-2xl font-extrabold">৳ {currentBalance.toFixed(2)} BDT</span>
          </div>
        </div>

        <div className="mt-20 w-full">
          <div className="w-full max-w-lg lg:max-w-7xl -mt-10 p-6 bg-white rounded-t-[50px] shadow-2xl">
            
            {/* Select Wallet */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">{t('SelectWallet')}</span>
              </label>
              <select
                className="text-gray-700 select select-bordered w-full rounded-lg h-12"
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
              >
                <option value="" disabled>{t('SelectWallet')}</option>
                <option value="main">{t('MainWallet')} (৳{currentBalance.toFixed(2)})</option>
              </select>
            </div>

            {/* Payment Method */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">{t('PaymentMethod')}</span>
              </label>
              <select
                className="text-gray-700 select select-bordered w-full rounded-lg h-12"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="" disabled>{t('SelectPaymentMethod')}</option>
                <option value="bKash">bKash</option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
              </select>
            </div>

            {/* Payment Number */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">{t('PaymentNumber')}</span>
              </label>
              <input
                type="tel"
                placeholder={t('EnterPaymentNumber')}
                className=" text-gray-700 input input-bordered w-full rounded-lg h-12"
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(e.target.value)}
              />
            </div>

            {/* Amount */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">{t('Amount')}</span>
              </label>
              <input
                type="number"
                placeholder={t('EnterAmount')}
                className="text-gray-700 input input-bordered w-full rounded-lg h-12"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-sm mt-2 text-gray-600">
                {t('Youwillreceive')}{' '}
                <span className="font-bold text-lg text-red-500">{receivedAmount.toFixed(2)}</span> Tk
              </p>
            </div>

            {/* Withdraw Button */}
            <button
              className="btn w-full mt-8 bg-[#ff9100] hover:bg-yellow-600 text-gray-700 font-bold text-lg rounded-lg border-none shadow-md transition-all duration-300 disabled:bg-gray-400"
              onClick={handleWithdrawal}
              disabled={!numericAmount || !selectedWallet || !paymentMethod || !paymentNumber || loading}
            >
              {loading ? t('Processing...') : t('Withdraw')}
            </button>
          </div>

          {/* Note */}
          <div className="w-full bg-white max-w-lg lg:max-w-7xl p-6 text-center text-red-600 text-sm">
            <p>
              পেমেন্ট রিকুয়েস্ট দেওয়ার ২৪ থেকে ৭২ ঘন্টার মধ্যে পেমেন্ট করা হয়। সর্বনিম্ন ২৫০ টাকা উত্তোলন দিতে পারবেন এবং উত্তোলন দেওয়ার সময় ২%
              চার্জ কেটে নেওয়া হবে, ধন্যবাদ।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawl;
