"use client"
import { TextField } from '@mui/material';
import { MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from 'react';
import {Dayjs} from 'dayjs';

export default function DateReserve({onDateChange}:{onDateChange:Function}){

    const [bookDate,setBookDate]= useState<Dayjs|null>(null);
    
    
    return(
      <div className="flex flex-col justify-center text-lg font-bold ">
       
       
         <div className='gap-4 flex flex-col'> Event Date
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className="bg-white rounded-md" value={bookDate}
            onChange={(value)=>{setBookDate(value); onDateChange(value)} }/>
        </LocalizationProvider>
        </div>
      </div>  
    );
}