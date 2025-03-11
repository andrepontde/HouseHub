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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const UtilityCard = () => {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({ title: "", desc: "", dueDate: "", amount: "" });
  const [billImage, setBillImage] = useState(null);

  const [payment, setPayment] = useState({ amount: "", imageReceipt: null }); // ✅ Store payment receipt

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState({}); // ✅ Tracks which bill's options are visible

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

  const handleToggleEditOptions = (billID) => {
    setShowEditOptions((prev) => ({
      ...prev,
      [billID]: !prev[billID],
    }));
  };

  const handleCreateBill = async () => {
    if (!newBill.title.trim() || !newBill.amount) {
      alert("Title and amount are required!");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", newBill.title);
      formData.append("desc", newBill.desc);
      formData.append("dueDate", newBill.dueDate);
      formData.append("amount", newBill.amount);
      if (billImage) formData.append("billImage", billImage); // ✅ Attach bill image if available

      const response = await axios.post("http://localhost:5001/api/bills/create", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setBills([...bills, response.data]);
      setNewBill({ title: "", desc: "", dueDate: "", amount: "" });
      setBillImage(null);
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
            <TextField
              fullWidth
              label="Title"
              value={newBill.title}
              onChange={(e) => setNewBill({ ...newBill, title: e.target.value })}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={newBill.desc}
              onChange={(e) => setNewBill({ ...newBill, desc: e.target.value })}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              fullWidth
              type="date"
              value={newBill.dueDate}
              onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newBill.amount}
              onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
              sx={{ marginBottom: 1 }}
            />

            {/* ✅ Bill Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBillImage(e.target.files[0])}
              style={{ marginBottom: "10px" }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" onClick={handleCreateBill} startIcon={<SaveIcon />}>
                Create
              </Button>
              <Button variant="contained" color="error" onClick={() => setShowCreateForm(false)} startIcon={<CancelIcon />}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}

        {bills.length > 0 ? (
          bills.map((bill) => (

            <Card key={bill._id} sx={{ marginTop: 2, padding: 2, borderRadius: "10px", boxShadow: 1 }}>
              <CardContent>
              <IconButton sx={{ ml:"auto",
              right: 16,
              top: 16 , color:"black"}} onClick={() => handleToggleEditOptions(bill._id)}>
                  <MoreVertIcon />
                </IconButton>
                <Typography variant="h6">{bill.title}</Typography>
                <Typography variant="body2">{bill.desc}</Typography>
                <Typography variant="subtitle2">Due Date: {bill.dueDate}</Typography>
                <Typography variant="subtitle1">Amount: ${bill.amount}</Typography>




                {showEditOptions[bill._id] && (
                  <>
                    {showPaymentForm && (
                      <Box>
                        <TextField
                          fullWidth
                          label="Amount"
                          type="number"
                          value={payment.amount}
                          onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
                          sx={{ marginBottom: 1 }}
                        />

                        {/* ✅ Payment Receipt Upload */}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPayment({ ...payment, imageReceipt: e.target.files[0] })}
                          style={{ marginBottom: "10px" }}
                        />
                      </Box>
                    )}

                    <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                      <Button variant="contained" color="primary" onClick={() => setShowPaymentForm(true)} startIcon={<SaveIcon />}>
                        Confirm Payment
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDeleteBill(bill._id)} startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography textAlign="center" fontStyle="italic">
            No bills found.
          </Typography>
        )}
      </Card>
    </Container>
  );
};

export default UtilityCard;
