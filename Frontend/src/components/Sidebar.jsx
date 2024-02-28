import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  LockClosedIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Sidebar({ sidebarOpen, toggleSidebar }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className={`h-[100vh] max-w-[20rem] min-w-[15rem] p-4 flex-col z-[1000] sticky top-0 bg-[#f5f7f8] lg:block md:block ${sidebarOpen ? "" : "sm:hidden hidden"}`}>
      <div className="mb-2 p-4">
        <Typography color="blue-gray" className="text-3xl font-bold flex justify-between items-center">
          <p>Sidebar</p>
          <p className="font-bold hover:bg-gray-400 rounded-lg px-2 cursor-pointer block sm:hidden" onClick={() => toggleSidebar()}>X</p>
        </Typography>
      </div>
      <List>

        <Link to='/admin/dashboard'>
          <ListItem className="flex gap-3 items-center">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <div className="text-xl">
              Dashboard
            </div>
          </ListItem>
        </Link>


        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 " selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 flex items-center gap-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Details
              </Typography>
            </AccordionHeader>
          </ListItem>
          {open === 2 && <AccordionBody className="py-1">
            <List className="p-0">

              <Link to='/admin/students'>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Students
                </ListItem>
              </Link>

              <Link to='/admin/courses'>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Courses
                </ListItem>
              </Link>

            </List>
          </AccordionBody>
          }
        </Accordion>

        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 flex items-center " selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3 flex items-center gap-3">
              <ListItemPrefix className="">
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Form
              </Typography>
            </AccordionHeader>
          </ListItem>
          {open === 3 && <AccordionBody className="py-1">
            <List className="p-0">

              <Link to='/admin/studentform'>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Student
                </ListItem>
              </Link>

              <Link to='/admin/facultyform'>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Faculty
                </ListItem>
              </Link>

              <Link to='/admin/managementform'>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Management
                </ListItem>
              </Link>

              <Link to='/admin/courseform'>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Course
                </ListItem>
              </Link>

            </List>
          </AccordionBody>
          }
        </Accordion>


        <hr className="my-2 border-blue-gray-50" />
        <ListItem className="flex justify-between">
          <div className="flex gap-3 items-center">
            <ListItemPrefix >
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
          </div>
          <ListItemSuffix className="bg-slate-500 rounded-3xl text-sm text-white ml-10">
            <Chip value="14" variant="ghost" color="blue-gray" className="px-2 py-1 rounded-full" />
          </ListItemSuffix>
        </ListItem>


        <ListItem className="flex gap-3 items-center">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>


        <ListItem className="flex gap-3 items-center">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>


        <ListItem className="flex gap-3 items-center">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>


      </List>
    </div>
  );
}

export default Sidebar