// src/pages/ClassTimetable.jsx
import { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdOutlineFilterList } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useWidth from '../../Hooks/useWidth';

// Dummy data (later replace with API call)
const mockClasses = [
    { id: '1', name: 'Class 6' },
    { id: '2', name: 'Class 7' },
    { id: '3', name: 'Class 8' },
    { id: '4', name: 'Class 9' },
    { id: '5', name: 'Class 10' },
];

const mockSections = {
    '1': ['A', 'B', 'C'],
    '2': ['A', 'B'],
    '3': ['A', 'B', 'C', 'D'],
    '4': ['A', 'B', 'C'],
    '5': ['A', 'B'],
};

const mockTimetable = {
    '1-A': [
        // Monday
        [
            { subject: 'Mathematics', teacher: 'Mrs. Sharma', photo: 'https://i.pravatar.cc/48?u=teacher1' },
            { subject: 'English', teacher: 'Mr. Verma', photo: 'https://i.pravatar.cc/48?u=teacher2' },
            { subject: 'Science', teacher: 'Dr. Gupta', photo: 'https://i.pravatar.cc/48?u=teacher3' },
            { subject: 'Hindi', teacher: 'Ms. Patel', photo: 'https://i.pravatar.cc/48?u=teacher4' },
            { subject: 'Social Studies', teacher: 'Mr. Singh', photo: 'https://i.pravatar.cc/48?u=teacher5' },
            { subject: 'PT', teacher: 'Coach Raj', photo: 'https://i.pravatar.cc/48?u=teacher6' },
        ],
        // Tuesday
        [
            { subject: 'Science', teacher: 'Dr. Gupta', photo: 'https://i.pravatar.cc/48?u=teacher3' },
            { subject: 'Mathematics', teacher: 'Mrs. Sharma', photo: 'https://i.pravatar.cc/48?u=teacher1' },
            { subject: 'English', teacher: 'Mr. Verma', photo: 'https://i.pravatar.cc/48?u=teacher2' },
            { subject: 'Computer', teacher: 'Ms. Kaur', photo: 'https://i.pravatar.cc/48?u=teacher7' },
            { subject: 'Hindi', teacher: 'Ms. Patel', photo: 'https://i.pravatar.cc/48?u=teacher4' },
            { subject: 'Library', teacher: 'Ms. Joshi', photo: 'https://i.pravatar.cc/48?u=teacher8' },
        ],
        // Wednesday → Saturday (you can extend similarly)
        [...Array(6)].map(() => ({ subject: 'TBD', teacher: '-', photo: '' })),
        [...Array(6)].map(() => ({ subject: 'TBD', teacher: '-', photo: '' })),
        [...Array(6)].map(() => ({ subject: 'TBD', teacher: '-', photo: '' })),
        [...Array(6)].map(() => ({ subject: 'TBD', teacher: '-', photo: '' })),
    ],
    // You can add more class-section combinations
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ClassTimetable = () => {
    const navigate = useNavigate();
    const { width, breakpoints } = useWidth();

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [sections, setSections] = useState([]);
    const [timetable, setTimetable] = useState([]);

    // Simulate fetching sections when class changes
    useEffect(() => {
        if (selectedClass) {
            setSections(mockSections[selectedClass] || []);
            setSelectedSection('');
            setTimetable([]);
        }
    }, [selectedClass]);

    // Load timetable when both class & section are selected
    useEffect(() => {
        if (selectedClass && selectedSection) {
            const key = `${selectedClass}-${selectedSection}`;
            setTimetable(mockTimetable[key] || []);
        } else {
            setTimetable([]);
        }
    }, [selectedClass, selectedSection]);

    return (

        <div className="bg-white xl:max-w-7xl w-[100%] min-h-[90vh] mx-auto  mt-4 rounded-xl  px-0 ">


            {/* Filters */}
            <div className="   border-b-2 md:p-4 p-0 mb-4 lg:px-2">

                <div className="mb-4 flex items-center justify-between flex-wrap gap-4">

                    <div className="flex items-center   ">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ease-in-out"
                        >
                            <IoIosArrowRoundBack size={40} />
                        </button>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Class Timetable</h2>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                                                                  
                        <button
                            className="flex items-center gap-1 text-blueBorder dark:text-orangeBorder ring-blueBorder dark:ring-orangeBorder ring-1 hover:ring-2  from-blue-400 dark:hover:from-[#DAA366]   font-medium rounded-lg text-sm px-3 py-2 text-center  "
                        >
                            {width > breakpoints.sm ? "Report" : ""}
                            <HiDocumentReport />
                        </button>
                        <button
                            onClick={() => settingToggleFunction(!settingToggleValue)}
                            className="flex items-center gap-1  ring-gray-400 ring-1 hover:ring-2  from-blue-400 dark:hover:from-[#DAA366]    font-medium rounded-lg text-sm px-3 py-2 text-center  "
                        >
                            {width > breakpoints.sm ? "Setting" : ""}
                            <FaCog className='text-gray-400 dark:text-white' />
                        </button>
                    </div>


                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-2 py-2 ">
                    <div>
                        <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                            Class
                        </label>
                        <select
                            id="class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            // className="mt-1 block w-[100%] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3"
                            className='input-base'
                        >
                            <option value="">Select Class</option>
                            {mockClasses.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                            Section
                        </label>
                        <select
                            id="section"
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                            disabled={!selectedClass}
                            className='input-base'

                        // className="mt-1 block w-[100%] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Section</option>
                            {sections.map((sec) => (
                                <option key={sec} value={sec}>
                                    {sec}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Timetable Table */}
            {/* {selectedClass && selectedSection ? (
                timetable.length > 0 ? (
                    <div className=" border-2 rounded-lg overflow-hidden md:m-4 m-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-[100%] divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-32"
                                        >
                                            Day
                                        </th>
                                        {Array.from({ length: 6 }, (_, i) => (
                                            <th
                                                key={i}
                                                scope="col"
                                                className="px-4 py-4 text-center text-sm font-semibold text-gray-900"
                                            >
                                                Period {i + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {days.map((day, dayIndex) => (
                                        <tr key={day} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                                {day}
                                            </td>
                                            {timetable[dayIndex]?.map((slot, periodIndex) => (
                                                <td
                                                    key={`${day}-${periodIndex}`}
                                                    className="px-4 py-4 text-sm text-gray-700"
                                                >
                                                    {slot.teacher !== '-' ? (
                                                        <div className="flex items-center space-x-3">
                                                            <img
                                                                src={slot.photo}
                                                                alt={slot.teacher}
                                                                className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200 flex-shrink-0"
                                                            />
                                                            <div>
                                                                <div className="font-medium text-gray-900">{slot.teacher}</div>
                                                                <div className="text-gray-500 text-xs">{slot.subject}</div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">—</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="border-2  rounded-lg p-12 text-center md:m-4 m-4">
                        <p className="text-gray-500 text-lg">No timetable available for this class-section yet.</p>
                    </div>
                )
            ) : (
                <div className=" border-2 rounded-lg p-12 text-center md:m-4 m-4">
                    <p className="text-gray-600 text-lg">
                        Please select a <span className="font-semibold">class</span> and{' '}
                        <span className="font-semibold">section</span> to view the timetable.
                    </p>
                </div>
            )} */}



            {/* Timetable Table */}
{selectedClass && selectedSection ? (
  timetable.length > 0 ? (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm md:mx-4 mx-4 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="border-r border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-900 w-32 bg-gray-50"
              >
                Day
              </th>
              {Array.from({ length: 6 }, (_, i) => (
                <th
                  key={i}
                  scope="col"
                  className="border-r border-gray-300 px-4 py-4 text-center text-sm font-semibold text-gray-900 last:border-r-0"
                >
                  Period {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {days.map((day, dayIndex) => (
              <tr key={day} className="hover:bg-gray-50 transition-colors">
                <td className="border-r border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                  {day}
                </td>
                {timetable[dayIndex]?.map((slot, periodIndex) => (
                  <td
                    key={`${day}-${periodIndex}`}
                    className="border-r border-gray-200 px-4 py-5 text-sm text-gray-700 last:border-r-0"
                  >
                    {slot.teacher !== '-' ? (
                      <div className="flex items-center space-x-3">
                        <img
                          src={slot.photo}
                          alt={slot.teacher}
                          className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{slot.teacher}</div>
                          <div className="text-gray-600 text-xs mt-0.5">{slot.subject}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400  text-sm">Click here to assign</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="border border-gray-300 rounded-lg p-12 text-center md:mx-4 mx-4 bg-white">
      <p className="text-gray-500 text-lg">No timetable available for this class-section yet.</p>
    </div>
  )
) : (
  <div className="border border-gray-300 rounded-lg p-12 text-center md:mx-4 mx-4 bg-white">
    <p className="text-gray-600 text-lg">
      Please select a <span className="font-semibold">class</span> and{' '}
      <span className="font-semibold">section</span> to view the timetable.
    </p>
  </div>
)}




        </div>
    );
};

export default ClassTimetable;