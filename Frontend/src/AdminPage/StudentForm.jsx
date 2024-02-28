import { useEffect, useState } from "react";
import { FaWpforms } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SignUpFail, SignUpStart, SignUpSuccess, resetUserState } from "../redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";

const StudentForm = () => {

    // let { loading, error, currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [course, setCourse] = useState([])
    const [success, setSuccess] = useState(false)

    console.log(error)

    const [Form, setForm] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Address: "",
        ContactNumber: "",
        Role: "student",
        Course: "",
        Semester: "",
        BirthDate: "",
        Gender: "",
        Avatar: "",
        Password: "",
        ConfirmPassword: ""
    })

    const validationSchema = Yup.object({
        FirstName: Yup.string().required("First Name is required"),
        LastName: Yup.string().required("Last Name is required"),
        Email: Yup.string().email("Invalid email format").required("Email is required"),
        Address: Yup.string().required("Address is required"),
        ContactNumber: Yup.string().matches(/^\d{10}$/, "Contact Number is required").required("Contact Number is required"),
        Role: Yup.string().required("Role is required"),
        Course: Yup.string().required("Course is required"),
        Semester: Yup.string().required("Semester is required"),
        BirthDate: Yup.string().required("Birth Date is required"),
        Gender: Yup.string().required("Gender is required"),
        Avatar: Yup.string(),
        Password: Yup.string().required("Password is required").min(5, "Password must be at least 5 characters"),
        ConfirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("Password"), null], "Passwords must match")
    })

    const formHandler = async (e) => {
        setForm({ ...Form, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        return () => {
            dispatch(resetUserState());
        };
    }, []);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const res = await fetch('/api/v1/admin/dashboard/course');
                const data = await res.json();
                if (Array.isArray(data.data.courseData)) {
                    setCourse(data.data.courseData);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseData()
    }, [])

    const handlerStudentRegister = async () => {
        const res = await fetch('/api/v1/user/student/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Form)
        })
        const isValid = await validationSchema.validate(Form, { abortEarly: false })
        const data = await res.json()
        if (data.success == false) {
            setSuccess(false)
        } else {
        }
    }

    const { mutate: studentRegisterMutation, isLoading, isError, isSuccess, data: registerData, error: registerError = {}, reset: resetRegisterState, status: registerStatus, } = useMutation({
        mutationFn: handlerStudentRegister,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            const newError = {}

            error.inner.map((err) => {
                return newError[err.path] = err.message
            })

            setError(newError)
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        studentRegisterMutation()
    }


    return (
        <div className="w-full p-2 sm:p-6 md:p-9">

            <div className="text-2xl font-bold flex justify-center items-center gap-1 mb-8">
                <p >STUDENT FORM </p>
                <FaWpforms />
            </div>

            <div className="form-container">

                <form className="flex flex-wrap gap-10">
                    <div className="flex flex-col flex-1">

                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" id="FirstName" name="FirstName" placeholder="Jonathan" onChange={formHandler} className="p-3 bg-slate-100 rounded-lg "></input>
                        {error.LastName && <p class="mt-2 text-sm text-green-600 dark:text-green-500"><span class="font-medium">Alright!</span> Username available!</p>
                        }
                        <label htmlFor="LastName">Last Name</label>
                        <input type="text" id="LastName" name="LastName" placeholder="Doe" onChange={formHandler} className="p-3 bg-slate-100 rounded-lg"></input>
                        {error.LastName && <p className="text-red-500 text-sm lg:mb-10 ">{error.LastName}</p>}

                        <label htmlFor="Email">Email Address</label>
                        <input type="text" id="Email" name="Email" onChange={formHandler} placeholder="jon@doe.com" className="p-3 bg-slate-100 rounded-lg "></input>
                        {error.Email && <p className="text-red-500 text-sm ">{error.Email}</p>}

                        <label htmlFor="Address">Address</label>
                        <textarea id="Address" onChange={formHandler} name="Address" placeholder="Enter your Address.." className="p-3 bg-slate-100 rounded-lg "></textarea>
                        {error.Address && <p className="text-red-500 text-sm">{error.Address}</p>}

                        {/* lg:mb-10 md:mb-9 sm:mb-6 mb-4 */}

                    </div>

                    {/* SecondRow */}

                    <div className="flex flex-col flex-1 0">

                        <label htmlFor="ContactNumber">Contact Number</label>
                        <input type="text" id="ContactNumber" name="ContactNumber" onChange={formHandler} placeholder="+91 999 999..." className="p-3 bg-slate-100 rounded-lg "></input>

                        <label>Course</label>
                        <select id="Course" onChange={formHandler} className={`bg-slate-100  text-slate-900 text-sm rounded-lg  block w-full p-2.5 placeholder-slate-400   `}>
                            <option value="" >Choose a Course</option>
                            {
                                course.map((course, index) => {
                                    return <option value={course.Name}>{course.Name}</option>
                                })
                            }

                        </select>

                        <label>Semester</label>
                        <select id="Semester" onChange={formHandler} className={`bg-slate-100  text-slate-900 text-sm rounded-lg  block w-full p-2.5 placeholder-slate-400   `}>
                            <option value="" disabled>Choose a semester</option>
                            <option value="Sem-1">Sem-1</option>
                            <option value="Sem-2">Sem-2</option>
                            <option value="Sem-3">Sem-3</option>
                            <option value="Sem-4">Sem-4</option>
                            <option value="Sem-5">Sem-5</option>
                            <option value="Sem-6">Sem-6</option>
                        </select>

                        <label htmlFor="BirthDate">BirthDate</label>
                        <input type="date" id="BirthDate" name="BirthDate" onChange={formHandler} placeholder="BirthDate" className="p-3 bg-slate-100 rounded-lg "></input>


                    </div>

                    {/* ThirdRow */}

                    <div className="flex flex-col flex-1 0">

                        <label htmlFor="Gender">Gender</label>
                        <select id="Gender" onChange={formHandler} className="bg-slate-100  text-slate-900 text-sm rounded-lg  block w-full p-2.5 placeholder-slate-400  ">
                            <option value="" >Choose a Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <label htmlFor="Avater">Avater</label>
                        <input type="file" id="Avater" name="Avater" onChange={formHandler} placeholder="Green Tea" className="p-3 bg-slate-100 rounded-lg "></input>

                        <label htmlFor="Password">Password</label>
                        <input type="Password" id="Password" name="Password" onChange={formHandler} placeholder="Enter Password" className="p-3 bg-slate-100 rounded-lg "></input>

                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input type="text" id="ConfirmPassword" name="ConfirmPassword" onChange={formHandler} placeholder="Confirm Password" className="p-3 bg-slate-100 rounded-lg "></input>

                    </div>


                </form>
                <input onClick={submitHandler} type="submit" value="Submit" className="flex-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-800 dark:text-white dark:hover:bg-gray-700" />
                <div>
                    {
                        success ?
                            <p className='text-green-600 my-5 font-semibold'>User Created Successful</p>
                            : <p></p>
                        // <p className='text-red-900 my-5 font-semibold'>{error ? error || "Something went wrong" : ""}</p>
                    }
                </div>
            </div>
        </div>



    )
}


export default StudentForm

