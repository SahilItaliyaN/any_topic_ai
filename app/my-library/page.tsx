import BookmarkedCompanions from '@/components/BookmarkedCompanions'
import React from 'react'

const MyLibrary = () => {

  return (
    <main>
      <section className='flex justify-between gap-4 max-sm:flex-col'>
        <h1>My BookMark Companion</h1>
      </section>
      <section>
        <BookmarkedCompanions />
      </section>
    </main>
  )
}

export default MyLibrary