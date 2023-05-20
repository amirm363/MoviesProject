import React from 'react'
import "./smallLoader.css"

interface LoaderProps {
    dimensions?: any;
}

export default function smallLoaderCmp({ dimensions }: LoaderProps) {
    return (
        <div className='LoaderContainer'>
            <svg className="loader-svg" viewBox="25 25 50 50" style={{ width: dimensions ? dimensions.width : "", height: dimensions ? dimensions.height : "" }}>
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}
