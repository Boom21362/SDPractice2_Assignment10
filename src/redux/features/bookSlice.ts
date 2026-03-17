import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems:[]}

export const bookSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const overlapIndex = state.bookItems.findIndex(
        (item) => item.venue === action.payload.venue && 
                  item.bookDate === action.payload.bookDate
    );

    if (overlapIndex !== -1) {
        state.bookItems[overlapIndex] = action.payload;
    } else 
        state.bookItems.push(action.payload);
    },

    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookItems = state.bookItems.filter(
        (obj) =>
          !(
            obj.nameLastname === action.payload.nameLastname &&
            obj.tel === action.payload.tel &&
            obj.venue === action.payload.venue &&
            obj.bookDate === action.payload.bookDate
          )
      );
    },
  },
});

export const {addBooking,removeBooking} = bookSlice.actions
export default bookSlice.reducer