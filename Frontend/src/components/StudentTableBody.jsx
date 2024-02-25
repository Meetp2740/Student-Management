import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete, MdEdit } from "react-icons/md"

function StudentTableBody({ student, index, currentPage, pageSize }) {

    const rowNumber = (currentPage - 1) * pageSize + index + 1;

    return (
        <tr className="bg-white">
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-blue-500 hover:underline">{rowNumber}</a>
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {student?.FullName}
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{student?.Course}</span>
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{student?.Semester}</td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{student?.user?.ContactNumber}</td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{student?.Gender}</td>
        </tr>
    )
}

export default StudentTableBody