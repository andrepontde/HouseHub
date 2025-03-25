import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	Container,
	CardHeader,
	IconButton,
	Button,
	Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const ToDoCard = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState({ content: "", dueDate: "" });
	const [showCreateForm, setShowCreateForm] = useState(false);

	useEffect(() => {
		const fetchToDos = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(
					"http://localhost:5001/api/todolist/house",
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setTodos(response.data);
			} catch (error) {
				console.error("Error fetching to-dos:", error);
			}
		};
		fetchToDos();
	}, []);

	const handleCreateTodo = async () => {
		if (!newTodo.content.trim() || !newTodo.dueDate.trim()) {
			alert("Content and due date cannot be empty!");
			return;
		}

		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				"http://localhost:5001/api/todolist/todolists",
				newTodo,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			setTodos([...todos, response.data]);
			setNewTodo({ content: "", dueDate: "" });
			setShowCreateForm(false);
		} catch (error) {
			console.error("Error creating to-do:", error);
		}
	};

	const handleDelete = async (taskID) => {
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`http://localhost:5001/api/todolist/${taskID}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setTodos(todos.filter((todo) => todo.taskID !== taskID));
		} catch (error) {
			console.error("Error deleting to-do:", error);
		}
	};

	return (
		<Container sx={{ maxWidth: "600px", margin: "auto", paddingTop: 4 }}>
			<Card
				sx={{
					boxShadow: 3,
					display: "flex",
					flexDirection: "column",
					padding: 2,
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<CardHeader
						title="To-Do List"
						sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
					/>
					<IconButton color="secondary" onClick={() => setShowCreateForm(true)}>
						<AddIcon />
					</IconButton>
				</Box>

				{showCreateForm && (
					<Card sx={{ mb: 2 }}>
						<CardContent>
							<TextField
								fullWidth
								label="Content"
								value={newTodo.content}
								onChange={(e) =>
									setNewTodo({ ...newTodo, content: e.target.value })
								}
								sx={{ marginBottom: 1 }}
							/>
							<TextField
								fullWidth
								label="Due Date"
								type="date"
								InputLabelProps={{ shrink: true }}
								value={newTodo.dueDate}
								onChange={(e) =>
									setNewTodo({ ...newTodo, dueDate: e.target.value })
								}
							/>
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
									marginTop: 2,
								}}
							>
								<Button
									variant="contained"
									color="primary"
									startIcon={<SaveIcon />}
									sx={{ marginRight: 1 }}
									onClick={handleCreateTodo}
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

				{todos.length > 0 ? (
					todos.map((todo) => (
						<Card key={todo.taskID} sx={{ mb: 2 }}>
							<CardContent>
								<Typography variant="h6" sx={{ fontWeight: "bold" }}>
									{todo.content}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Due Date: {new Date(todo.dueDate).toLocaleDateString()}
								</Typography>
								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-end",
										mt: 2,
									}}
								>
									<Button
										variant="contained"
										color="error"
										startIcon={<DeleteIcon />}
										onClick={() => handleDelete(todo.taskID)}
									>
										Delete
									</Button>
								</Box>
							</CardContent>
						</Card>
					))
				) : (
					<Typography textAlign="center" fontStyle="italic">
						No to-do items available. Start adding tasks!
					</Typography>
				)}
			</Card>
		</Container>
	);
};

export default ToDoCard;
