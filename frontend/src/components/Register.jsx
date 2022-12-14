import * as React from 'react'
import './Register.css'

export default function Register (props) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [avatar, setAvatar] = React.useState(null)
  const [errors, setErrors] = React.useState([])
  const [formInputs, setFormInputs] = React.useState({})
  // errors: ['password: password too weak']
  const [registered, setRegistered] = React.useState(false)

  const submit = async (e) => {
    e.preventDefault()
    console.log('submit', {name, email, password, avatar})
    const formData = new FormData()
    formData.append("name", name)
    formData.append("password", password)
    formData.append("email", email)
    formData.append("avatar", avatar)
    const response = await fetch('http://localhost:3001/user/upload', {
      method: 'POST',
      body: formData
    })

    // response: {status: 400, body: ? }

    if(response.status === 200) {
      setRegistered(true)
    }
    else if(response.status === 400) {
      const result = await response.json()
      // result = [{password:'password too weak'}]
      const errors = []
      for(const row of result.message) {
        // {password:'password too weak'}
        for(const key in row) {
          // key: password
          errors.push(row[key])
        }
      }
      setErrors(errors)
    }
    else {
      setErrors(['Etwas ist schief gelaufen'])
    }
  }

  // function changeInput(key, value){
  //   console.log(key, value)
  //   setFormInputs((prev) => { 
  //     return {...prev, [key]: value}
  //   })

  // }


  if(registered) {
    return (
      <h1>Wilkommen</h1>
    )
  }
  
  
  return (
    <form className='Register' onSubmit={submit}>
      <h3>Registrieren</h3>
      <input type='text' placeholder='Name...' value={formInputs.name} onChange={(e) => setName(e.target.value)}/>
      <input type='email' placeholder='email...' value={formInputs.email} onChange={e => setEmail(e.target.value)}/>
      <input type='password' placeholder='Password...' value={formInputs.password} onChange={e => setPassword(e.target.value)}/>
      <input type="file" onChange={e => setAvatar(e.target.files[0])}  />
      <button type='submit'>Absenden</button>
      {errors.map(error => (
        <div key={error} className='error'>{error}</div>
      ))}

      <label className='login-switch' onClick={props.onLoginSwitch}>Ich habe bereits einen Account</label>
    </form>
  )
}