    import Link from "next/link";

    export default function TopMenuItem ({title,pageref}:{title:string,pageref:string}){
        return(
             <Link
        href={pageref}
        className="inline-flex flex-col items-center justify-center 
                 h-full min-w-[120px]
                 hover:bg-[#DDDDDD] transition-all duration-200"
        role="link"
        >
            <span className="text-l font-extrabold text-[#000000] leading-none1">
        {title}
      </span>
    </Link>
    
        );
    }