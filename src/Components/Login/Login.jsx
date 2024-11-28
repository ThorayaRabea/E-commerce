import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../context/UserContext'


export default function Login() {
 let {userMail,userpassword,setUserLogin}=useContext(UserContext)
 let [ApiError,setApiError]= useState('')
 
 
 /////////////////////////////////////Validation ////////////////////////////////////
let myValidation=Yup.object().shape({
  email:Yup.string().email('invalid mail').required('mail is requied '),
  password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,'invalid password ').required('password is requied')
})

//////////////////////////HandleRegister///////////////////////////

 let navigate=useNavigate()
//  async function handleLogin(values){
//      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then( (res)=>{
//       if(res.data.message=="success"){
//         localStorage.setItem("UserToken",res.data.token)
//         navigate('/')
//       }

//     }).catch( (res)=>{
//       setApiError(res.response.data.message)
//     })
     
// }

function handleLogin(values){

 if(values.email==userMail&&values.password==userpassword){
  setUserLogin(localStorage.getItem("UserToken"))
  navigate('/')
 }else{
  setApiError('invalid Email or password')
 }
  
      
}


/////////////////////////  Formik  //////////////////////////////////////////////
  let formik=useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:myValidation,
    onSubmit:handleLogin,
  })


/////////////////////////////Check Error//////////////////
let Error=()=>{
 let IsError=formik.errors.email||formik.errors.password||!formik.values.email||!formik.values.password
 return IsError
} 
/////////// Green Button///////
let GreenButton=()=>{
  return <button type="submit" className="text-white bg-green-600 border border-gray-300 font-thin rounded-lg text-lg px-5 py-2.5 mb-2 block ms-auto" >Login now</button>
}

/////////Disabled Button//////////////
let DisabledButton=()=>{
    return <button type="submit" className="text-gray-900 bg-white border border-gray-300  font-thin rounded-lg text-lg px-5 py-2.5 mb-2 block ms-auto" disabled>Login now</button>
}



  return (
    <>
    {ApiError?<div className='w-1/2 m-auto text-center text-red-700 bg-slate-300 p-3 rounded'>{ApiError}</div>:null}
    <div className='container'>
      <h2 className='text-3xl font-semibold mb-6'>login now</h2>
      <form className="max-w-full mx-auto" onSubmit={formik.handleSubmit}>

      
      <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-lg font-normal text-gray-900 ">Email :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"  />

          {formik.errors.email &&formik.touched.email?
            <div className="flex items-center p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-1" role="alert">
            <span className="sr-only">Info</span>
            <div>
              {formik.errors.email}
            </div>
          </div>:null
            }


      </div>
      <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-lg font-normal text-gray-900 ">password :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id="password" name='password' className="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"  />

          {formik.errors.password &&formik.touched.password?
            <div className="flex items-center p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-1" role="alert">
            <span className="sr-only">Info</span>
            <div>
              {formik.errors.password}
            </div>
          </div>:null
            }


      </div>
    

  {/* {(formik.errors.email&&formik.touched.email)||(formik.errors.password&&formik.touched.password)||!formik.values.email||!formik.values.password?<button type="submit" className="text-gray-900 bg-white border border-gray-300    font-thin rounded-lg text-lg px-5 py-2.5 mb-2 block ms-auto" disabled>Login now</button>: <button type="submit" className="text-white bg-green-600 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 block ms-auto" >Login now</button>
  } */}

  {Error()?DisabledButton(): GreenButton()}
  


    </form>
  </div>


    </>
  )
}
