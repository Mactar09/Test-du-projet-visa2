export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f0f8ff'
    }}>
      <h1>WavePay Africa</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <a href="/signup" style={{
          padding: '12px 24px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px'
        }}>Inscription</a>
        
        <a href="/login" style={{
          padding: '12px 24px',
          backgroundColor: '#4CAF50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px'
        }}>Connexion</a>
      </div>
    </div>
  )
}
