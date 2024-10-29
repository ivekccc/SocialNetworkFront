const API_URL = 'http://localhost:8080';

export const loginUser = async (username,password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const token = await response.text();
    return token;
};

export const registerUser= async(userData)=>{
    const response=await fetch(`${API_URL}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    })
    if(!response.ok){
        throw new Error("Registration failed")
    }
    const data=await response.json()
    return data
}