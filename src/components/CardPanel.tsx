  'use client'
  import Card from "./Card";
  import { useReducer } from "react";
  import Link from "next/link";

  type VenueData = {
    rating: number;
    isCompared: boolean;
  };

  type State = Map<string, VenueData>;

  type Action = 
    | { type: 'UPDATE_RATING'; venueName: string; newRating: number }
    | { type: 'REMOVE_VENUE'; venueName: string };

  const initialState: State = new Map([
    ['The Bloom Pavilion', { rating: 0, isCompared: true }],
    ['Spark Space', { rating: 0, isCompared: true }],
    ['The Grand Table', { rating: 0, isCompared: true }],
  ]);

  function ratingReducer(state: State, action: Action): State {
    const nextMap = new Map(state);
    const current = nextMap.get(action.venueName);
      switch (action.type) {
      case 'UPDATE_RATING':
        nextMap.set(action.venueName, { 
          rating: action.newRating, 
          isCompared: true 
        });
        return nextMap;
      case 'REMOVE_VENUE':
        if (current) {
          nextMap.set(action.venueName, { 
            ...current, 
            isCompared: false 
          });
        }
        return nextMap;
      default:
        return state;
    }
  }

  export default function CardPanel() {
    const [ratingMap, dispatch] = useReducer(ratingReducer, initialState);

    const handleRatingChange = (e:React.SyntheticEvent,name: string, val: number | null) => {
      e.preventDefault();  
      e.stopPropagation();
      const safeRating = val ?? 0;
      dispatch({ type: 'UPDATE_RATING', venueName: name, newRating: safeRating });
    };

    /**
       * Mock Data for Demonstation
       */
      const mockVenueRepo=[
          {vid:"001",name:"The Bloom Pavilion",image:"/img/bloom.jpg"},
          {vid:"002",name:"Spark Space",image:"/img/sparkspace.jpg"},
          {vid:"003",name:"The Grand Table",image:"/img/grandtable.jpg"},
      ]

    return (
      <div>
        <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
          { mockVenueRepo.map((venueItem)=>(
                  <Link href={`/venue/${venueItem.vid}`} key={venueItem.vid} className="w-1/5">
                  <Card 
                  venueName={venueItem.name} 
                  imgSrc={venueItem.image}
                  rating={ratingMap.get(venueItem.name)?.rating ?? 0}
                  onRatingChange={(e, newVal) => { handleRatingChange(e, venueItem.name, newVal); }} />
                  </Link> 
            ))}
        </div>

        <div className="font-bold text-lg m-3">
          Venue List with Ratings: {Array.from(ratingMap.values()).filter(v => v.isCompared).length}
        </div>

        <div className="text-md m-3">
          {Array.from(ratingMap)
            .filter(([_, data]) => data.isCompared) 
            .map(([venue, data]) => (
              <div 
                key={venue} 
                data-testid={venue} 
                onClick={() => dispatch({ type: 'REMOVE_VENUE', venueName: venue })}
              >
                {venue} : {data.rating}
              </div>
            ))}
        </div>
      </div>
    );
  }