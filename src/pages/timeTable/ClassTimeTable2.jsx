import React, { useState } from 'react';

// Dummy data for classes, sections, and timetables
const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D'];

// Dummy timetables: Keyed by 'Class-Section', e.g., '1-A'
// Each timetable is an array of days, each day has periods array
// In real world, this would be fetched from backend via API (e.g., using fetch or axios)
const dummyTimetables = {
  '1-A': [
    {
      day: 'Monday',
      periods: [
        { teacher: 'John Doe', photo: 'https://via.placeholder.com/40?text=JD', subject: 'Math' },
        { teacher: 'Jane Smith', photo: 'https://via.placeholder.com/40?text=JS', subject: 'English' },
        { teacher: 'Alice Johnson', photo: 'https://via.placeholder.com/40?text=AJ', subject: 'Science' },
        { teacher: 'Bob Brown', photo: 'https://via.placeholder.com/40?text=BB', subject: 'History' },
        { teacher: 'Charlie Davis', photo: 'https://via.placeholder.com/40?text=CD', subject: 'Geography' },
        { teacher: 'Dana Evans', photo: 'https://via.placeholder.com/40?text=DE', subject: 'Art' },
      ],
    },
    {
      day: 'Tuesday',
      periods: [
        { teacher: 'Jane Smith', photo: 'https://via.placeholder.com/40?text=JS', subject: 'English' },
        { teacher: 'John Doe', photo: 'https://via.placeholder.com/40?text=JD', subject: 'Math' },
        { teacher: 'Bob Brown', photo: 'https://via.placeholder.com/40?text=BB', subject: 'History' },
        { teacher: 'Alice Johnson', photo: 'https://via.placeholder.com/40?text=AJ', subject: 'Science' },
        { teacher: 'Dana Evans', photo: 'https://via.placeholder.com/40?text=DE', subject: 'Art' },
        { teacher: 'Charlie Davis', photo: 'https://via.placeholder.com/40?text=CD', subject: 'Geography' },
      ],
    },
    {
      day: 'Wednesday',
      periods: [
        { teacher: 'Alice Johnson', photo: 'https://via.placeholder.com/40?text=AJ', subject: 'Science' },
        { teacher: 'Bob Brown', photo: 'https://via.placeholder.com/40?text=BB', subject: 'History' },
        { teacher: 'John Doe', photo: 'https://via.placeholder.com/40?text=JD', subject: 'Math' },
        { teacher: 'Jane Smith', photo: 'https://via.placeholder.com/40?text=JS', subject: 'English' },
        { teacher: 'Charlie Davis', photo: 'https://via.placeholder.com/40?text=CD', subject: 'Geography' },
        { teacher: 'Dana Evans', photo: 'https://via.placeholder.com/40?text=DE', subject: 'Art' },
      ],
    },
    {
      day: 'Thursday',
      periods: [
        { teacher: 'Bob Brown', photo: 'https://via.placeholder.com/40?text=BB', subject: 'History' },
        { teacher: 'Alice Johnson', photo: 'https://via.placeholder.com/40?text=AJ', subject: 'Science' },
        { teacher: 'Jane Smith', photo: 'https://via.placeholder.com/40?text=JS', subject: 'English' },
        { teacher: 'John Doe', photo: 'https://via.placeholder.com/40?text=JD', subject: 'Math' },
        { teacher: 'Dana Evans', photo: 'https://via.placeholder.com/40?text=DE', subject: 'Art' },
        { teacher: 'Charlie Davis', photo: 'https://via.placeholder.com/40?text=CD', subject: 'Geography' },
      ],
    },
    {
      day: 'Friday',
      periods: [
        { teacher: 'Charlie Davis', photo: 'https://via.placeholder.com/40?text=CD', subject: 'Geography' },
        { teacher: 'Dana Evans', photo: 'https://via.placeholder.com/40?text=DE', subject: 'Art' },
        { teacher: 'John Doe', photo: 'https://via.placeholder.com/40?text=JD', subject: 'Math' },
        { teacher: 'Jane Smith', photo: 'https://via.placeholder.com/40?text=JS', subject: 'English' },
        { teacher: 'Alice Johnson', photo: 'https://via.placeholder.com/40?text=AJ', subject: 'Science' },
        { teacher: 'Bob Brown', photo: 'https://via.placeholder.com/40?text=BB', subject: 'History' },
      ],
    },
    {
      day: 'Saturday',
      periods: [
        { teacher: 'Dana Evans', photo: 'https://via.placeholder.com/40?text=DE', subject: 'Art' },
        { teacher: 'Charlie Davis', photo: 'https://via.placeholder.com/40?text=CD', subject: 'Geography' },
        { teacher: 'Bob Brown', photo: 'https://via.placeholder.com/40?text=BB', subject: 'History' },
        { teacher: 'Alice Johnson', photo: 'https://via.placeholder.com/40?text=AJ', subject: 'Science' },
        { teacher: 'Jane Smith', photo: 'https://via.placeholder.com/40?text=JS', subject: 'English' },
        { teacher: 'John Doe', photo: 'https://via.placeholder.com/40?text=JD', subject: 'Math' },
      ],
    },
  ],
  // Add more class-section combos as needed, e.g., '2-B': [...]
};

const ClassTimetable2 = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectionChange = () => {
    if (selectedClass && selectedSection) {
      setLoading(true);
      setError('');
      setTimetable(null);

      // Simulate backend fetch with setTimeout for real-world async feel
      // In production, replace with actual API call: e.g., fetch(`/api/timetable?class=${selectedClass}&section=${selectedSection}`)
      setTimeout(() => {
        const key = `${selectedClass}-${selectedSection}`;
        const data = dummyTimetables[key];
        if (data) {
          setTimetable(data);
        } else {
          setError('No timetable found for the selected class and section.');
        }
        setLoading(false);
      }, 500); // Simulated delay
    }
  };

  // Trigger fetch on class or section change (debounce if needed in production)
  React.useEffect(() => {
    handleSelectionChange();
  }, [selectedClass, selectedSection]);

  return (
    <div className="min-h-screen  p-6">
      <div className="w-[100%] mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Class Timetable</h1>

        {/* Selection Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Class
            </label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-[100%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Choose Class --</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="section-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Section
            </label>
            <select
              id="section-select"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-[100%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Choose Section --</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  Section {sec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading/Error States */}
        {loading && <p className="text-center text-blue-600">Loading timetable...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Timetable Table */}
        {timetable && (
          <div className="overflow-x-auto">
            <table className="min-w-[100%] bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">Days</th>
                  {Array.from({ length: 6 }, (_, i) => i + 1).map((period) => (
                    <th
                      key={period}
                      className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
                    >
                      Period-{period}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map((dayData, dayIndex) => (
                  <tr key={dayData.day} className={dayIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200 font-medium">{dayData.day}</td>
                    {dayData.periods.map((period, periodIndex) => (
                      <td
                        key={periodIndex}
                        className="px-4 py-2 text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={period.photo}
                            alt={`${period.teacher}'s profile`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold">{period.teacher}</p>
                            <p className="text-gray-500">{period.subject}</p>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassTimetable2;