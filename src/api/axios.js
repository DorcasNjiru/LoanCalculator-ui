

import React from "react";

import axios from "axios";


const ApI_Endpoint = "https://localhost:44399/api/"




axios.create({
    baseURL: ApI_Endpoint
    
})




/**Axios Intercept request */

axios.interceptors.request.use((req)=>{

    
    if(!req.url.includes("/SignIn"))
    {
      var user = JSON.parse(localStorage.getItem("User"))
      var token  = user.token;

      req.headers.Authorization= `Bearer ${token}`
    }
    req.headers["Content-Type"] = "application/json"


    return req

},(errr)=>{
    return Promise.reject();
})


axios.interceptors.response.use((res)=>{


    if(res.config.url.includes('/SignIn'))
    {
        if(res.status === 200)
        {

            console.log(res.data)

            delete res.data.user.password

            localStorage.setItem("User",JSON.stringify(res.data))
        }
    }
    
    return res

},(err)=>{

    console.log("rEQUEST Rejected", err)
    return Promise.reject(err)
})

export const fetch =(url= "", data = {}) =>
{
   return axios.get(`${ApI_Endpoint}${url}`);
        //  .then(resolve=>{
        //     return resolve
        //  }, reject=>{
            
        //     console.log("rEQUEST Rejected", reject)
        //  })

}

export const post = async (url= "", data = {}) =>
{
  return await axios.post(`${ApI_Endpoint}${url}`, data)
        //  .then(resolve=>{
        //     return resolve
        //  }, reject=>{
            
        //     return Promise.reject(reject)
        //  })

}











