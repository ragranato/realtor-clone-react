import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from 'swiper'
import "swiper/css/bundle";
import { useParams } from 'react-router';
import { db } from '../firebase';
import { doc, getDoc } from '@firebase/firestore';
import Spinner from '../components/Spinner';
import {FaShare} from 'react-icons/fa'

function Listing() {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)
    SwiperCore.use([Autoplay, Navigation, Pagination])

    useEffect(()=>{
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)                
            }
        }
        fetchListing()
        
    }, [params.listingId])
    if(loading){
        return <Spinner />  
    }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={EffectFade}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[10%] right-[3%] z-10 bg-white cursor-pointer rounded-full border-2 border-gray-400 w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true)
          setTimeout(()=>{
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && <p className='fixed top-[6%] right-[3%] p-1 bg-white text-slate-500 rounded-md z-10 font-semibold border-2 border-gray-400'>Link Copied!</p>}
    </main>
  );
}

export default Listing

