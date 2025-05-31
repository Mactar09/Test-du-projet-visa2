import { useState } from 'react'
import { useRouter } from 'next/router'
import { sql } from '@vercel/postgres'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      // Insertion dans Vercel Postgres
      await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${password})
      `
      alert('Inscription réussie!')
      router.push('/login')
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
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Inscription</h1>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
          required
        />
        
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
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          S'inscrire
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Déjà un compte? <a href="/login" style={{ color: '#0070f3' }}>Connectez-vous</a>
      </p>
    </div>
  )
}
