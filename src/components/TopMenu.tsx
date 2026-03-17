import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';


export default async function TopMenu(){

    const session = await getServerSession(authOptions)
    return(
        <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row-reverse items-center px-5 ">
            <Image src={'/img/logo.png'} className="h-[100%] m-[0px ] p-[0px] w-auto"
            alt = 'logo'
            width={0} height={0} sizes='100vh'/>
            <TopMenuItem title='Booking' pageref='/booking'/>
            <div className='flex items-center absolute top-0 left-5 h-full px-2 text-md font-bold'>
             {
                session? <Link href="/api/auth/signout">
                    <div className='text-cyan-600 ' >
                        Sign-Out of {session.user?.name}
                    </div>
                </Link>
                :
                <Link href="/api/auth/signin">
                    <div className='text-cyan-600 ' >
                        Sign-In
                    </div>
                </Link>
            }
             <Link href="/mybooking">
                    <div className='px-10 text-black'>
                        My Booking
                    </div>
                </Link>
            </div>
            
        </div>
    );
}