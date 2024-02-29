import { QueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaWpforms } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const queryClient = new QueryClient()

function ManagementForm() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState({})

    // const [course, setCourse] = useState([])

    const [Form, setForm] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Address: "",
        ContactNumber: "",
        Role: "management",
        BirthDate: "",
        Gender: "",
        Department: "",
        Avater: "",
        Password: "",
        ConfirmPassword: ""
    });

    const validationSchema = Yup.object({
        FirstName: Yup.string().required("First Name is required"),
        LastName: Yup.string().required("Last Name is required"),
        Email: Yup.string().email("Invalid Email").required("Email is required"),
        Address: Yup.string().required("Address is required"),
        ContactNumber: Yup.string().matches(/^\d{10}$/, "Invalid Contact Number format").required("Contact Number is required"),
        Role: Yup.string().required("Role is required"),
        BirthDate: Yup.string().required("Birth Date is required"),
        Gender: Yup.string().required("Gender is required"),
        Department: Yup.string().required("Department is required"),
        Avatar: Yup.string(),
        Password: Yup.string().required("Password is required").min(5, "Password must be at least 5 characters"),
        ConfirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("Password"), null], "Passwords must match")
    })

    const formHandler = async (e) => {
        setForm({ ...Form, [e.target.id]: e.target.value })
    }

    const handlerManagementRegister = async () => {
        const res = await fetch('/api/v1/user/admin/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Form)
        })
        const data = await res.json()
        const isValid = await validationSchema.validate(Form, { abortEarly: false })
        if (!res.ok) {
            const error = new Error("Error occured while SignIn!");
            error.code = res.status;
            error.message = error.code === 404 ? 'Something went wrong!' : data.message
            throw error;
        }
    };

    const { mutate: managementRegisterMutation, isLoading, isError, isSuccess, data: registerData, error: registerError = {}, reset: resetRegisterState, status: registerStatus, } = useMutation({
        mutationFn: handlerManagementRegister,
        onSuccess: () => {
            queryClient.invalidateQueries(["state"])
        },
        onError: (error) => {
            {
                error.code === 404 ?
                    error.message = "Server Error Occured while Signing In. Please try again later"
                    : error.message
            }

            const newError = {}

            error?.inner?.map((err) => {
                return newError[err.path] = err.message
            })

            setError(newError)
        }
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        managementRegisterMutation()
    }

    console.log(registerError?.name)

    return (

        <div className="w-full p-2 sm:p-6 md:p-9">

            <div className="text-2xl font-bold flex justify-center items-center gap-1 mb-8">
                <p >ADMIN FORM </p>
                {/* <FaWpforms /> */}
            </div>

            <form className="flex flex-wrap gap-10 w-full overflow-x-auto">
                <div className="flex flex-col flex-1">

                    <label htmlFor="FirstName">First Name</label>
                    <input type="text" id="FirstName" name="FirstName" placeholder="Jonathan" onChange={formHandler} className="p-3 bg-slate-100 rounded-lg lg:mb-2 mb-4"></input>
                    {error.FirstName ? <p className="text-red-500 text-sm lg:mb-5 mb-2">{error.FirstName}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                    <label htmlFor="LastName">Last Name</label>
                    <input type="text" id="LastName" name="LastName" placeholder="Doe" onChange={formHandler} className="p-3 bg-slate-100 rounded-lg lg:mb-2 mb-4"></input>
                    {error.LastName ? <p className="text-red-500 text-sm lg:mb-5 mb-2">{error.LastName}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                    <label htmlFor="Email">Email Address</label>
                    <input type="text" id="Email" name="Email" onChange={formHandler} placeholder="jon@doe.com" className="p-3 bg-slate-100 rounded-lg lg:mb-2 mb-4 "></input>
                    {error.Email ? <p className="text-red-500 text-sm lg:mb-5 mb-2">{error.Email}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                    <label htmlFor="Address">Address</label>
                    <textarea id="Address" onChange={formHandler} name="Address" placeholder="Enter your Address.." className="p-3 bg-slate-100 rounded-lg lg:mb-2 mb-4"></textarea>
                    {error.Address ? <p className="text-red-500 text-sm lg:mb-5 mb-2">{error.Address}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                </div>

                {/* SecondRow */}

                <div className="flex flex-col flex-1">

                    <label htmlFor="ContactNumber">Contact Number</label>
                    <input type="text" id="ContactNumber" name="ContactNumber" onChange={formHandler} placeholder="+91 999 999..." className="p-3 bg-slate-100 rounded-lg lg:mb-2 mb-4"></input>
                    {error.ContactNumber ? <p className="text-red-500 text-sm lg:mb-5 ">{error.ContactNumber}</p> : <p className="text-red-500 text-sm lg:mb-5"><></></p>}

                    <label htmlFor="BirthDate">BirthDate</label>
                    <input type="date" id="BirthDate" name="BirthDate" onChange={formHandler} placeholder="BirthDate" className="p-3 bg-slate-100 rounded-lg lg:mb-10  mb-4"></input>
                    {error.BirthDate ? <p className="text-red-500 text-sm lg:mb-5 ">{error.BirthDate}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                    <label htmlFor="Gender">Gender</label>
                    <select id="Gender" onChange={formHandler} className="bg-slate-100  text-slate-900 text-sm rounded-lg  block w-full p-2.5 placeholder-slate-400  lg:mb-2 mb-4">
                        <option defaultValue="" disabled>Choose a Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {error.Gender ? <p className="text-red-500 text-sm lg:mb-5 ">{error.Gender}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                    <label>Department</label>
                    <select id="Department" onChange={formHandler} className={`bg-slate-100  text-slate-900 text-sm rounded-lg  block w-full p-2.5 placeholder-slate-400  lg:mb-2 mb-4`}>
                        <option defaultValue="" disabled>Choose a Department</option>
                        <option value="adminstitation">adminstitation</option>
                        <option value="Principal">Principal</option>
                        <option value="Director">Director</option>
                    </select>
                    {error.Department ? <p className="text-red-500 text-sm lg:mb-5 ">{error.Department}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                </div>

                {/* ThirdRow */}

                <div className="flex flex-col flex-1">


                    <label htmlFor="Avater">Document</label>
                    <input type="file" id="Avater" name="Avater" onChange={formHandler} placeholder="Green Tea" className="p-3 bg-slate-100 rounded-lg  lg:mb-2 mb-4"></input>
                    {error.Avater ? <p className="text-red-500 text-sm lg:mb-5 ">{error.Avater}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                    <label htmlFor="Password">Password</label>
                    <input type="Password" id="Password" name="Password" onChange={formHandler} placeholder="Enter Password" className="p-3 bg-slate-100 rounded-lg lg:mb-2 mb-4"></input>
                    {error.Password ? <p className="text-red-500 text-sm lg:mb-5 ">{error.Password}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                    <input type="text" id="ConfirmPassword" name="ConfirmPassword" onChange={formHandler} placeholder="Confirm Password" className="p-3 bg-slate-100 rounded-lg lg:mb-2 mb-4"></input>
                    {error.ConfirmPassword ? <p className="text-red-500 text-sm lg:mb-5 ">{error.ConfirmPassword}</p> : <p className="text-red-500 text-sm lg:mb-5"></p>}

                </div>


            </form>
            <input onClick={submitHandler} type="submit" value={isLoading ? "Loading..." : "Submit"} className={`flex-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-800 dark:text-white dark:hover:bg-gray-700 ${isLoading ? "disabled opacity-40" : ""}`}></input>
            <div>
                {
                    isSuccess &&
                    <p className='text-green-600 my-5 font-semibold'>User Created Successful</p>
                }
                {
                    isError &&
                    <p className='text-red-900 my-5 font-semibold'>{registerError ? registerError?.name === "ValidationError" ? "" : registerError?.message : "Something went wrong"}</p>
                }
            </div>
        </div>



    )
}

export default ManagementForm