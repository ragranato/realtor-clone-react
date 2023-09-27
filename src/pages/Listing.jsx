import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useParams } from 'react-router';
import { db } from '../firebase';
import { doc, getDoc } from '@firebase/firestore';
import Spinner from '../components/Spinner';

function Listing() {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)

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
    <div>{listing.name}</div>
  )
}

export default Listing