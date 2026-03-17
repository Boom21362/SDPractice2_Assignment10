//import CardPanel from "@/components/CardPanel";
import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";

export default async function Venue(){

    const venues = await getVenues()
    return(
        <main className="">
            <h1 className="text-xl font-medium text-center p-5">Select Your Room</h1>
             <VenueCatalog venuesJson={venues}/>
        </main>


    );
}