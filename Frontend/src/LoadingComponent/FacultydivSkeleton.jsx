import React from 'react'

function FacultydivSkeleton() {
    return (
        <div className="bg-white space-y-3 p-4 rounded-lg shadow animate-pulse md:hidden">
            {/* Skeleton content */}
            <div className="flex items-center space-x-4 text-sm">
                <div>
                    <div className="h-4 w-4 bg-gray-400 rounded"></div>
                </div>
                <div className="w-36 h-4 bg-gray-400 rounded"></div>
                <div className="w-20 h-4 bg-gray-400 rounded"></div>
            </div>
            <div className="h-4 w-36 bg-gray-400 rounded"></div>
            <div className="h-4 w-24 bg-gray-400 rounded"></div>
            <div className="h-4 w-24 bg-gray-400 rounded"></div>
        </div>
    )
}

export default FacultydivSkeleton