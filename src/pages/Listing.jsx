import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from 'swiper'
import "swiper/css/bundle";
import { useParams } from 'react-router';
import { db } from '../firebase';
import { doc, getDoc } from '@firebase/firestore';
import Spinner from '../components/Spinner';
import { FaShare, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import {MdLocationPin} from 'react-icons/md'
import { list } from 'firebase/storage';

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
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[6%] right-[3%] p-1 bg-white text-slate-500 rounded-md z-10 font-semibold border-2 border-gray-400">
          Link Copied!
        </p>
      )}
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg  shadow-lg bg-white lg:space-x-5">
        <div className=" w-full h-[200px] lg:h-[400px] overflow-visible">
          <p className="text-2xl text-blue-900 font-bold mb-3">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " /month"}
          </p>
          <div className="font-semibold flex items-center mt-6 mb-3">
            <MdLocationPin className="text-green-700 mr-1" />
            {listing.address}
          </div>
          <div className="flex space-x-1 mt-6">
            <p className="bg-red-800 p-1 text-white font-semibold rounded-md w-[50%] text-center shadow-md max-w-[200px]">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </p>
            {listing.offer && (
              <p className="bg-green-900 p-1 text-white font-semibold rounded-md w-[50%] text-center shadow-md max-w-[200px]">
                {`$${listing.regularPrice - listing.discountedPrice} Discount`}
              </p>
            )}
          </div>
          <p className="mt-6">
            <span className="font-semibold">Description: </span>
            {listing.description}
          </p>
          <div className="flex w-full justify-start space-x-5 mt-6">
            {listing.bedrooms > 1 ? (
              <p className="flex items-center text-sm whitespace-nowrap">
                <FaBed className="mr-1" />
                {`${listing.bedrooms} Bedrooms`}
              </p>
            ) : (
              <p className="flex items-center text-sm whitespace-nowrap">
                <FaBed className="mr-1" />
                {`${listing.bedrooms} Bedroom`}
              </p>
            )}
            {listing.bathrooms > 1 ? (
              <p className="flex items-center text-sm whitespace-nowrap">
                <FaBath className="mr-1" />
                {`${listing.bathrooms} Bathrooms`}
              </p>
            ) : (
              <p className="flex items-center text-sm whitespace-nowrap">
                <FaBath className="mr-1" />
                {`${listing.bathrooms} Bathroom`}
              </p>
            )}
            {listing.parking && (
              <p className="flex items-center text-sm whitespace-nowrap">
                <FaParking className="mr-1" />
                {"Parking Spot"}
              </p>
            )}
            {listing.furnished && (
              <p className="flex items-center text-sm whitespace-nowrap">
                <FaChair className="mr-1" />
                {"Furnished"}
              </p>
            )}
          </div>
          <button className="mt-6 w-full p-2 bg-blue-700 text-white font-semibold text-lg uppercase rounded-md">
            {listing.type === "rent" ? "Contact Landlord" : "Contact Seller"}
          </button>
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}

export default Listing

