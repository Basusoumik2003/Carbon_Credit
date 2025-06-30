import React, { useState } from 'react';
import './wallet.css';

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [credits, setCredits] = useState(120); // Dummy initial value

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(account);
        // Optional: Fetch credits from blockchain or backend here
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const handleBuy = () => {
    alert("Buy credits clicked!");
    // Integrate buy logic here
  };

  const handleSell = () => {
    alert("Sell credits clicked!");
    // Integrate sell logic here
  };

  return (
    <div className="wallet-container">
      <div className="wallet-card">
        <h2>Carbon Wallet</h2>
        <p className="wallet-subtitle">Manage your carbon credits securely</p>

        {!walletAddress ? (
          <button className="connect-btn" onClick={connectWallet}>Connect to MetaMask</button>
        ) : (
          <>
            <div className="wallet-info">
              <p><strong>Connected:</strong> {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
              <p><strong>Total Credits:</strong> {credits} CC</p>
            </div>
            <div className="action-buttons">
              <button className="buy-btn" onClick={handleBuy}>Buy Credits</button>
              <button className="sell-btn" onClick={handleSell}>Sell Credits</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
