import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { CiMenuKebab } from "react-icons/ci";
import FacultyTableBody from "../components/FacultyTableBody";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const [today, setToday] = useState('');
    const [faculty, setFaculty] = useState([]);
    const [state, setState] = useState({
        totalAdmin: "", totalFaculty: "", totalStudents: ""
    })

    useEffect(() => {
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString(undefined, options);
        setToday(formattedDate);
    }, []);


    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const res = await fetch('/api/v1/admin/dashboard/faculty');
                const data = await res.json();
                if (Array.isArray(data.data)) {
                    setFaculty(data.data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                setFaculty("No User Avaiable")
            }
        };
        fetchFacultyData();
    }, []);


    useEffect(() => {
        const userState = async () => {
            try {
                const res = await fetch('/api/v1/admin/dashboard/state');
                const data = await res.json();
                setState({
                    totalStudents: data.data.totalStudents,
                    totalFaculty: data.data.totalFaculty,
                    totalAdmin: data.data.totalAdmin
                })
            } catch (error) {
                console.log(error)
            }
        }
        userState()
    }, [])

    return (
        <div className="lg:px-10 md:px-7 sm:px-3 px-4 py-8 bg-[#f5f7f8]">
            <div>
                <h1 className="mb-10 text-4xl font-bold text-slate-800">Dashboard</h1>
            </div>
            <div className="flex flex-wrap gap-4 w-full">

                <div className="flex-auto w-64 h-36 bg-blue-800 rounded-lg flex-shrink-0 py-4 px-4">
                    <div className="flex items-center justify-between text-white font-semibold text-2xl">
                        <p>{state.totalStudents}</p>
                        <CiMenuKebab />
                    </div>
                    <p className="text-white">Students</p>
                </div>

                <div className="flex-auto w-64 h-36 bg-orange-500 rounded-lg flex-shrink-0 py-4 px-4">
                    <div className="flex items-center justify-between text-white font-semibold text-2xl">
                        <p>{state.totalFaculty}</p>
                        <CiMenuKebab />
                    </div>
                    <p className="text-white">Faculty</p>
                </div>

                <div className="flex-auto w-64 h-36 bg-purple-800 rounded-lg flex-shrink-0 py-4 px-4">
                    <div className="flex items-center justify-between text-white font-semibold text-2xl">
                        <p>{state.totalAdmin}</p>
                        <CiMenuKebab />
                    </div>
                    <p className="text-white">Admin</p>
                </div>

                <div className="flex-auto w-64 h-36 bg-slate-700 rounded-lg flex-shrink-0 py-4 px-4">
                    <div className="flex flex-col items-start gap-3 justify-between font-medium text-white text-xl">
                        <p>{today}</p>
                        <p>{new Date().toLocaleTimeString()}</p>
                    </div>
                </div>

            </div>

            <h1 className="text-xl mb-2 mt-10 font-semibold text-slate-800">Faculty List</h1>

            <div className="overflow-auto rounded-lg shadow-md h-96 bg-white">
                <div className="overflow-x-auto">
                    {faculty.length <= 0 ? (
                        <p className="text-center mt-10 text-2xl font-semibold">No User Found</p>
                    ) : (

                        <table className="min-w-full table-auto sm:w-full md:w-auto lg:w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">ContactNumber</th>
                                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Subject</th>
                                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Gender</th>
                                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Course</th>
                                </tr>
                            </thead>
                            {faculty.map((data, index) => (
                                <FacultyTableBody key={index} data={data} />
                            ))}
                        </table>
                    )}
                </div>
            </div>

            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ullam inventore saepe repellendus assumenda tempore, iste at? Officiis iure, asperiores iste blanditiis aspernatur dolor vel illum incidunt tempore omnis quia aut laboriosam sunt fugit? Suscipit officiis ut maiores perferendis totam tempora, nemo maxime provident sunt rem voluptatem quidem, pariatur rerum id nulla sequi nobis ipsum voluptas accusantium ipsam! Debitis iure eligendi deleniti esse reiciendis expedita similique tenetur delectus. A obcaecati placeat itaque voluptatum nulla fuga eum alias assumenda dolor tempore quidem ab, dolores amet molestiae expedita, ex nam maiores quos impedit, vitae quaerat. Sint vero officia culpa sequi, accusamus voluptas doloribus optio hic dicta praesentium recusandae facilis provident? Nemo molestias quibusdam rerum reiciendis esse qui suscipit a et dignissimos inventore quo autem ex tenetur provident laboriosam porro modi neque mollitia earum est ipsa, necessitatibus voluptas veritatis cum. Dolor eveniet doloribus iusto sed harum maiores labore in maxime laudantium magni explicabo, nulla quaerat neque adipisci nam minima laboriosam? Quia distinctio, sapiente commodi blanditiis dolorem velit recusandae similique incidunt illum quaerat voluptate esse! Aut rerum laboriosam, totam dolor officiis atque architecto quis aliquid numquam ipsa magni quia repudiandae necessitatibus magnam obcaecati nulla excepturi qui molestias sed laborum vel vero inventore! Distinctio, perferendis.
            </div>

        </div>
    )
}