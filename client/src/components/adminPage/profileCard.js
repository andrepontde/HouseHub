import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import defaultLogo from "assets/blank-profile-picture-973460_640.png";
import axios from "axios";

const ProfileCard = () => {
  const [user, setUser] = useState(null); // State for user details
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({}); // State for form data
  const [selectedImage, setSelectedImage] = useState(null); // state for image

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5001/api/user/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
        setFormData({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          age: response.data.user.age,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  // Handle saving the updated user details
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      console.log("Uploading image:", selectedImage);
      const response = await axios.put(
        // Use the new endpoint
        `http://localhost:5001/api/user/user/updateFields/${user.username}`,
        formData, // Send only the fields being updated
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update response:", response.data); // Log the response for debugging
      setUser({ ...user, ...formData }); // Update local state with the new data
      setEditMode(false);

      if (selectedImage) {
        const imageForm = new FormData();
        imageForm.append("profileImage", selectedImage);

        try {
          await axios.post(
            `http://localhost:5001/api/user/user/uploadProfileImage/${user.userID}`,
            imageForm,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Image uploaded successfully");
        } catch (imageError) {
          console.error("Image upload failed:", imageError);

          alert("Profile updated, but image upload failed.");
        }
      }
    } catch (error) {
      console.error(
        "Error updating user details:",
        error.response?.data || error.message
      ); // Log detailed error
      alert(
        `Failed to update user: ${
          error.response?.data?.message || error.message
        }`
      ); // Show error to the user
    }
  };

  if (!user) {
    return <Typography>No user </Typography>;
  }

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "90%",
        margin: "20px auto",
        padding: "20px",
        boxShadow: 3,
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          color="primary"
          mb={3}
          textAlign="center"
          fontWeight="bold"
        >
          Profile
        </Typography>
        {editMode ? (
          <Box component="form" noValidate autoComplete="off">
            <Box sx={{ display: "flex" }}>
              <label htmlFor="profileImageUpload">
                <input
                  accept="image/*"
                  id="profileImageUpload"
                  type="file"
                  style={{ display: "none" }}
                  name="profileImage"
                  onChange={handleImageChange}
                />
                <Avatar
                  alt="User Avatar"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : user.profileImage
                      ? `http://localhost:5001/uploads/${user.profileImage}`
                      : defaultLogo
                  }
                  sx={{ height: 80, width: 80, cursor: "pointer" }}
                />
              </label>
            </Box>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ px: 4 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditMode(false)}
                sx={{ px: 4 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              alt="User Avatar"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : user.profileImage
                  ? `http://localhost:5001/uploads/${user.profileImage}`
                  : defaultLogo
              }
              sx={{ height: 80, width: 80, cursor: "pointer" }}
            />
            <Typography variant="body1" mb={1}>
              <strong>First Name:</strong> {user.firstName}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" mb={3}>
              <strong>Age:</strong> {user.age}
            </Typography>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditMode(true)}
                sx={{ px: 4 }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
