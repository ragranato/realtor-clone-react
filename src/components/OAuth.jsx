import { GoogleAuthProvider, getAuth, signInWithPhoneNumber, signInWithPopup } from '@firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from '@firebase/firestore'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { useNavigate } from 'react-router'

function OAuth() {
  const navigate = useNavigate()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      //check for user 

      const docRef = doc(db, 'users', user.uid)

      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')

    } catch (error) {
      toast.error('Could not authorize with Google.')
    }
  }
  return (
    <button type='button' onClick={onGoogleClick} className='flex w-full justify-center items-center bg-red-700 text-white px-7 py-3 uppercase font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded'><FcGoogle className='text-2xl bg-white rounded-full mr-2' />Continue with Google</button>
  )
}

export default OAuth