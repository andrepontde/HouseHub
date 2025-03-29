import {Button,Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardButton = ()=> {
const navigate = useNavigate();
const navigateDashboard = () =>{
    navigate("/dashboard");

}
   return(
    <Box sx={{ display: "flex", justifyContent: "flex-end", color: '#FAFAFA'}}>
              <Button
                variant="contained"
                color="primary"
                onClick={navigateDashboard}
              >
                Go to dashboard
              </Button>
              </Box>
)}
export default DashboardButton;