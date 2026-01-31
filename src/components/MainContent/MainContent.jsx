import React, { Suspense, useEffect } from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import Loading from '../Loading/Loading'
import LoadingTwo from '../Loading/LoadingTwo'
import useWidth from '../../Hooks/useWidth'

const MainContent = ({ isCollapsed, setIsCollapsed, toggleSidebar }) => {

  const { width, breakpoints } = useWidth();




  return (
    <div className='w-[100%] '>

      <Suspense fallback={<LoadingTwo />}>
        <Outlet />
      </Suspense>

    </div>
  )
}

export default MainContent


function InnerLoading() {
  return (
    <div className='flex w-[100%] h-full flex-col justify-center items-center'>
      <p className='text-white'>Loading...</p>
    </div>
  )
}