import Link from "next/link";
import Card from "./Card";

  export interface VenueItem {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    picture: string;
    dailyrate: number;
    __v: number;
    id: string;
  }

  export interface VenueJson {
    success: boolean;
    count: number;
    pagination: Record<string, unknown>;
    data: VenueItem[];
  }

interface VenueCatalogProps {
  venuesJson: Promise<VenueJson>;
}

export default async function VenueCatalog({ venuesJson }: VenueCatalogProps) {

  const venuesResolved = await venuesJson;

  if (!venuesResolved || !venuesResolved.data) {
    return (
      <div className="text-center p-10">
        <p className="text-red-500">No venues data found.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "space-around",
      }}
    >
      {venuesResolved.data.map((item: VenueItem) => (
        <Link 
          href={`/venue/${item.id}`} 
          key={item.id} 
          className="w-1/5"
        >
          <Card 
            venueName={item.name} 
            imgSrc={item.picture} 
          />
        </Link>
      ))}
    </div>
  );
}