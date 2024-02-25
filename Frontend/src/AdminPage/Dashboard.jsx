import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLogin } from "../context/LoginContext";
import AdminAuth from "../OtherComponents/AdminAuth";
import handle419Error from "../OtherComponents/handle419Error.js";
import FacultyTableBody from "../components/FacultyTableBody";
import FacultyTablediv from "../components/FacultyTablediv.jsx";
import FacultyTableSkeleton from "../LoadingComponent/FacultyTableSkeleton.jsx"
import FacultydivSkeleton from "../LoadingComponent/FacultydivSkeleton.jsx";

export default function Dashboard() {

    const [today, setToday] = useState('');
    const navigate = useNavigate();
    const { handleLogout } = useLogin();

    // fetching Date and Time
    useEffect(() => {
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString(undefined, options);
        setToday(formattedDate);
    }, []);

    // fetching facultyData
    const { data: facultyData, isLoading: facultyLoading, isError: facultyError } = useQuery({
        queryKey: ['faculty'],
        queryFn: async () => {
            const res = await fetch('/api/v1/admin/dashboard/faculty');
            const data = await res.json();

            if (res.status === 419) {
                try {
                    handle419Error(navigate, handleLogout);
                } catch (error) {
                    throw new Error('Failed to fetch faculty data');
                }
            }

            if (!res.ok) {
                throw new Error('Failed to fetch faculty data');
            }

            // Check if the response indicates that the token is not valid

            if (!Array.isArray(data.data)) {
                throw new Error('Fetched data is not an array');
            }

            return data.data;
        },
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // fetching User State
    const { data: userData, isLoading: userLoading, isError: userError } = useQuery({
        queryKey: ['state'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/v1/admin/dashboard/state');
                const data = await res.json();
                return data?.data;
            } catch (error) {
                console.log(error)
            }
        },
        refetchOnWindowFocus: false,
        // staleTime: 1000 * 60 * 5, // 5 minutes
    })

    return (
        <div className="lg:px-10 md:px-7 sm:px-3 px-4 py-8 bg-[#f5f7f8] overflow-hidden">
            <div>
                <h1 className="mb-10 text-4xl font-bold text-slate-800">Dashboard</h1>
            </div>

            {userError ? (
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-5 text-white">
                    <div className="bg-gray-500 rounded-lg h-40 shadow flex justify-center items-center text-xl font-extrabold">404 ERROR</div>
                    <div className="bg-gray-500 rounded-lg h-40 shadow flex justify-center items-center text-xl font-extrabold">404 ERROR</div>
                    <div className="bg-gray-500 rounded-lg h-40 shadow flex justify-center items-center text-xl font-extrabold">404 ERROR</div>
                    <div className="bg-gray-500 rounded-lg h-40 shadow flex justify-center items-center text-xl font-extrabold">404 ERROR</div>
                </div>

            ) :
                userLoading ? (
                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 animate-pulse">
                        <div className="bg-gray-300 rounded-lg h-40 shadow"></div>
                        <div className="bg-gray-300 rounded-lg h-40 shadow"></div>
                        <div className="bg-gray-300 rounded-lg h-40 shadow"></div>
                        <div className="bg-gray-300 rounded-lg h-40 shadow"></div>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-2">

                        <div className="bg-blue-500 h-40 rounded-lg text-white font-semibold text-2xl py-4 px-4 shadow">
                            <div className="flex items-center justify-between text-white font-semibold text-2xl">
                                <p>{userData?.totalStudents}</p>
                                <CiMenuKebab />
                            </div>
                            <p className="text-white">Students</p>
                        </div>

                        <div className="bg-orange-500 h-40 rounded-lg text-white font-semibold text-2xl py-4 px-4 shadow">
                            <div className="flex items-center justify-between text-white font-semibold text-2xl">
                                <p>{userData?.totalFaculty}</p>
                                <CiMenuKebab />
                            </div>
                            <p className="text-white">Faculty</p>
                        </div>

                        <div className="bg-slate-700 h-40 rounded-lg text-white font-semibold text-2xl py-4 px-4 shadow">
                            <div className="flex items-center justify-between text-white font-semibold text-2xl">
                                <p>{userData?.totalAdmin}</p>
                                <CiMenuKebab />
                            </div>
                            <p className="text-white">Admin</p>
                        </div>

                        <div className="bg-black h-40 rounded-lg text-white font-semibold text-2xl py-4 px-4 shadow">
                            <div className="flex flex-col items-start gap-3 justify-between font-medium text-white text-xl">
                                <p>{today}</p>
                                <p>{new Date().toLocaleTimeString()}</p>
                            </div>
                        </div>

                    </div>
                )
            }


            <h1 className="text-xl mb-2 mt-10 font-semibold text-slate-800"> Faculty List </h1>

            <div className="h-screen bg-gray-100">

                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        {facultyLoading ? (
                            <FacultyTableSkeleton />
                        ) : (
                            <>
                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">FullName</th>
                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Course</th>
                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Subject</th>
                                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">ContactNumber</th>
                                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Gender</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {facultyData &&
                                        facultyData.map((faculty, index) => (
                                            <FacultyTableBody key={index} faculty={faculty} index={index} />
                                        ))}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>

                {facultyError ? (
                   <div className="bg-slate-400 text-red-800 rounded h-80 justify-center flex items-center text-xl font-extrabold animate-pulse ">
                   Failed to fetch Faculty data
               </div>
                ) :
                    facultyLoading ? (
                        <FacultydivSkeleton></FacultydivSkeleton>
                    )
                        : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                    {
                                        facultyData && facultyData.map((faculty, index) => {
                                            return <FacultyTablediv key={index} faculty={faculty} index={index}></FacultyTablediv>
                                        })
                                    }

                                </div>
                            </>
                        )
                }


            </div>
        </div >
    )
}