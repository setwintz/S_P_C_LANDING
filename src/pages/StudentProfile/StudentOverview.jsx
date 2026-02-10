
import React, { useEffect, useState, useRef } from 'react';
import useWidth from '../../Hooks/useWidth';
import { FaUserGraduate } from "react-icons/fa6";
import { FaBuilding, FaCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import { RiMessage2Fill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa6";
import { FaFileSignature } from "react-icons/fa6";
import { FaBusAlt } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { RiStarHalfLine } from "react-icons/ri";
import { GiWhiteBook } from "react-icons/gi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import { BsThreeDots } from "react-icons/bs";
import images from '../../constant/images';
import { HiDocumentReport } from 'react-icons/hi';
import { LuPlus } from "react-icons/lu";
import { div } from 'framer-motion/client';
import useNavbarType from '../../Hooks/useNavbarType';


const StudentOverview = () => {
  const { width, breakpoints } = useWidth();
  const [selectedStudentId, setSelectedStudentId] = useState(1);
  const [selectedTab, setSelectedTab] = useState('personal');
  const [academicYear, setAcademicYear] = useState('2024');
  const [classFilter, setClassFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navbarType] = useNavbarType();

  const isLg = width >= breakpoints.lg;

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [width]);

  useEffect(() => {
    setCurrentPage(1);
  }, [classFilter, sectionFilter, academicYear, rowsPerPage]);

  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      class: '10-A',
      rollNo: '001',
      photo: images.user2,
      fatherName: 'Michael Johnson',
      email: 'sarah.j@school.com',
      phone: '+1 234-567-8901',
      attendance: 95,
      behaviour: 92,
      fee: 85,
      health: 98
    },
    {
      id: 2,
      name: 'David Chen',
      class: '10-A',
      rollNo: '002',
      photo: images.user2,

      fatherName: 'Robert Chen',
      email: 'david.c@school.com',
      phone: '+1 234-567-8902',
      attendance: 88,
      behaviour: 85,
      fee: 100,
      health: 95
    },
    {
      id: 3,
      name: 'Emily Davis',
      class: '10-B',
      rollNo: '003',
      photo: images.user2,

      fatherName: 'James Davis',
      email: 'emily.d@school.com',
      phone: '+1 234-567-8903',
      attendance: 92,
      behaviour: 96,
      fee: 90,
      health: 100
    },
    {
      id: 4,
      name: 'Marcus Williams',
      class: '10-B',
      rollNo: '004',
      photo: images.user2,

      fatherName: 'Thomas Williams',
      email: 'marcus.w@school.com',
      phone: '+1 234-567-8904',
      attendance: 90,
      behaviour: 88,
      fee: 95,
      health: 92
    },
    {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    },
    {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    },
    {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    }, {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    }, {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    }, {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    }, {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    }, {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    }, {
      id: 5,
      name: 'Sophia Martinez',
      class: '9-A',
      rollNo: '005',
      photo: images.user2,

      fatherName: 'Carlos Martinez',
      email: 'sophia.m@school.com',
      phone: '+1 234-567-8905',
      attendance: 97,
      behaviour: 94,
      fee: 100,
      health: 96
    },

  ];

  const filteredStudents = students.filter(student => {
    const [cls, sec] = student.class.split('-');
    if (classFilter !== 'all' && cls !== classFilter) return false;
    if (sectionFilter !== 'all' && sec !== sectionFilter) return false;
    return true;
  });

  const indexOfFirst = (currentPage - 1) * rowsPerPage;
  const indexOfLast = indexOfFirst + rowsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <span className='bg-blue-500/30 rounded-lg p-2 border border-blue-500'><FaUserGraduate className='text-blue-500' /></span> },
    { id: 'institutional', label: 'Institutional', icon: <span className='bg-green-500/30 rounded-lg p-2 border border-green-500'><FaBuilding className='text-green-500' /></span> },
    { id: 'family', label: 'Family', icon: <span className='bg-[#f43f5e]/30 rounded-lg p-2 border border-[#f43f5e]'><FaUsers className='text-[#f43f5e]' /> </span> },
    { id: 'attendance', label: 'Attendance', icon: <span className='bg-blue-500/30 rounded-lg p-2 border border-blue-500'><IoCalendarNumberSharp className='text-blue-500' /></span> },
    { id: 'fee', label: 'Fee', icon: <span className='bg-red-500/30 rounded-lg p-2 border border-red-500'><FaSackDollar className='text-red-500' /> </span> },
    { id: 'sms', label: 'SMS', icon: <span className='bg-lime-500/30 rounded-lg p-2 border border-lime-500'><RiMessage2Fill className='text-lime-500' /></span> },
    { id: 'academic', label: 'Academic', icon: <span className='bg-deep-orange-500/30 rounded-lg p-2 border border-deep-orange-500'><FaGraduationCap className='text-deep-orange-500' /> </span> },
    { id: 'exam', label: 'Exam', icon: <span className='bg-green-500/30 rounded-lg p-2 border border-green-500'><FaFileSignature className='text-green-500' /></span> },
    { id: 'transport', label: 'Transport', icon: <span className='bg-[#115e59]/30 rounded-lg p-2 border border-[#115e59]'><FaBusAlt className='text-[#115e59]' /> </span> },
    { id: 'communication', label: 'Communication', icon: <span className='bg-[#0891b2]/30 rounded-lg p-2 border border-[#0891b2]'><FaCommentDots className='text-[#0891b2]' /></span> },
    { id: 'rating', label: 'Rating', icon: <span className='bg-yellow-500/30 rounded-lg p-2 border border-yellow-500'><RiStarHalfLine className='text-yellow-500' /> </span> },
    { id: 'library', label: 'Library', icon: <span className='bg-[#0369a1]/30 rounded-lg p-2 border border-[#0369a1]'><GiWhiteBook className='text-[#0369a1]' /></span> },
    // { id: 'certificates', label: 'Certificates', icon: <span className='bg-[#8b5cf6]/30 rounded-lg p-2 border'><PiCertificateFill className='text-[#8b5cf6]' /></span> }
  ];

  const MetricCard = ({ label, value, color }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="text-sm text-gray-600 dark:text-gray-800 mb-2">{label}</div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold" style={{ color }}>{value}%</div>
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(${color} ${value}%, #e5e7eb ${value}%)` }}>
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Full Name</label>
                <div className="text-base text-gray-900">{currentStudent.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Date of Birth</label>
                <div className="text-base text-gray-900">15 March 2008</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Gender</label>
                <div className="text-base text-gray-900">Female</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Blood Group</label>
                <div className="text-base text-gray-900">A+</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Nationality</label>
                <div className="text-base text-gray-900">American</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Religion</label>
                <div className="text-base text-gray-900">Christian</div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Address</label>
                <div className="text-base text-gray-900">123 Main Street, Springfield, IL 62701</div>
              </div>
            </div>
          </div>
        );
      case 'institutional':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Institutional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Admission Number</label>
                <div className="text-base text-gray-900">STU2024{currentStudent.id.toString().padStart(4, '0')}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Admission Date</label>
                <div className="text-base text-gray-900">01 April 2024</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Class</label>
                <div className="text-base text-gray-900">{currentStudent.class}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Roll Number</label>
                <div className="text-base text-gray-900">{currentStudent.rollNo}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">Academic Year</label>
                <div className="text-base text-gray-900">2024-2025</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-2">House</label>
                <div className="text-base text-gray-900">Blue House</div>
              </div>
            </div>
          </div>
        );
      case 'family':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Family Information</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Father Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Name</label>
                    <div className="text-base text-gray-900">{currentStudent.fatherName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Occupation</label>
                    <div className="text-base text-gray-900">Software Engineer</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Phone</label>
                    <div className="text-base text-gray-900">{currentStudent.phone}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Email</label>
                    <div className="text-base text-gray-900">{currentStudent.email}</div>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Mother Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Name</label>
                    <div className="text-base text-gray-900">Jennifer Johnson</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Occupation</label>
                    <div className="text-base text-gray-900">Teacher</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Phone</label>
                    <div className="text-base text-gray-900">+1 234-567-8999</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Email</label>
                    <div className="text-base text-gray-900">jennifer.j@email.com</div>
                  </div>
                </div>
              </div>
               <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Mother Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Name</label>
                    <div className="text-base text-gray-900">Jennifer Johnson</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Occupation</label>
                    <div className="text-base text-gray-900">Teacher</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Phone</label>
                    <div className="text-base text-gray-900">+1 234-567-8999</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Email</label>
                    <div className="text-base text-gray-900">jennifer.j@email.com</div>
                  </div>
                </div>
              </div>
               <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Mother Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Name</label>
                    <div className="text-base text-gray-900">Jennifer Johnson</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Occupation</label>
                    <div className="text-base text-gray-900">Teacher</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Phone</label>
                    <div className="text-base text-gray-900">+1 234-567-8999</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Email</label>
                    <div className="text-base text-gray-900">jennifer.j@email.com</div>
                  </div>
                </div>
              </div>
               <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Mother Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Name</label>
                    <div className="text-base text-gray-900">Jennifer Johnson</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Occupation</label>
                    <div className="text-base text-gray-900">Teacher</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Phone</label>
                    <div className="text-base text-gray-900">+1 234-567-8999</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Email</label>
                    <div className="text-base text-gray-900">jennifer.j@email.com</div>
                  </div>
                </div>
              </div>
               <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Mother Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Name</label>
                    <div className="text-base text-gray-900">Jennifer Johnson</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Occupation</label>
                    <div className="text-base text-gray-900">Teacher</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Phone</label>
                    <div className="text-base text-gray-900">+1 234-567-8999</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Email</label>
                    <div className="text-base text-gray-900">jennifer.j@email.com</div>
                  </div>
                </div>
              </div>
               <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Mother Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Name</label>
                    <div className="text-base text-gray-900">Jennifer Johnson</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Occupation</label>
                    <div className="text-base text-gray-900">Teacher</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Phone</label>
                    <div className="text-base text-gray-900">+1 234-567-8999</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-800 mb-1">Email</label>
                    <div className="text-base text-gray-900">jennifer.j@email.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{tabs.find(t => t.id === selectedTab)?.label}</h3>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <i className={`fas ${tabs.find(t => t.id === selectedTab)?.icon} text-6xl text-gray-300 mb-4`}></i>
              <p className="text-gray-500">Content for {tabs.find(t => t.id === selectedTab)?.label} will be displayed here.</p>
            </div>
          </div>
        );
    }
  };


  return (
    <div className={`${navbarType == "floating" ? "pl-8 pr-6" : ""}`}>

      <div className="flex relative flex-col lg:flex-row   w-[100%] sm:px-1 lg:px-2 px-0  bg-white dark:bg-cardBgDark ">
        {/* Left Sidebar - Student List */}
        <div className={`w-[100%] ${navbarType == "floating" ? "h-[92.3vh] top-24" : "h-[94vh]"} border-l-2  bg-white dark:bg-cardBgDark sticky   lg:w-1/5 border-r border-gray-200 flex flex-col `}>
          {/* Fixed Header with Filters */}
          <div className="p-4 border-b flex justify-between items-center border-gray-200 ">
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Students</h2>

            <div className='flex gap-1'>
              <span className='bg-blue-400 text-white p-1 rounded-md border'>
                <LuPlus size={18} />
              </span>
              <span className='bg-gray-100 p-1 rounded-md border'>
                <BsThreeDots size={18} />
              </span>
            </div>

          </div>

          {/* Scrollable Student List */}
          <div className="flex-1 overflow-y-auto scrollbar-hide ">
            <div className=" space-y-0">
              {currentStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`p-3  cursor-pointer transition-all ${selectedStudentId === student.id
                    ? 'bg-blue-50 dark:bg-cardBgDark border-l-4 border-l-blue-500  text-black'
                    : 'bg-white dark:bg-upperCardBgDark border border-gray-200 hover:bg-blue-50/40'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <img className='w-12 h-12 object-contain rounded-md' src={student.photo} alt="" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm">{student.name}</div>
                      <div className="text-xs text-gray-500">Class: {student.class}</div>
                      <div className="text-xs text-gray-500">Roll: {student.rollNo}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed Footer with Pagination */}
          <div className="px-2 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between ">
              <select
                className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <div className="flex gap-2 items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-800">Page {currentPage} of {totalPages}</span>

                <button
                  className="p-2 bg-gray-100 text-black rounded hover:bg-gray-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <MdKeyboardDoubleArrowLeft />
                </button>
                <button
                  className="p-2 bg-gray-100 text-black hover:bg-gray-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  <MdKeyboardDoubleArrowRight />
                </button>
              </div>
            </div>


          </div>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Fixed Header - Student Profile */}
          <div
            ref={headerRef}
            className={`sticky ${navbarType == "floating" ? "top-16" : "top-12"}  z-10 bg-white dark:bg-cardBgDark py-3 md:px-6 px-3 rounded-t-none shadow-lg rounded-xl flex md:flex-row flex-col justify-between items-center md:items-start gap-3 border-b border-gray-200 transition-all duration-200`}
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 w-[100%]">
              <div className="flex items-start gap-6 flex-1">
                <img className='w-24 h-24 object-contain rounded-md' src={currentStudent.photo} alt="" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{currentStudent.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-0 text-sm text-gray-600  dark:text-gray-400 mb-3">
                    <div>Father: {currentStudent.fatherName}</div>
                    <div>{currentStudent.email}</div>
                    <div>{currentStudent.phone}</div>

                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0 ">
                <div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-cardBgDark">
                    <option>2024-2025</option>
                    <option>2023-2024</option>
                  </select>
                </div>
                <button
                  className="flex items-center gap-1 text-blueBorder dark:text-orangeBorder ring-blueBorder dark:ring-orangeBorder ring-1 hover:ring-2  from-blue-400 dark:hover:from-[#DAA366]   font-medium rounded-lg text-sm px-3 py-2 text-center  "
                >
                  {width > breakpoints.sm ? "Report" : ""}
                  <HiDocumentReport />
                </button>
                <button
                  className="flex items-center gap-1  ring-gray-400 ring-1 hover:ring-2  from-blue-400 dark:hover:from-[#DAA366]    font-medium rounded-lg text-sm px-3 py-2 text-center  "
                >
                  {width > breakpoints.sm ? "Setting" : ""}
                  <FaCog className='text-gray-400 dark:text-white' />
                </button>


              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col lg:flex-row shadow-lg">
            {/* Tabs Sidebar */}
            <div
              className="w-[100%] lg:w-1/5 border-r border-gray-200  sticky "
              style={isLg ? { top: `${48 + headerHeight}px`, height: `calc(100vh - ${48 + headerHeight}px)` } : {}}
            >
              <div className="p-4 border-b flex justify-between items-center border-gray-200 ">
                <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 ">Navigations</h2>
              </div>
              <div className="p-2 flex-1 overflow-y-auto h-[90%] scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`w-[100%] text-left px-4 py-3 rounded-lg mb-1 transition-all flex items-center gap-3 ${selectedTab === tab.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-black'
                      }`}
                  >
                    {tab.icon}
                    {/* <i className={`fas ${tab.icon} w-5`}></i> */}
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Display */}
            <div className="flex-1 bg-white dark:bg-cardBgDark overflow-y-auto scrollbar-hide">
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default StudentOverview;
