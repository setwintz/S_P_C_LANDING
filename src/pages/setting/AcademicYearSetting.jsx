import React from 'react'
import { Link } from 'react-router-dom'

function AcademicYearSetting() {
    return (
        <div className="max-w-7xl mx-auto mt-8 mb-10 px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb" className="mb-6">
                <ol className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <li>
                        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ease-in-out">
                            Home
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ease-in-out">
                            System
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li aria-current="page" className="text-gray-700 dark:text-gray-300">
                        Settings
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li aria-current="page" className="text-gray-700 dark:text-gray-300">
                        Academic Year
                    </li>
                </ol>
            </nav>

        </div>
    )
}

export default AcademicYearSetting