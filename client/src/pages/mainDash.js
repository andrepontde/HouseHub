import React from 'react'
import SideNavBar from 'components/dashboard/layout/SideNav';
import TheMainNavBar from 'components/layout/MainNav';
import MemoCard from 'components/dashboard/MemoCard'; // Import MemoCard component

const DashBoard = () => {
    return (
        <>
         <TheMainNavBar/>
            <MemoCard />
        </>
    )

}
export default DashBoard;