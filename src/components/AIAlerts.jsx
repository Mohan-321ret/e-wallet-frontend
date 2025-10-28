import React, { useState, useEffect } from 'react';

const AIAlerts = ({ transactions, wallets }) => {
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    generateAlerts();
  }, [transactions, wallets]);

  const generateAlerts = () => {
    if (!transactions.length) return;

    const newAlerts = [];
    const now = new Date();
    const today = now.toDateString();
    const thisWeek = now.getTime() - (7 * 24 * 60 * 60 * 1000);
    const lastWeek = now.getTime() - (14 * 24 * 60 * 60 * 1000);

    // Daily spending alert
    const todayTxns = transactions.filter(t => new Date(t.timestamp).toDateString() === today);
    const todaySpend = todayTxns.reduce((sum, t) => sum + t.amount, 0);
    
    if (todaySpend > 2000) {
      newAlerts.push({
        type: 'warning',
        icon: '⚠️',
        message: `You've spent ₹${todaySpend.toFixed(0)} today - that's quite high!`,
        time: 'Just now'
      });
    }

    // Weekly comparison
    const thisWeekTxns = transactions.filter(t => new Date(t.timestamp).getTime() > thisWeek);
    const lastWeekTxns = transactions.filter(t => {
      const txnTime = new Date(t.timestamp).getTime();
      return txnTime > lastWeek && txnTime <= thisWeek;
    });

    const thisWeekSpend = thisWeekTxns.reduce((sum, t) => sum + t.amount, 0);
    const lastWeekSpend = lastWeekTxns.reduce((sum, t) => sum + t.amount, 0);

    if (lastWeekSpend > 0) {
      const savings = lastWeekSpend - thisWeekSpend;
      if (savings > 100) {
        newAlerts.push({
          type: 'success',
          icon: '💰',
          message: `Great job! You saved ₹${savings.toFixed(0)} compared to last week!`,
          time: '1 hour ago'
        });
      } else if (savings < -500) {
        newAlerts.push({
          type: 'warning',
          icon: '📈',
          message: `You've spent ₹${Math.abs(savings).toFixed(0)} more than last week`,
          time: '2 hours ago'
        });
      }
    }

    // Low balance alert
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
    if (totalBalance < 500) {
      newAlerts.push({
        type: 'error',
        icon: '🚨',
        message: `Low balance alert! Only ₹${totalBalance.toFixed(0)} remaining across all wallets`,
        time: '30 min ago'
      });
    }

    // High activity alert
    if (todayTxns.length > 5) {
      newAlerts.push({
        type: 'info',
        icon: '🔥',
        message: `High activity day! You've made ${todayTxns.length} transactions today`,
        time: '15 min ago'
      });
    }

    setAlerts(newAlerts);
    if (newAlerts.length > 0) setShowAlerts(true);
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'success': return '#28a745';
      case 'warning': return '#ffc107';
      case 'error': return '#dc3545';
      default: return '#17a2b8';
    }
  };

  if (!alerts.length) return null;

  return (
    <>
      {/* Alert Bell Icon */}
      <div
        onClick={() => setShowAlerts(!showAlerts)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '90px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: alerts.length > 0 ? '#E43636' : '#6c757d',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          fontSize: '20px',
          zIndex: 1001,
          position: 'relative'
        }}
      >
        🔔
        {alerts.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#ffc107',
            color: '#000',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {alerts.length}
          </div>
        )}
      </div>

      {/* Alerts Panel */}
      {showAlerts && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            width: '350px',
            maxHeight: '400px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          <div style={{
            background: '#E43636',
            color: 'white',
            padding: '15px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>🔔 Smart Alerts</span>
            <button
              onClick={() => setShowAlerts(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {alerts.map((alert, index) => (
              <div
                key={index}
                style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  borderLeft: `4px solid ${getAlertColor(alert.type)}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{alert.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                      {alert.message}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {alert.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AIAlerts;