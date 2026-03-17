'use client'
import DateReserve from '@/components/DateReserve'
import dayjs,{ Dayjs } from 'dayjs';
import {Select,MenuItem,TextField} from '@mui/material';
import { useState } from 'react';
import { addBooking } from '@/redux/features/bookSlice';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';

export default  function Booking(){

     const dispatch = useDispatch<AppDispatch>()

     const makeBooking = ()=>{
        if(name && venue && bookDate && tel){
            const item:BookingItem = {
                nameLastname: name,
                tel : tel,
                bookDate : dayjs(bookDate).format("YYYY/MM/DD"),
                venue :  venue
            }
            dispatch(addBooking(item))
            alert("Reservation added to booking list!")
        }
    }
    
    const [venue,setVenue] = useState("");
    const [bookDate,setBookDate]= useState<Dayjs|null>(null);
    const [name, setNameLastname] = useState<string>('');
    const [tel, setTel] = useState<string>('');

    return(
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
  
  <main className="flex flex-col items-center bg-slate-200 rounded-xl shadow-xl w-full max-w-md px-10 py-12">
    
    <h1 className="text-3xl font-bold mb-8 text-neutral-800">Venue Booking</h1>
    
    <div className="w-full space-y-6 flex flex-col">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Information</h2>
        
        <TextField 
          fullWidth
          label="Name-Lastname" 
          variant="standard" 
          onChange={(e) => setNameLastname(e.target.value)} 
        />
        
        <TextField 
          fullWidth
          label="Contact-Number" 
          variant="standard" 
          onChange={(e) => setTel(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="venue" className="font-semibold text-lg">Room</label>
        <Select 
          variant="standard" 
          id="venue" 
          className="w-full"
          value={venue} 
          onChange={(e) => setVenue(e.target.value)}
        >
          <MenuItem value="" disabled>Select a room:</MenuItem>
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
      </div>

      <div className="pt-2">
        <DateReserve onDateChange={(value: Dayjs) => setBookDate(value)} />
      </div>
    </div>

    <button 
      onClick={makeBooking}
      className="mt-10 w-full rounded-md bg-neutral-800 py-4 text-xl font-bold text-white shadow-md transition-all duration-300 hover:bg-neutral-700 hover:scale-[1.02] active:scale-[0.98]"
    >
      Book Venue
    </button>

  </main>
</div>
    );
}