import { SidebarMenuNav, SidebarMenuNavIcon, SidebarMenuNavTitle } from 'react-bootstrap-sidebar-menu';

export const NavSideBar = () => {
    return(
        <>
        <SidebarMenuNav>
            <SidebarMenuNavTitle>Hello this is the Navbar title</SidebarMenuNavTitle>
            <SidebarMenuNavIcon>dash</SidebarMenuNavIcon>
            <SidebarMenuNavIcon>dash</SidebarMenuNavIcon>
            <SidebarMenuNavIcon>dashj</SidebarMenuNavIcon>
        </SidebarMenuNav>
        </>
    );
}