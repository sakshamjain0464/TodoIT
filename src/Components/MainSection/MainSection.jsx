import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainSection() {
  return (
    <section className='h-[85vh] w-full flex items-center justify-center'>
        <Outlet />
    </section>
  )
}
