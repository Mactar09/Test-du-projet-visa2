import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { sql } from '@vercel/postgres'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      // Récupération de l'ID depuis les cookies
      const userId = document.cookie.split('; ')
        .find(row => row.startsWith('user='))
        ?.split('=')[1]
      
      if (!userId) {
        router.push('/login')
        return
      }

      try {
        const result = await sql`
          SELECT * FROM users WHERE id = ${userId}
        `
        setUser(result.rows[0])
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    }
    
    fetchUser()
  }, [])

  if (!user) return <div>Chargement...</div>

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1>Bienvenue, {user.name}!</h1>
      <p style={{ margin: '20px 0' }}>
        Vous êtes connecté avec l'email: {user.email}
      </p>
      
      <button 
        onClick={() => {
          document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          router.push('/login')
        }}
        style={{
          padding: '12px 24px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Déconnexion
      </button>
    </div>
  )
}
