import Image from "next/image";
import { notFound } from "next/navigation";
import getVenue from "@/libs/getVenue";

interface Props {
  params: Promise<{ vid: string }>;
}


export default async function VenueDetailPage({ params }: Props ) {
    
    const venueItem = await getVenue((await params).vid)

    /*const mockVenueRepo = new Map();
    mockVenueRepo.set("001", { name: "The Bloom Pavilion", image: "/img/bloom.jpg" });
    mockVenueRepo.set("002", { name: "Spark Space", image: "/img/sparkspace.jpg" });
    mockVenueRepo.set("003", { name: "The Grand Table", image: "/img/grandtable.jpg" });*/

    if (!venueItem) {
        notFound();
    }

    return (
        <main className="text-center p-5">
            <div className="text-3xl font-bold">{venueItem.data.name}</div>
            <div className="flex flex-row my-5">
                <Image 
                    src={venueItem.data.picture}
                    alt={venueItem.data.name}   
                    width={400} 
                    height={300}
                    className="rounded-lg w-[30%]"
                />
                <div className="text-md mx-5 text-left"> 
                    <div className="text-md  mx-5">Name: {venueItem.data.name} </div>
                    <div className="text-md  mx-5">Address: {venueItem.data.address} </div>
                    <div className="text-md  mx-5">District: {venueItem.data.district} </div>
                    <div className="text-md  mx-5">Postal Code: {venueItem.data.postalcode} </div>
                    <div className="text-md  mx-5">Tel: {venueItem.data.tel} </div>
                    <div className="text-md  mx-5">Daily Rate: {venueItem.data.dailyrate} </div>
                </div>
            </div>
        </main> 
    );
}

/*export async function generateStaticParams() {
    return [{ vid: '001' }, { vid: '002' }, { vid: '003' }];
}*/