'use client'
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { removeBooking } from "@/redux/features/bookSlice"

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>();
    
    const bookItems = useAppSelector((state) => {return state.bookSlice.bookItems});

    const hasBookings = bookItems && bookItems.length > 0;

    return (
        <div className="flex flex-col items-center w-full py-5">
            {hasBookings ? (
                bookItems.map((item) =>     (
                    <div 
                        className="bg-slate-100 border border-slate-300 rounded-lg px-6 py-4 mx-5 my-2 w-full max-w-xl shadow-sm flex justify-between items-center" 
                        key={`${item.nameLastname}-${item.bookDate}`}
                    >
                        <div className="flex flex-col space-y-1">
                            <div className="font-bold text-slate-800 text-lg">{item.nameLastname}</div>
                            <div className="text-sm text-slate-600"><b>Tel:</b> {item.tel}</div>
                            <div className="text-sm text-slate-600"><b>Venue:</b> {item.venue}</div>
                            <div className="text-sm text-slate-600"><b>Date:</b> {item.bookDate}</div>
                        </div>

                        <button 
                            className="rounded-md bg-red-500 hover:bg-red-700 px-4 py-2 text-white font-medium transition-all duration-200" 
                            onClick={() => dispatch(removeBooking(item))}
                        >
                            Remove
                        </button>
                    </div>               
                ))
            ) : (
                <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-inner">
                    <p className="text-xl font-bold text-red-600">No Venue Bookings</p>
                    <p className="text-slate-500">Your reservation list is currently empty.</p>
                </div>
            )}
        </div>
    )
}