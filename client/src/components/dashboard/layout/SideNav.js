import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, Note, Build, CalendarToday } from "@mui/icons-material";

const SideNavBar = () => {
    return (
        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
            <List>
                <ListItemButton component={Link} to="/dashboard">
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton component={Link} to="/memos">
                    <ListItemIcon>
                        <Note />
                    </ListItemIcon>
                    <ListItemText primary="Memos" />
                </ListItemButton>

                <ListItemButton component={Link} to="/utility">
                    <ListItemIcon>
                        <Build />
                    </ListItemIcon>
                    <ListItemText primary="Utility" />
                </ListItemButton>

                <ListItemButton component={Link} to="/calendar">
                    <ListItemIcon>
                        <CalendarToday />
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default SideNavBar;
