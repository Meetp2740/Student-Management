import React from 'react';

function FacultyTableSkeleton() {
    // Define the number of skeleton rows you want
    const numberOfSkeletonRows = 5;

    // Create an array to hold the skeleton row elements
    const skeletonRows = Array.from({ length: numberOfSkeletonRows }, (_, index) => (
        <tr key={index} className="bg-white animate-pulse">
            <td className="p-3 text-sm text-gray-300 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 text-sm text-gray-300 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 text-sm text-gray-300 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 text-sm text-gray-300 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 text-sm text-gray-300 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 text-sm text-gray-300 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded"></div>
            </td>
        </tr>
    ));

    return (
        <>
            <thead className="bg-gray-50 border-b-2 border-gray-200 animate-pulse">
                <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                        <div className="h-6 bg-gray-400 rounded"></div>
                    </th>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                        <div className="h-6 bg-gray-400 rounded"></div>
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                        <div className="h-6 bg-gray-400 rounded"></div>
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                        <div className="h-6 bg-gray-400 rounded"></div>
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                        <div className="h-6 bg-gray-400 rounded"></div>
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                        <div className="h-6 bg-gray-400 rounded"></div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {skeletonRows}
            </tbody>
        </>
    );
}

export default FacultyTableSkeleton;
