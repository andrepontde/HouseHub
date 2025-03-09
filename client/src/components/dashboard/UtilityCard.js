import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
  Button,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const UtilityCard = () => {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({ title: "", desc: "", dueDate: "", amount: "" });
  const [editingBill, setEditingBill] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/bills/house", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  const handleCreateBill = async () => {
    if (!newBill.title.trim() || !newBill.amount) {
      alert("Title and amount are required!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5001/api/bills/create", newBill, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBills([...bills, response.data]);
      setNewBill({ title: "", desc: "", dueDate: "", amount: "" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };

  const handleDeleteBill = async (billID) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/bills/delete/${billID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBills(bills.filter((b) => b._id !== billID));
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  return (
    <Container sx={{ maxWidth: "600px", margin: "auto", paddingTop: 4 }}>
      <Card sx={{ boxShadow: 3, backgroundColor: "#f9f9f9", borderRadius: "12px", padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">💰 Bill Management</Typography>
          <IconButton color="primary" onClick={() => setShowCreateForm(true)}>
            <AddIcon />
          </IconButton>
        </Box>

        {showCreateForm && (
          <Box sx={{ padding: 2 }}>
            <TextField fullWidth label="Title" value={newBill.title} onChange={(e) => setNewBill({ ...newBill, title: e.target.value })} sx={{ marginBottom: 1 }} />
            <TextField fullWidth label="Description" value={newBill.desc} onChange={(e) => setNewBill({ ...newBill, desc: e.target.value })} sx={{ marginBottom: 1 }} />
            <TextField fullWidth  type="date" value={newBill.dueDate} onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })} sx={{ marginBottom: 1 }} />
            <TextField fullWidth label="Amount" type="number" value={newBill.amount} onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })} sx={{ marginBottom: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" onClick={handleCreateBill} startIcon={<SaveIcon />}>Create</Button>
              <Button variant="contained" color="error" onClick={() => setShowCreateForm(false)} startIcon={<CancelIcon />}>Cancel</Button>
            </Box>
          </Box>
        )}

        {bills.length > 0 ? (
          bills.map((bill) => (
            <Card key={bill._id} sx={{ marginTop: 2, padding: 2, borderRadius: "10px", boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6">{bill.title}</Typography>
                <Typography variant="body2">{bill.desc}</Typography>
                <Typography variant="subtitle2">Due Date: {bill.dueDate}</Typography>
                <Typography variant="subtitle1">Amount: ${bill.amount}</Typography>
                <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                  <Button variant="contained" color="error" onClick={() => handleDeleteBill(bill._id)} startIcon={<DeleteIcon />}>Delete</Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography textAlign="center" fontStyle="italic">No bills found.</Typography>
        )}
      </Card>
    </Container>
  );
};

export default UtilityCard;