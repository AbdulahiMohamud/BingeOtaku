import React, { useState } from "react";
import axios from "axios";

export default function Profile(loggedInUser) {
    const [message, setMessage] = useState("");
    const [updatedUser, setUpdatedUser] = useState({
        username: "",
        email: "",
        password: "",
        profileImageUrl: "",
    });
    const [editingField, setEditingField] = useState(null);

    const userJson = localStorage.getItem("loggedInUser");
    const user = JSON.parse(userJson);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_SPRING_SERVER}/user/update/${user.userId}`,
                updatedUser
            );
            setMessage(response.data.message);
            localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
            setEditingField(null); // Clear the editing state
        } catch (err) {
            setMessage("Error updating user profile", err.response.data.message);
        }
    };

    // Function to render input field when editingField matches the field name
    const renderInputField = (fieldName) => {
        return (
            <div>
                <input
                    type="text"
                    name={fieldName}
                    value={updatedUser[fieldName]}
                    onChange={handleInputChange}
                />
                <button type="button" onClick={() => setEditingField(null)}>
                    Cancel
                </button>
                <button type="submit">Save</button>
            </div>
        );
    };

    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-3xl font-semibold mb-4">Profile</h1>
                <form onSubmit={handleSubmit}>
                    <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-1 flex items-center justify-center">
                            <img
                                className="h-40 w-40 rounded-full object-cover"
                                src={user.profileImageUrl}
                                alt="Avatar"
                            />
                        </div>
                        <div className="col-span-2 space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold">Username</h2>
                                {editingField === "username" ? (
                                    renderInputField("username")
                                ) : (
                                    <>
                                        <span>{updatedUser.username}</span>
                                        <button
                                            type="button"
                                            onClick={() => setEditingField("username")}
                                        >
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Email</h2>
                                {editingField === "email" ? (
                                    renderInputField("email")
                                ) : (
                                    <>
                                        <span>{updatedUser.email}</span>
                                        <button
                                            type="button"
                                            onClick={() => setEditingField("email")}
                                        >
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                            {/* Add other fields for profile update */}
                            <div>
                                <h2 className="text-xl font-semibold">Password</h2>
                                {editingField === "password" ? (
                                    renderInputField("password")
                                ) : (
                                    <>
                                        <span>{updatedUser.password}</span>
                                        <button
                                            type="button"
                                            onClick={() => setEditingField("password")}
                                        >
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update Profile
                            </button>
                            <p>{message}</p>
                        </div>
                    </main>
                </form>
            </div>
        </div>
    );
}
