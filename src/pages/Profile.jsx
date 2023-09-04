import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FcHome } from 'react-icons/fc';
import { Link } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate()
  const auth = getAuth()
  const [changeDetail, setChangeDetail] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev, 
      [e.target.id]: e.target.value,
    }))
  }

  const onLogout = () => {
    auth.signOut()
    navigate('/sign-in')
  }

  const { name, email } = formData

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      }
      const docRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(docRef, {
        name: name,
      })
      toast.success('Profile updated!')

    } catch (error) {
      toast.error('Could not update profile details.')
    }
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col flex-wrap">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] flex justify-center flex-wrap">
          <form className="w-full mt-6 px-3">
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                Do you want to change you name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prev) => !prev);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 mr-1 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-200 hover:shadow-lg active:bg-blue-800'>
            <Link to="/create-listing" className='flex justify-center items-center' >
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />
              Sell or Rent Your Home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile