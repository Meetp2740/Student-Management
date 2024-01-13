import React, { useEffect, useState } from 'react'
import StudentTableBody from '../components/StudentTableBody';

function StudentDetail() {

    const [editMenu, setEditMenu] = useState(false);
    const [students, setStudents] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false)
    const [filter, setFilter] = useState({})
    const [course, setCourse] = useState([])

    const filterHandler = (e) => {
        setFilter({
            ...filter, [e.target.name] : e.target.value
        })
    }
    console.log(filter)

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const res = await fetch('/api/v1/admin/dashboard/course');
                const data = await res.json();
                if (Array.isArray(data.data.courseData)) {
                    setCourse(data.data.courseData);
                    // console.log(course)
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseData()
    }, [ filter ])

    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                const queryString = Object.entries(filter).map(([key, value]) => `${key}=${value}`).join('&');
                console.log(queryString)
                const res = await fetch(`/api/v1/admin/dashboard/students?${queryString}`);
                const data = await res.json();
                if (Array.isArray(data.data.studentsData)) {
                    setStudents(data.data.studentsData);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchStudentsData()
    }, [])

    return (
        <div className='w-full h-screen'>
            <div className={`${filterOpen ? "block" : "hidden"} absolute flex w-full justify-center`}>
                <div className={`w-[500px] text-white rounded-b-lg fixed top-0 h-96 bg-[#1A1B1C] z-10`}>
                    <form className="filter-container p-5 text-lg flex flex-col justify-between h-full">
                        {/* <!-- Gender Filter --> */}
                        <div className="flex gap-5">
                            <label>Gender:</label>
                            <div className=''>

                                <input onChange={filterHandler} type="radio" id="male" value='Male' name="Gender"></input>
                                <label htmlFor="male" className='mr-10 ml-1'>Male</label>
                                <input onChange={filterHandler} type="radio" id="female" value='Female' name="Gender"></input>
                                <label htmlFor="female" className='mr-10 ml-1'>Female</label>
                                <input onChange={filterHandler} type="radio" id="all" value='All' name="Gender" ></input>
                                <label htmlFor="all" className='mr-10 ml-1'>All</label>

                            </div>
                        </div>

                        {/* <!-- Course Filter --> */}
                        <div className="filter-group">
                            <label htmlFor="course-filter">Course:</label>
                            <select onChange={filterHandler} id="course-filter" name="Course" className='bg-slate-700 w-52 rounded-lg h-10 px-2 ml-4 text-base'>
                            <option value="" >Choose a Course</option>
                            {
                                course.map((course, index) => {
                                    return <option key={index} value={course.Name}>{course.Name}</option>
                                })
                            }
                            </select>
                        </div>

                        {/* <!-- Semester Filter --> */}
                        <div className="filter-group">
                            <label htmlFor="semester-filter">Semester:</label>
                            <select onChange={filterHandler} id="semester-filter" name="Semester" className='bg-slate-700 w-52 rounded-lg h-10 px-2 ml-4 text-base'>
                                <option  value="all">All</option>
                                <option value="Sem-1">Semester 1</option>
                                <option value="Sem-2">Semester 2</option>
                                <option value="Sem-3">Semester 3</option>
                                <option value="Sem-4">Semester 4</option>
                                <option value="Sem-5">Semester 5</option>
                                <option value="Sem-6">Semester 6</option>
                                {/* <!-- Add more options as needed --> */}
                            </select>
                        </div>
                        <button className='bg-slate-700 rounded-lg p-2'>Submit</button>
                    </form>

                </div>
            </div>
            <section className="bg-[#f5f7f8] h-screen p-3 sm:p-5 z-0">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">

                    <div className="bg-white relative sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2" placeholder="Search" required=""></input>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700  dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add Student
                                </button>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium bg-slate-100 rounded-lg border hover:bg-slate-100 hover:text-primary-700 dark:border-slate-400 text-slate-800" type="button">
                                        <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                        Actions
                                    </button>
                                    <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                                        </div>
                                    </div>
                                    <div className=''>

                                        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" onClick={() => setFilterOpen(!filterOpen)} className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium bg-slate-100 rounded-lg border hover:bg-slate-100 hover:text-primary-700 dark:border-slate-400 text-slate-800" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                            </svg>
                                            Filter
                                            <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-100">
                                <thead className="text-xs text-black uppercase bg-slate-100">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">FullName</th>
                                        <th scope="col" className="px-4 py-3">Email</th>
                                        <th scope="col" className="px-4 py-3">Course</th>
                                        <th scope="col" className="px-4 py-3">Semester</th>
                                        <th scope="col" className="px-4 py-3">Contact Number</th>
                                        <th scope="col" className="px-4 py-3">Gender</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-gray-100'>

                                    {students.map((data, index) => (
                                        <StudentTableBody key={index} data={data} />
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-slate-900">
                                Showing
                                <span className="font-semibold text-slate-600 ml-1 mr-1">1-10</span>
                                of
                                <span className="font-semibold text-slate-600 ml-1">1000</span>
                            </span>

                        </nav>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default StudentDetail