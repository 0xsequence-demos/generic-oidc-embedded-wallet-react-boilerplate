import { useEffect, useState } from 'react'
import { sequenceWaas } from "./SequenceEmbeddedWallet";
import './App.css'

function App() {
  const [walletAddress, setWalletAddress] = useState<any>(null)
  const [jwtToken, setJwtToken] = useState('')

  const handleJwtLogin = async () => {
    try {
      const res = await sequenceWaas.signIn(
        {
          idToken: jwtToken,
        },
        'Generic OIDC Embedded Wallet React Boilerplate'
      );

      setWalletAddress(res.wallet);
    } catch (error) {
      console.error(error);
    }
  }

  const signOut = async () => {
    try {
      const sessions = await sequenceWaas.listSessions()

      for(let i = 0; i < sessions.length; i++){
        await sequenceWaas.dropSession({ sessionId: sessions[i].id })
      }
      setWalletAddress(null)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    
  }, [walletAddress])

  return (
    <>
    <h1 className='title'>Embedded Wallet OIDC Auth</h1>
    <div style={{position: 'fixed', top:'60px', right: '60px'}}>
    {walletAddress&&<p style={{cursor: 'pointer'}} onClick={() =>signOut()}>sign out</p>}
    </div>
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
        margin: 'auto',
        gap: '1rem'
    }}>
      {!walletAddress && (
        <>
          <textarea
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
            placeholder="Enter your JWT token here"
            style={{
              width: '400px',
              height: '100px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button onClick={handleJwtLogin}>Sign In with JWT</button>
        </>
      )}
      <p>{walletAddress}</p>
    </div>
    </>
  )
}

export default App
