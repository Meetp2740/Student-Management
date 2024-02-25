import React, { useEffect, useRef, useState } from 'react'
import StudentTableBody from '../components/StudentTableBody';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoMdClose } from 'react-icons/io';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import FacultyTableSkeleton from '../LoadingComponent/FacultyTableSkeleton';
import StudentTablediv from '../components/StudentTablediv';
import FacultydivSkeleton from '../LoadingComponent/FacultydivSkeleton';
import debounce from 'lodash.debounce';

function StudentDetail() {

    const [filterOpen, setFilterOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalStudents, setTotalStudents] = useState(1)
    const [searchParams, setsearchParams] = useSearchParams({
        course: "",
        semester: "",
        gender: "",
        limit: 5,
        sortBy: "FullName",
        sortOrder: "asce",
        name: ""
    })


    const limit = searchParams.get('limit') || 5;
    const sortBy = searchParams.get('sortBy') || "FullName";
    const sortOrder = searchParams.get('sortOrder') || "asce";
    const course = searchParams.get('course') || "";
    const semester = searchParams.get('semester') || "";
    const gender = searchParams.get('gender') || "";
    const name = searchParams.get('name') || "";

    const pageSize = limit; // Number of items per page

    // Calculate the range of students being displayed
    const startRange = (currentPage - 1) * pageSize + 1;
    const endRange = Math.min(currentPage * pageSize, totalStudents);
    const isLastPage = currentPage * limit >= totalStudents;
    const isFirstPage = currentPage === 1;

    const { data: courseData = [], isLoading: courseLoading, isError: courseError } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await fetch('/api/v1/admin/dashboard/course');
            const data = await res.json();
            if (Array.isArray(data.data.courseData)) {
                return data.data.courseData
            } else {
                throw new Error('Fetched data is not an array');
            }
        }
    })
    //fetching student and adding filtering

    const { data: studentData, isLoading: studentLoading, isError: studentError } = useQuery({
        queryKey: ['student', course, semester, limit, sortBy, sortOrder, currentPage, gender, name],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/v1/admin/dashboard/students?limit=${limit}&name=${name}&sortBy=${sortBy}&page=${currentPage}&sortOrder=${sortOrder}&course=${course}&semester=${semester}&gender=${gender}`);
                const data = await res.json()
                setTotalStudents(data?.data?.totalStudents)
                if (Array.isArray(data.data.studentsData)) {
                    return data.data.studentsData
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.log(error)
            }
        },
        staleTime: Infinity,
        placeholderData: keepPreviousData
    })
    //Previous Page Handler
    const previousHandler = () => {
        if (isFirstPage) {
            setCurrentPage(Math.ceil(totalStudents / limit));
            console.log(Math.ceil(totalStudents / limit))
        } else {
            setCurrentPage(currentPage - 1)
        }
    }

    //Next Page Handler
    const nextHandler = () => {
        if (isLastPage) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className='w-full h-screen'>

            <div className="mx-auto px-4 lg:px-12 z-[-1] h-screen p-3 sm:p-5 bg-primary-color">

                <h1 className='text-3xl font-bold text-gray-800 mb-5'>Students:-</h1>

                <div className='bg-white rounded-lg mb-5 sm:grid grid-cols-2 p-3 gap-3 font-semibold text-gray-700 hidden'>

                    {/* gender filtr */}
                    <div className="flex gap-5 bg-gray-100 rounded-md p-2 whitespace-nowrap text-">
                        <label>Gender:</label>
                        <div className=''>

                            <input onChange={e => setsearchParams(pre => {
                                pre.set('gender', e.target.value)
                            })} type="radio" id="male" value='Male' name="gender"></input>
                            <label htmlFor="male" className='mr-5 ml-1'>Male</label>
                            <input onChange={e => setsearchParams(pre => {
                                pre.set('gender', e.target.value)
                            })} type="radio" id="female" value='Female' name="gender"></input>
                            <label htmlFor="female" className='mr-5 ml-1'>Female</label>
                            <input onChange={e => setsearchParams(pre => {
                                pre.set('gender', e.target.value)
                            })} type="radio" id="all" value='' name="gender" ></input>
                            <label htmlFor="all" className='mr-5 ml-1'>All</label>

                        </div>
                    </div>

                    {/* Sort Filter */}

                    <div className="flex gap-5 bg-gray-100 rounded-md p-2 whitespace-nowrap">
                        <label>Sort By Name :</label>
                        <div className=''>
                            <input onChange={e => setsearchParams(pre => {
                                pre.set('sortOrder', e.target.value)
                            })} type="radio" id="asce" value='asce' name="sortOrder"></input>
                            <label htmlFor="asce" className='mr-10 ml-1'>A-Z</label>

                            <input onChange={e => setsearchParams(pre => {
                                pre.set('sortOrder', e.target.value)
                            })} type="radio" id="desc" value='desc' name="sortOrder"></input>
                            <label htmlFor="desc" className='mr-10 ml-1'>Z-A</label>

                        </div>
                    </div>

                    {/* <!-- Semester Filter --> */}
                    <div className="filter-group bg-gray-100 rounded-md p-2 whitespace-nowrap">
                        <label htmlFor="semester-filter">Semester:</label>
                        <select onChange={e => setsearchParams(pre => {
                            pre.set('semester', e.target.value)
                        })} id="semester-filter" name="semester" className='w-52 rounded-lg h-7 px-2 ml-4 text-base'>
                            <option value="">All</option>
                            <option value="Sem-1">Semester 1</option>
                            <option value="Sem-2">Semester 2</option>
                            <option value="Sem-3">Semester 3</option>
                            <option value="Sem-4">Semester 4</option>
                            <option value="Sem-5">Semester 5</option>
                            <option value="Sem-6">Semester 6</option>
                            {/* <!-- Add more options as needed --> */}
                        </select>
                    </div>

                    {/* Course Filter */}
                    <div className="filter-group bg-gray-100 rounded-md p-2 whitespace-nowrap">
                        <label htmlFor="course-filter">Course:</label>
                        <select onChange={e => setsearchParams(pre => {
                            pre.set('course', e.target.value)
                        })} id="course-filter" name="course" className='w-52 rounded-lg h-7 px-2 ml-4 text-base'>
                            <option value="" >Choose a Course</option>
                            <option value="" >All</option>
                            {
                                courseData.map((course, index) => {
                                    return <option key={index} value={course.Name}>{course.Name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="bg-white relative sm:rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between md:space-y-0 md:space-x-4 p-4 gap-5">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search"
                                     onChange={debounce(e => setsearchParams(pre => {
                                        pre.set('name', e.target.value)
                                    }),500
                                    )}
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2" placeholder="Search" required=""></input>
                                </div>
                            </form>

                        </div>
                        {/* <div className="flex sm:flex md:flex md:items-center"> */}
                        <div className="flex sm:flex md:flex md:items-center justify-center gap-x-3">
                            <Link to='/admin/studentform' className='hidden sm:block'>
                                <div className='text-sm line-clamp-1 w-32 bg-blue-600 py-2 px-4 rounded-lg text-white border hover:bg-blue-400 hover:text-primary-700 dark:border-blue-800'>
                                    Add Student
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto shadow hidden md:block">

                        <table className="w-full">
                            {studentLoading ? (
                                <FacultyTableSkeleton />
                            ) : (
                                <>
                                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                                        <tr>
                                            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                                            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">FullName</th>
                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Course</th>
                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Semester</th>
                                            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">ContactNumber</th>
                                            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Gender</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {studentData &&
                                            studentData.map((student, index) => (
                                                <StudentTableBody key={index} student={student} index={index} currentPage={currentPage} pageSize={pageSize} />
                                            ))}
                                    </tbody>
                                </>
                            )}
                        </table>
                    </div>

                    {studentError ? (
                        <div className="bg-slate-400 text-red-800 rounded h-80 justify-center flex items-center text-xl font-extrabold animate-pulse ">
                            Failed to fetch student data
                        </div>
                    ) :
                        studentLoading ? (
                            <FacultydivSkeleton></FacultydivSkeleton>
                        )
                            : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                        {
                                            studentData && studentData.map((student, index) => {
                                                return <StudentTablediv key={index} student={student} index={index} currentPage={currentPage} pageSize={pageSize}></StudentTablediv>
                                            })
                                        }

                                    </div>
                                </>
                            )
                    }
                    <div className="flex justify-between items-center text-center p-4" >
                        <span className="text-sm font-normal text-slate-900">
                            Showing
                            <span className="font-semibold text-slate-600 ml-1 mr-1">{startRange}-{endRange}</span>
                            of
                            <span className="font-semibold text-slate-600 ml-1">{totalStudents}</span>
                        </span>

                        <div className='flex'>
                            <GrFormPrevious onClick={previousHandler} className='text-slate-600 w-10 h-6 hover:bg-primary-color rounded-lg' />
                            <MdNavigateNext onClick={nextHandler} className='text-slate-600 w-10 h-6 hover:bg-primary-color rounded-lg' />
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default StudentDetail