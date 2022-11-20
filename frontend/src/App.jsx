import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import * as React from 'react'
import UserDetails from './components/UserDetails'

// const initialToken = localStorage.getItem('login-token')

function App() {
  const [mode, setMode] = React.useState('login')
  // const [token, setToken] = React.useState(initialToken)
  const [token, setToken] = React.useState("")

  const [user, setUser] = React.useState(false)
  const [loading, setLoading]  = React.useState(false)

  React.useEffect(() => {
    fetch('http://localhost:3001/user',{
      credentials: 'include'
    }).then( async (response) => {
      if(response.status === 200) {
          const user = await response.json()
          setUser(true)
        }
        setLoading(false)
    })
  }, [])



  // if(token) return (
  //   <div className='App'>
  //     <UserDetails token={token} setToken={setToken}/>
  //   </div>
  // )

  if(loading) return (
    <div>loading</div>
  )

  

  if(user) return (
    <div className='App'>
      <UserDetails token={user} setToken={setUser}/>
    </div>
  )

  return (
    <div className='App'>
      {mode === 'login' && <Login onRegisterSwitch={() => setMode('register')} setToken={setUser}/>}
      {mode === 'register' && <Register onLoginSwitch={() => setMode('login')}/>}
    </div>
  )
}

export default App
