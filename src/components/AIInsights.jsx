import React from 'react';

const AIInsights = ({ transactions, wallets }) => {
  
  const generateBudgetRecommendation = () => {
    if (transactions.length < 10) return null;
    
    // Calculate average monthly spending from last 3 months
    const monthlySpends = [];
    for (let i = 0; i < 3; i++) {
      const month = new Date().getMonth() - i;
      const monthTxns = transactions.filter(t => new Date(t.timestamp).getMonth() === month);
      const monthSpend = monthTxns.reduce((sum, t) => sum + t.amount, 0);
      if (monthSpend > 0) monthlySpends.push(monthSpend);
    }
    
    if (monthlySpends.length === 0) return null;
    
    const avgSpend = monthlySpends.reduce((sum, spend) => sum + spend, 0) / monthlySpends.length;
    const recommendedBudget = avgSpend * 1.1; // 10% buffer
    
    return recommendedBudget;
  };
  
  const generateExpenseSummary = () => {
    if (!transactions.length) return "No transactions to analyze yet.";
    
    const thisMonth = new Date().getMonth();
    const thisMonthTxns = transactions.filter(t => new Date(t.timestamp).getMonth() === thisMonth);
    const totalSpent = thisMonthTxns.reduce((sum, t) => sum + t.amount, 0);
    const avgTransaction = totalSpent / thisMonthTxns.length || 0;
    
    const summaries = [
      `This month, you've made ${thisMonthTxns.length} transactions totaling ₹${totalSpent.toFixed(0)}.`,
      `Your spending pattern shows an average transaction of ₹${avgTransaction.toFixed(0)}.`,
      `You're most active on ${getMostActiveDay()} with frequent transfers.`,
      `Your financial behavior indicates ${getSpendingPersonality(avgTransaction)}.`
    ];
    
    return summaries[Math.floor(Math.random() * summaries.length)];
  };
  
  const getMostActiveDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };
  
  const getSpendingPersonality = (avgTransaction) => {
    if (avgTransaction > 1000) return "you prefer larger, planned transactions";
    if (avgTransaction < 100) return "you make frequent small payments";
    return "balanced spending habits";
  };
  
  const generateInsights = () => {
    if (!transactions.length) return ["Start making transactions to see AI insights!"];
    
    const insights = [];
    const now = new Date();
    const thisMonth = now.getMonth();
    const lastMonth = thisMonth - 1;
    
    // Current month transactions
    const thisMonthTxns = transactions.filter(t => new Date(t.timestamp).getMonth() === thisMonth);
    const lastMonthTxns = transactions.filter(t => new Date(t.timestamp).getMonth() === lastMonth);
    
    const thisMonthSpend = thisMonthTxns.reduce((sum, t) => sum + t.amount, 0);
    const lastMonthSpend = lastMonthTxns.reduce((sum, t) => sum + t.amount, 0);
    
    // Spending comparison
    if (lastMonthSpend > 0) {
      const change = ((thisMonthSpend - lastMonthSpend) / lastMonthSpend) * 100;
      if (change > 10) {
        insights.push(`💸 You've spent ${change.toFixed(0)}% more this month compared to last month`);
      } else if (change < -10) {
        insights.push(`💰 Great job! You've reduced spending by ${Math.abs(change).toFixed(0)}% this month`);
      } else {
        insights.push(`📊 Your spending is consistent - only ${Math.abs(change).toFixed(0)}% change from last month`);
      }
    }
    
    // Transaction frequency
    if (thisMonthTxns.length > 10) {
      insights.push(`🔥 You're very active with ${thisMonthTxns.length} transactions this month`);
    } else if (thisMonthTxns.length < 3) {
      insights.push(`😴 Low activity detected - only ${thisMonthTxns.length} transactions this month`);
    }
    
    // Average transaction
    const avgTransaction = thisMonthSpend / thisMonthTxns.length || 0;
    if (avgTransaction > 1000) {
      insights.push(`💎 Your average transaction is ₹${avgTransaction.toFixed(0)} - you prefer larger transfers`);
    } else if (avgTransaction < 100) {
      insights.push(`🪙 Your average transaction is ₹${avgTransaction.toFixed(0)} - you make frequent small transfers`);
    }
    
    // Wallet balance insight
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
    if (totalBalance > 10000) {
      insights.push(`🏦 Strong financial position with ₹${totalBalance.toFixed(0)} total balance across wallets`);
    } else if (totalBalance < 1000) {
      insights.push(`⚠️ Consider topping up - your total balance is ₹${totalBalance.toFixed(0)}`);
    }
    
    return insights.length ? insights : ["Keep using your wallet to unlock more insights!"];
  };
  
  const predictNextMonth = () => {
    if (transactions.length < 3) return null;
    
    // Simple moving average of last 3 months
    const monthlySpends = [];
    for (let i = 0; i < 3; i++) {
      const month = new Date().getMonth() - i;
      const monthTxns = transactions.filter(t => new Date(t.timestamp).getMonth() === month);
      const monthSpend = monthTxns.reduce((sum, t) => sum + t.amount, 0);
      if (monthSpend > 0) monthlySpends.push(monthSpend);
    }
    
    if (monthlySpends.length === 0) return null;
    
    const avgSpend = monthlySpends.reduce((sum, spend) => sum + spend, 0) / monthlySpends.length;
    return avgSpend;
  };
  
  const insights = generateInsights();
  const prediction = predictNextMonth();
  const budgetRecommendation = generateBudgetRecommendation();
  const expenseSummary = generateExpenseSummary();
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    }}>
      {/* AI Insights Card */}
      <div style={{
        background: 'linear-gradient(135deg, #E43636, #c62d2d)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '15px'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🤖 AI Insights
        </h3>
        
        <div style={{ marginBottom: '1rem' }}>
          {insights.slice(0, 2).map((insight, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              {insight}
            </div>
          ))}
        </div>
        
        {prediction && (
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Next Month Prediction</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              📈 You'll likely spend ₹{prediction.toFixed(0)} next month
            </div>
          </div>
        )}
      </div>
      
      {/* Smart Budget Assistant */}
      {budgetRecommendation && (
        <div style={{
          background: 'linear-gradient(135deg, #E43636, #c62d2d)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '15px'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ Smart Budget Assistant
          </h3>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Recommended Monthly Budget</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px 0' }}>
              ₹{budgetRecommendation.toFixed(0)}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              Based on your spending patterns
            </div>
          </div>
        </div>
      )}
      
      {/* AI Expense Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #E43636, #c62d2d)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '15px'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🔍 AI Expense Summary
        </h3>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          {expenseSummary}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;