import React from 'react'

function StudentTablediv({student, index, currentPage, pageSize}) {

    const rowNumber = (currentPage - 1) * pageSize + index + 1;

    return (
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4 text-sm">
                <div>
                    <a href="#" className="text-blue-500 font-bold hover:underline">{rowNumber}</a>
                </div>
                <div className="text-gray-700 font-semibold">{student?.FullName}</div>
                <div>
                    <span className="p-2 text-sm font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{student?.Course}</span>
                </div>
            </div>
            <div className="text-sm text-gray-700">
                {student?.user?.Email}
            </div>
            <div className="text-sm font-medium text-black">
                {student?.user?.ContactNumber}
            </div>
        </div>
    )
}

export default StudentTablediv