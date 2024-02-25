import React from 'react';

function FacultyTableBody({ faculty, index }) {
        return (
            <tr className="bg-white">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-bold text-blue-500 hover:underline">{index + 1}</a>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {faculty?.FullName}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{faculty?.Course}</span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{faculty?.Subject}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{faculty?.user?.ContactNumber}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{faculty?.Gender}</td>
            </tr>
        );
}

export default FacultyTableBody;
