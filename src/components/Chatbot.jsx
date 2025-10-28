import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your E-Wallet assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('create') || input.includes('wallet') || input.includes('new wallet')) {
      return 'To create a wallet: Go to "Create Wallet" tab → Fill owner name, email, phone, initial balance → Click "Add Wallet"';
    }
    
    if (input.includes('transfer') || input.includes('send') || input.includes('money')) {
      return 'To transfer funds: Go to "Transfer" tab → Enter from wallet ID, to wallet ID, and amount → Click "Transfer"';
    }
    
    if (input.includes('top up') || input.includes('topup') || input.includes('add money')) {
      return 'To top up wallet: Go to "Top Up" tab → Enter wallet ID and amount → Click "Add Money"';
    }
    
    if (input.includes('history') || input.includes('transaction') || input.includes('view')) {
      return 'To view transactions: Go to "History" tab → See all your transaction history';
    }
    
    if (input.includes('balance') || input.includes('check')) {
      return 'Your wallet balance is shown in the Overview tab. Each wallet displays its current balance.';
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      return 'I can help you with: Creating wallets, Transferring money, Topping up, Viewing history, Checking balance';
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! Welcome to E-Wallet support. What would you like to know?';
    }
    
    return "I'm sorry, I didn't understand that. Try asking about: creating wallet, transfer money, top up, view history, or balance.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    const botResponse = { text: getBotResponse(input), isBot: true };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E43636, #c62d2d)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          fontSize: '24px',
          zIndex: 1000
        }}
      >
        {isOpen ? '✕' : '💬'}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '450px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #E43636, #c62d2d)',
              color: 'white',
              padding: '15px',
              borderRadius: '15px 15px 0 0',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            🤖 E-Wallet Assistant
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  background: msg.isBot ? '#f1f1f1' : '#E43636',
                  color: msg.isBot ? '#333' : 'white',
                  padding: '10px 12px',
                  borderRadius: '15px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: '15px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '10px'
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: '#E43636',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;