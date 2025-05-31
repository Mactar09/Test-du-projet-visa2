import { useState } from 'react'
import { useRouter } from 'next/router'
import { sql } from '@vercel/postgres'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      // Vérification dans Vercel Postgres
      const result = await sql`
        SELECT * FROM users 
        WHERE email = ${email} AND password = ${password}
      `
      
      if (result.rows.length > 0) {
        // Stockage de la session
        document.cookie = `user=${result.rows[0].id}; path=/`
        router.push('/dashboard')
      } else {
        alert('Email ou mot de passe incorrect')
      }
    } catch (error) {
      alert('Erreur: ' + error.message)
    }
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Connexion</h1>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
          required
        />
        
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
          required
        />
        
        <button type="submit" style={{
          padding: '12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Se connecter
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Pas de compte? <a href="/signup" style={{ color: '#0070f3' }}>Inscrivez-vous</a>
      </p>
    </div>
  )
}
