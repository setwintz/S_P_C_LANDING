import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FaBell, FaUser, FaGraduationCap, FaDollarSign, FaCalendarAlt, FaChartBar } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Mock data for demonstration (In real app, fetch from API)
const mockData = {
    totalStudents: 1200,
    totalTeachers: 80,
    totalStaff: 50,
    pendingFees: 15000,
    attendanceToday: 95,
    upcomingEvents: [
        { id: 1, title: 'Parent-Teacher Meeting', date: '2025-12-20' },
        { id: 2, title: 'School Holiday', date: '2025-12-25' },
    ],
    recentNotifications: [
        { id: 1, message: 'New student admission: John Doe' },
        { id: 2, message: 'Fee reminder sent to 10 parents' },
    ],
    enrollmentChart: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Enrollments',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    },
    attendanceChart: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Attendance %',
                data: [92, 95, 93, 96, 94],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    },
    gradeDistribution: {
        labels: ['A', 'B', 'C', 'D', 'F'],
        datasets: [
            {
                data: [300, 500, 400, 200, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    },
};

const Dashboard = () => {
    const [theme, setTheme] = useState('light');

    //   useEffect(() => {
    //     // Check for user's preferred theme or system preference
    //     if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //       setTheme('dark');
    //       document.documentElement.classList.add('dark');
    //     } else {
    //       setTheme('light');
    //       document.documentElement.classList.remove('dark');
    //     }
    //   }, []);

    //   const toggleTheme = () => {
    //     if (theme === 'light') {
    //       setTheme('dark');
    //       localStorage.theme = 'dark';
    //       document.documentElement.classList.add('dark');
    //     } else {
    //       setTheme('light');
    //       localStorage.theme = 'light';
    //       document.documentElement.classList.remove('dark');
    //     }
    //   };

    return (
        <div className=" mx-auto md:p-4 p-0 mb-10 sm:px-6 lg:px-2 px-0  min-h-screen  text-gray-900 dark:text-gray-100">
            {/* Main Content */}
            <main className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Key Metrics Cards */}
                <div className="bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <span className='bg-blue-400/50 border border-gray-300  shadow-md rounded-lg p-1 mr-2'>
                            <FaGraduationCap className="h-8 w-8 text-blue-500 " />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold">Total Students</h2>
                            <p className="text-2xl">{mockData.totalStudents}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <span className='bg-green-400/50 border border-gray-300  shadow-md rounded-lg p-2 mr-2'>
                            <FaUser className="h-6 w-6 text-green-500" />
                        </span>

                        <div>
                            <h2 className="text-lg font-semibold">Total Teachers</h2>
                            <p className="text-2xl">{mockData.totalTeachers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <span className='bg-yellow-400/30 border border-gray-300  shadow-md rounded-lg p-2 mr-2'>
                            <FaUser className="h-6 w-6 text-yellow-500" />
                        </span>                        <div>
                            <h2 className="text-lg font-semibold">Total Staff</h2>
                            <p className="text-2xl">{mockData.totalStaff}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <span className='bg-red-400/30 border border-gray-300  shadow-md rounded-lg p-2 mr-2'>
                            <FaDollarSign className="h-6 w-6 text-red-500" />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold">Pending Fees</h2>
                            <p className="text-2xl">${mockData.pendingFees}</p>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="md:col-span-2 lg:col-span-2 bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Enrollment Trends</h2>
                    <Bar data={mockData.enrollmentChart} options={{ responsive: true }} />
                </div>
                <div className="md:col-span-2 lg:col-span-2 bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Weekly Attendance</h2>
                    <Line data={mockData.attendanceChart} options={{ responsive: true }} />
                </div>
                <div className="md:col-span-2 bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Grade Distribution</h2>
                    <Pie data={mockData.gradeDistribution} options={{ responsive: true }} />
                </div>

                {/* Upcoming Events */}
                <div className="bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                        <FaCalendarAlt className="h-6 w-6 mr-2" />
                        Upcoming Events
                    </h2>
                    <ul>
                        {mockData.upcomingEvents.map(event => (
                            <li key={event.id} className="mb-2">
                                {event.title} - {event.date}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                        <FaBell className="h-6 w-6 mr-2" />
                        Recent Notifications
                    </h2>
                    <ul>
                        {mockData.recentNotifications.map(notif => (
                            <li key={notif.id} className="mb-2">
                                {notif.message}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="md:col-span-2 bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                        <FaChartBar className="h-6 w-6 mr-2" />
                        Quick Links
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-blue-500 text-white p-2 rounded">Student Management</button>
                        <button className="bg-green-500 text-white p-2 rounded">Fee Collection</button>
                        <button className="bg-yellow-700 text-white p-2 rounded">Exam Results</button>
                        <button className="bg-red-500 text-white p-2 rounded">Staff Payroll</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;