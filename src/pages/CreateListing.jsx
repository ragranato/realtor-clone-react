import React from 'react'

function CreateListing() {
    const onChange = () => {

    }
  return (
    <main className='max-w-md px-2 mx-auto '>
        <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
        <form >
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className=''>
                <button type='button' id='type' value='sale' onClick={onChange} className=''>
                    Sell
                </button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing