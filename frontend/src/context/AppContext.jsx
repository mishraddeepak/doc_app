import React, { createContext, useState } from 'react'
import {doctors} from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";
  




export const AppContext = createContext()
export default function AppContextProvider(props) {

const currencySymbol = '$' 
const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log("backendUrl is.....",backendUrl)
const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
const [userID,setUserID] = useState(localStorage.getItem('userID')?localStorage.getItem('userID'):'')
const [allData, setAllData] = useState([]);


const getAllAppointments = async () => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/admin/all-appointments`
    );
    console.log("data is", data);
    if (data.success) {
      const allAppointments = data.userdata.flatMap((user) => user.appointments);
      setAllData(allAppointments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


const value = {
    doctors,
    currencySymbol,
    token,setToken,
    backendUrl,
    userID,setUserID,
    allData,getAllAppointments
}
  return (
   <AppContext.Provider value = {value}>
    {props.children}
   </AppContext.Provider>
   
  )
}


