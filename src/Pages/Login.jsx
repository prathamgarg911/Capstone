import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import tiet from "../images/tiet.png"

const Login = () => {
  const navigate = useNavigate()
    const [username , setUsername]= useState("")
    const [password , setpassword]= useState("")
    const loginValues =[
      {  email:"student@thapar.edu",
        password:"12345"},
      {  email:"admin@thapar.edu",
        password:"12345"}
      ]
    const login =(e)=>{
      console.log(username)
       if(password==loginValues[0].password){
        if(username==loginValues[1].email){
          localStorage.setItem("role","admin")
          console.log("hi")
          navigate("../level1")
        }
        else if(username==loginValues[0].email){
          localStorage.setItem("role","student")
          navigate("../level1")
        }
        else{
          alert("INAVLID CREDENTIALS")
         }
      
       }
       else{
        alert("INAVLID CREDENTIALS")
       }
    }

  return (
    <div className='flex flex-col items-center h-screen  justify-center'>
        <div className="background"></div>
        <form onSubmit={(e)=>login(e)} class="bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4">
          {/* <div className='mb-2 bg-[#640000] text-white px-4 py-1  font-mono rounded font-semibold'> Nava Nalanda Central Libray </div> */}
          <img src={tiet} className='h-20 w-20 items-center align-middle justify-center ml-auto mr-auto mb-4' alt="" />
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input value={username} onChange={(e)=>setUsername(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input value={password} onChange={(e)=>setpassword(e.target.value)} class="shadow appearance-none border   rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
      {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-[#640000] w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  type="submit">
        Sign In
      </button>
      {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a> */}
    </div>
  </form>
    </div>
  )
}

export default Login