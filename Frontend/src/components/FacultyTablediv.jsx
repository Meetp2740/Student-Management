import React from 'react'

function FacultyTablediv({ faculty, index }) {
    return (
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4 text-sm">
                <div>
                    <a href="#" className="text-blue-500 font-bold hover:underline">#{index + 1}</a>
                </div>
                <div className="text-gray-700 font-semibold">{faculty?.FullName}</div>
                <div>
                    <span className="p-2 text-sm font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{faculty?.Course}</span>
                </div>
            </div>
            <div className="text-sm text-gray-700">
                {faculty?.user?.Email}
            </div>
            <div className="text-sm font-medium text-black">
                {faculty?.user?.ContactNumber}
            </div>
        </div>
    )
}

export default FacultyTablediv