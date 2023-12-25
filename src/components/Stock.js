import React, { useState, useEffect } from "react";
import "./Stock.css";

function Stock() {
  const [wallet, setWallet] = useState(10000);
  const [ethPrice, setEthPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);

  const handleBuy = () => {
    if (ethPrice === buyPrice) {
      setWallet(wallet - buyPrice);
      setBuyPrice(0);
    }
  };

  const handleSell = () => {
    if (ethPrice === sellPrice) {
      setWallet(wallet + sellPrice);
      setSellPrice(0);
    }
  };

  const fetchEthPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      setEthPrice(data?.ethereum?.usd || 0);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEthPrice();
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="container">
        <div className="card main">
          <div className="card-header">
            <h1>Crypto Stock Market POC</h1>
          </div>
          <div className="card-body">
            <h2>Wallet Balance: ${wallet}</h2>
            <p>Current Ethereum Price: ${ethPrice}</p>
            <div>
              <label>
                Buy Ethereum at:
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
                />
              </label>
              <button className="btn btn-primary" onClick={handleBuy}>
                Buy
              </button>
            </div>
            <br />
            <div>
              <label>
                Sell Ethereum at:
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(parseFloat(e.target.value))}
                  className=""
                />
              </label>
              <button className="btn btn-primary " onClick={handleSell}>
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stock;
