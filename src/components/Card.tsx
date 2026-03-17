    //import styles from './card.module.css'
    import Image from 'next/image'
    import InteractiveCard from './InteractiveCard';
    import { Rating,Typography } from '@mui/material';

    export default function Card({venueName,imgSrc,rating,onRatingChange}:{venueName:string,imgSrc:string,rating?:number,onRatingChange?: (e: React.SyntheticEvent, newValue: number | null) => void}){
        
        return(
            <InteractiveCard contentName={venueName}>
            <div className="relative w-[280px] h-[320px] verflow-hidden flex flex-col">
                <div className="relative w-full h-1/2">
                    <Image src= {imgSrc} 
                        alt='Product Picture'
                        fill={true}
                        objectFit= 'cover'  
                    />
                </div >
                <div 
                className="h-[20%]  p-[10px] text-[20px] flex items-center font-bold text-[#FF7F50]">
                    {venueName}
                </div>
                {
                    onRatingChange? <div onClick={(e)=>e.stopPropagation()}>
                    <Typography component="legend" className='h-[20%]  p-[10px] text-[10px] flex items-center'>Rating</Typography>
                    <Rating className='p-[10px]'
                    id={`${venueName} Rating`}
                    name={`${venueName} Rating`}
                    data-testid={`${venueName} Rating`}
                    value={rating}
                    onChange={(event, newValue) => {onRatingChange(event,newValue);}}/>
                </div>: ''
                }
            </div>
        </InteractiveCard>
        );
    }