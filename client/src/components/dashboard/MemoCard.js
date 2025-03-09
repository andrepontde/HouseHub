import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  CardHeader,
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

const MemoCard = () => {
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState({ title: "", content: "" }); // State for new memo
  const [showCreateForm, setShowCreateForm] = useState(false); // Show/hide create form
  const [editingMemo, setEditingMemo] = useState(null);
  const [showEditOptions, setShowEditOptions] = useState({});

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5001/api/memo/house/memos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMemos(response.data);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };
    fetchMemos();
  }, []);

  const handleToggleEditOptions = (memoId) => {
    setShowEditOptions((prev) => ({
      ...prev,
      [memoId]: !prev[memoId],
    }));
  };

  const handleEditClick = (memo) => {
    setEditingMemo(memo);
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5001/api/memo/${id}`, editingMemo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMemos(memos.map((m) => (m.memoID === id ? editingMemo : m)));
      setEditingMemo(null);
    } catch (error) {
      console.error("Error updating memo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/memo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMemos(memos.filter((m) => m.memoID !== id));
    } catch (error) {
      console.error("Error deleting memo:", error);
    }
  };

  const handleCreateMemo = async () => {
    if (!newMemo.title.trim() || !newMemo.content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5001/api/memo/create", newMemo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Add the new memo to the list and reset form
      setMemos([...memos, response.data]);
      setNewMemo({ title: "", content: "" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating memo:", error);
    }
  };

  return (
    <Container sx={{ maxWidth: "600px", margin: "auto", paddingTop: 4 }}>
      <Card
        sx={{
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fffae6",
          borderRadius: "12px",
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CardHeader
            title="📌 My Memos"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          />
          <IconButton color="secondary" onClick={() => setShowCreateForm(true)}>
            <AddIcon />
          </IconButton>
        </Box>

        {showCreateForm && (
          <Card sx={{ backgroundColor: "#fffbea", padding: 2, borderRadius: "10px", boxShadow: 2 }}>
            <CardContent>
              <TextField
                fullWidth
                label="Title"
                value={newMemo.title}
                onChange={(e) => setNewMemo({ ...newMemo, title: e.target.value })}
                sx={{ marginBottom: 1, backgroundColor: "#fff", borderRadius: "5px" }}
              />
              <TextField
                fullWidth
                label="Content"
                multiline
                rows={3}
                value={newMemo.content}
                onChange={(e) => setNewMemo({ ...newMemo, content: e.target.value })}
                sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  sx={{ marginRight: 1 }}
                  onClick={handleCreateMemo}
                >
                  Create
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {memos.length > 0 ? (
          memos.map((memo) => (
            <Card
              key={memo.memoID}
              sx={{
                backgroundColor: "#fffbcc",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                marginBottom: 2,
                padding: 2,
                position: "relative",
                transition: "0.3s ease-in-out",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent sx={{ position: "relative" }}>
                <IconButton
                  aria-label="edit"
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: 16,
                    color: "#6b6b6b",
                  }}
                  onClick={() => handleToggleEditOptions(memo.memoID)}
                >
                  <EditIcon />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {memo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {memo.content}
                </Typography>

                {showEditOptions[memo.memoID] && (
                  <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="primary" onClick={() => handleEditClick(memo)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(memo.memoID)}>
                      Delete
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography textAlign="center" fontStyle="italic">
            No memos available. Start adding notes!
          </Typography>
        )}
      </Card>
    </Container>
  );
};

export default MemoCard;
