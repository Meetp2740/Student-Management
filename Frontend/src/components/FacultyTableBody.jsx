import React from 'react'

function FacultyTableBody({data}) {
    return (
        <tbody className="divide-y divide-gray-100">
            <tr className="bg-white">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-bold text-blue-500 hover:underline">{data.FullName}</a>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {data.user.Email}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data.user.ContactNumber}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data.Subject}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data.Gender}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span
                        className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{data.Course}</span>
                </td>
            </tr>
        </tbody>
    )
}

export default FacultyTableBody