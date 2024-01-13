import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const CourseForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [courseData, setCourseData] = useState({
        name: '',
        code: '',
        subjects: [''],
        description: '',
        duration: '' || "3 Year"
    });

    useEffect(() => {
        setError('')
        setLoading(false)
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubjectInputChange = (e, index) => {
        const subjectsCopy = [...courseData.subjects];
        subjectsCopy[index] = e.target.value;
        setCourseData({ ...courseData, subjects: subjectsCopy });
    };

    const handleRemoveSubject = (index) => {
        const subjectsCopy = [...courseData.subjects];
        subjectsCopy.splice(index, 1);
        setCourseData({ ...courseData, subjects: subjectsCopy });
    };

    const handleAddSubject = () => {
        setCourseData({ ...courseData, subjects: [...courseData.subjects, ''] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await fetch('/api/v1/user/course/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData)
            })
            const data = await res.json();
            console.log(data)
            if (data.success == false) {
                setError(data.message)
                setLoading(false)
            } else {
                setLoading(false)
                setSuccess(true)
                setCourseData({
                    name: '',
                    code: '',
                    subjects: [],
                    description: '',
                    duration: '',
                });
            }
        } catch (error) {
            setError(error.message || "Something went wrong, Please try again")
            setLoading(false)
        }
    };

    console.log(courseData)

    return (
        <div className='max-w-2xl mx-auto p-3 h-full'>

            <h1 className='text-3xl font-extrabold text-slate-900 mt-7 mb-9'>Course Details:-</h1>

            <form className='flex flex-col gap-4'>
                <label className='flex flex-col'>
                    Course Name:
                    <input
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleInputChange}
                        className='p-3 bg-slate-100 rounded-lg'
                    />
                </label>

                <label className='flex flex-col'>
                    Course Code:
                    <input
                        type="text"
                        name="code"
                        value={courseData.code}
                        onChange={handleInputChange}
                        className='p-3 bg-slate-100 rounded-lg'
                    />
                </label>

                <label className='flex flex-col'>
                    Subjects:
                    {courseData.subjects.map((subject, index) => (
                        <div key={index}
                            className='bg-slate-200 p-3 rounded-lg flex items-center mb-1 mt-1'
                        >
                            <input
                                type='text'
                                placeholder='Search...'
                                className='bg-transparent focus:outline-none w-full'
                                value={subject}
                                onChange={(e) => handleSubjectInputChange(e, index)}
                            />
                            <IoMdClose className='text-slate-600 cursor-pointer' onClick={() => handleRemoveSubject(index)} />
                        </div>
                    ))}
                    <button
                        type='button'
                        onClick={handleAddSubject}
                        className='bg-slate-700 text-white py-1 rounded-lg mt-2'
                    >
                        Add Subject
                    </button>
                </label>

                <label className='flex flex-col'>
                    Course Description:
                    <input
                        type="text"
                        name="description"
                        value={courseData.description}
                        onChange={handleInputChange}
                        className='p-3 bg-slate-100 rounded-lg'
                    />
                </label>

                <label htmlFor="Duration"> Course Duration:</label>
                <select id="Duration" name='duration' value={courseData.duration} onChange={handleInputChange} className="bg-slate-100  text-slate-900 text-sm rounded-lg  block w-full p-3 placeholder-slate-400">
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Year</option>
                    <option value="3 Year">3 Year</option>
                    <option value="4 Year">4 Year</option>
                    <option value="5 ear">5 Year</option>
                </select>

            </form>
            <input onClick={handleSubmit} type="submit" value={loading ? "Loading..." : "Submit"} className={`mt-5 mb-5 flex-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-slate-800 dark:text-white dark:hover:bg-gray-700 ${loading ? "disabled opacity-40" : ""}`}></input>

            <div className='mb-24'>
                {
                    success ?
                        <p className='text-green-600 my-5 font-semibold'>Course Created Successful</p>
                        :
                        <p className='text-red-900 my-5 font-semibold'>{error ? error || "Something went wrong" : ""}</p>
                }
            </div>

        </div>
    );
};

export default CourseForm;




