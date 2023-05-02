import React from 'react'
import "./smallLoader.css"
export default function smallLoaderCmp() {
    return (
        <div className='LoaderContainer'>
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}
