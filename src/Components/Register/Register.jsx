import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../context/UserContext'




export default function Register() {

 let [ApiError,setApiError]= useState('')

 let {UserLogin,setUserLogin,userMail,setuserMail,userpassword,setuserpassword}=useContext(UserContext)

 /////////////////////////////////////Validation ////////////////////////////////////
let myValidation=Yup.object().shape({
  name:Yup.string().min(3,'min char is 3 ').max(10,'max char is 10').required('name is requried'),
  email:Yup.string().email('invalid mail').required('mail is requied '),
  phone:Yup.string().matches(/^01[1250][0-9]{8}$/,'invalid number').required('number is requied'),
  password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,'invalid password ').required('password is requied'),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'invalid repassword').required('repassword is requied')
  
})

//////////////////////////HandleRegister///////////////////////////
 let navigate=useNavigate()
 async function handleRegister(values){
     await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then( (res)=>{
      console.log(res)
      
      if(res.data.message=="success"){
        localStorage.setItem("UserToken",res.data.token)
        /////////////////////////NEW///////
        setuserMail(values.email)
        setuserpassword(values.password)
        ////////////////////////
        navigate('/login')
      }

    }).catch( (res)=>{
      // console.log('sorry')
      // console.log(res)
      setApiError(res.response.data.message)
    })
     
}

////////////////////  Formik  ///////////////////////////////////////////////////
  let formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''  
    },
    validationSchema:myValidation,
    onSubmit:handleRegister,
  })

/////////////////////////////Check Error//////////////////
let Error=()=>{
  let IsError=formik.errors.email||formik.errors.password||!formik.values.email||!formik.values.password||formik.errors.name||formik.errors.rePassword||formik.errors.phone||!formik.values.name||!formik.values.rePassword||!formik.values.phone
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
        {/* Alert Message */}
    {ApiError?<div className='w-1/2 m-auto text-center text-red-700 bg-slate-300 p-3 rounded'>{ApiError}</div>:null}

      {/* Input Form */}
    <div className='container'>
      <h2 className='text-3xl font-semibold mb-6'>Register Now</h2>
      <form className="max-w-full mx-auto" onSubmit={formik.handleSubmit}>

      <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-lg font-normal text-gray-900 ">Name :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id="name" name='name' className="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"  />


            {formik.errors.name &&formik.touched.name?
            <div className="flex items-center p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-1" role="alert">
            <span className="sr-only">Info</span>
            <div>
              {formik.errors.name}
            </div>
          </div>:null
            }

      </div>
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
    
      <div className="mb-4">
          <label htmlFor="rePassword" className="block mb-2 text-lg font-normal text-gray-900 ">rePassword :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id="rePassword" name='rePassword' className="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"  />

          {formik.errors.rePassword &&formik.touched.rePassword?
            <div className="flex items-center p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-1" role="alert">
            <span className="sr-only">Info</span>
            <div>
              {formik.errors.rePassword}
            </div>
          </div>:null
            }


      </div>

      <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-lg font-normal text-gray-900 ">Phone :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"  />

          {formik.errors.phone &&formik.touched.phone?
            <div className="flex items-center p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-1" role="alert">
            <span className="sr-only">Info</span>
            <div>
              {formik.errors.phone}
            </div>
          </div>:null
            }


      </div>

      {Error()?DisabledButton(): GreenButton()}


      </form>
    </div>


    </>
  )
}
