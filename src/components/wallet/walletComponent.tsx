import { useConnectionContext } from "~/contexts/connection";

export default function WalletComponent() {
    const context = useConnectionContext();
    if (context.type === "disconnected") {
      return <button onClick={context.connect}>Connect</button>;
    }
  
    if (context.type === "connected") {
      return (
        <>
          <h3 className="text-white">Balance: {context.wallet.balance}</h3>
          <ul>
            {context.wallet.accounts.map((y) => (
              <li className="text-white" key={y}>{y}</li>
            ))}
          </ul>
        </>
      );
    }
  
    return null;
  }
  