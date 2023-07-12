import React from 'react'
import { Spinner } from 'react-bootstrap'
export default function NotFound() {
  return (
    <div className='text-center'>
      <h4 className='my-3'>مخاطب یافت نشد</h4>
      <img src='/images/no-found.gif' className='w-25'/>
    </div>
  )
}

