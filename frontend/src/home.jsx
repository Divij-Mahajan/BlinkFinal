import LoginPage from "./login";


import { useOkto } from "okto-sdk-react";
import  { useState } from 'react';
 
function Home() {
    
  const [userDetails, setUserDetails] = useState(null);
  const { getUserDetails, getPortfolio, createWallet, transferTokens, orderHistory } = useOkto();
 
  const [wallets, setWallets] = useState(null)
  const [portfolioData, setPortfolioData] = useState(null);
  const fetchWallets = async () => {
    try {
      const walletsData = await createWallet();
      console.log(walletsData)
      setWallets(walletsData);
      //setActiveSection('wallets');
    } catch (error) {
      console.log(`Failed to fetch wallets: ${error.message}`);
    }
  };
  const fetchPortfolio = async () => {
    try {
      const portfolio = await getPortfolio();
      setPortfolioData(portfolio);
    } catch (error) {
      console.log(`Failed to fetch portfolio: ${error.message}`);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      setUserDetails(details);
    } catch (error) {
        console.log(`Failed to fetch user details: ${error.message}`);
    }
  };
 
 
  return (
    <div >
        <LoginPage/>
        <h1>Home Page</h1>
        <button onClick={fetchUserDetails}>View User Details</button>
        {userDetails && (
          <div>
            <h2>User Details:</h2>
            <pre>{JSON.stringify(userDetails, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchWallets}>View Wallets</button>
        {userDetails && (
          <div>
            <h2>User Wallets:</h2>
            <pre>{JSON.stringify(wallets, null, 2)}</pre>
          </div>
        )}
        <button onClick={fetchPortfolio}>View Portfolio</button>
        {portfolioData && (
          <div>
            <h2>Portfolio:</h2>
            <pre>{JSON.stringify(portfolioData, null, 2)}</pre>
          </div>
        )}
    </div>
  );
}
export default Home;