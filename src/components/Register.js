import { useState,useEffect } from "react"
import { registerUser } from "../services/authService"
import { Link,useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext';



function Register() {
    const { authData } = useAuth();
    const [name,setName]=useState("")
    const [lastname,setLastname]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [error,setError]=useState(null)
    const navigate=useNavigate()

    useEffect(() => {
        if (authData.token) {
            navigate("/");
        }
    }, [authData.token, navigate]);

    const handleRegister = async(e)=>{
        e.preventDefault()
        setError(null)

        const userData={name,lastname,username,password,email}
        try{
            const newUser=await registerUser(userData)
            console.log("Registration successul",newUser)
            navigate("/")

        }
        catch(error){
            setError("Registration failed pls try again")
        }
    }


  return (
    <div>
    <form onSubmit={handleRegister}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
        <Link to="/">Login</Link>
        </div>
  )
}

export default Register
