import React from 'react'

const ErrorStyle = (props) => {
  return (
    <div className='text-red-600 font-mono'>
        {props.children}
    </div>
  )
}

export default ErrorStyle