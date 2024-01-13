import { useEffect, useState } from "react";
import { FaWpforms } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpFail, SignUpStart, SignUpSuccess, resetUserState } from "../redux/slices/userSlice";

function ManagementForm() {
    
    let { loading, error, currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)

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
    })

    const formHandler = async (e) => {
        setForm({ ...Form, [e.target.id]: e.target.value })
    }


    useEffect(() => {
        return () => {
            dispatch(resetUserState());
        };
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault()

        // Compare Password and ConfirmPassword fields
        if (Form.Password !== Form.ConfirmPassword) {
            dispatch(SignUpFail("Password does not match Confirm Password"));
            return;
        }

        try {
            dispatch(SignUpStart())
            setSuccess(false)
            const res = await fetch('/api/v1/user/admin/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Form)
            })
            const data = await res.json()
            if (data.success == false) {
                dispatch(SignUpFail(data.message))
                setSuccess(false)
            } else {
                dispatch(SignUpSuccess())
                data.success ? setSuccess(true) : setSuccess(false)
            }
        }
        catch (error) {
            dispatch(SignUpFail("Server Error, Please Try Again"))
        }
    }

    return (

        <div className="w-full p-2 sm:p-6 md:p-9">

            <div className="text-2xl font-bold flex justify-center items-center gap-1 mb-8">
                <p >ADMIN FORM </p>
                {/* <FaWpforms /> */}
            </div>

            <form className="flex flex-wrap gap-10 w-full overflow-x-auto">
                <div className="flex flex-col flex-1 0">

                    <label htmlFor="FirstName">First Name</label>
                    <input type="text" id="FirstName" name="FirstName" placeholder="Jonathan" onChange={formHandler} className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></input>

                    <label htmlFor="LastName">Last Name</label>
                    <input type="text" id="LastName" name="LastName" placeholder="Doe" onChange={formHandler} className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></input>

                    <label htmlFor="Email">Email Address</label>
                    <input type="text" id="Email" name="Email" onChange={formHandler} placeholder="jon@doe.com" className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></input>

                    <label htmlFor="Address">Address</label>
                    <textarea id="Address" onChange={formHandler} name="Address" placeholder="Enter your Address.." className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></textarea>

                </div>

                {/* SecondRow */}

                <div className="flex flex-col flex-1">

                    <label htmlFor="ContactNumber">Contact Number</label>
                    <input type="text" id="ContactNumber" name="ContactNumber" onChange={formHandler} placeholder="+91 999 999..." className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></input>

                    <label htmlFor="BirthDate">BirthDate</label>
                    <input type="date" id="BirthDate" name="BirthDate" onChange={formHandler} placeholder="BirthDate" className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></input>

                    <label htmlFor="Gender">Gender</label>
                    <select id="Gender" onChange={formHandler} className="bg-slate-100  text-slate-900 text-sm rounded-lg  block w-full p-2.5 placeholder-slate-400  lg:mb-10 md:mb-9 sm:mb-6 mb-4">
                        <option value="" selected disabled>Choose a Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <label>Department</label>
                    <select id="Department" onChange={formHandler} className={`bg-slate-100  text-slate-900 text-sm rounded-lg  block w-full p-2.5 placeholder-slate-400  lg:mb-10 md:mb-9 sm:mb-6 mb-4 `}>
                        <option value="" selected disabled>Choose a Department</option>
                        <option value="adminstitation">adminstitation</option>
                        <option value="Principal">Principal</option>
                        <option value="Director">Director</option>
                    </select>
                </div>

                {/* ThirdRow */}

                <div className="flex flex-col flex-1">


                    <label htmlFor="Avater">Document</label>
                    <input type="file" id="Avater" name="Avater" onChange={formHandler} placeholder="Green Tea" className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></input>

                    <label htmlFor="Password">Password</label>
                    <input type="Password" id="Password" name="Password" onChange={formHandler} placeholder="Enter Password" className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></input>

                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                    <input type="text" id="ConfirmPassword" name="ConfirmPassword" onChange={formHandler} placeholder="Confirm Password" className="p-3 bg-slate-100 rounded-lg lg:mb-10 md:mb-9 sm:mb-6 mb-4"></input>

                </div>


            </form>
            <input onClick={submitHandler} type="submit" value={loading ? "Loading..." : "Submit"} className={`flex-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-800 dark:text-white dark:hover:bg-gray-700 ${loading ? "disabled opacity-40" : ""}`}></input>
            <div>
                {
                    success ?
                        <p className='text-green-600 my-5 font-semibold'>User Created Successful</p>
                        :
                        <p className='text-red-900 my-5 font-semibold'>{error ? error || "Something went wrong" : ""}</p>
                }
            </div>
        </div>



    )
}

export default ManagementForm