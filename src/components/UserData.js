import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function UserData(props) {
    const [editableId, setEditableId] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: "",
        email: "",
        gender: "",
        age: "",
    });

    let handleDelete = async (id) => {
        let response = await fetch(
            `http://localhost:5000/deletestudent/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Access-Control-Allow-Origin": true,
                    "Content-Type": "application/json",
                },
            }
        );
        await response.json();
        props.setStudents(
            props.students.filter((student) => {
                return student._id !== id;
            })
        );
    };

    const handleUpdate = async (id) => {
        const response = await fetch(
            `http://localhost:5000/updatestudent/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            }
        );

        const updatedStudent = await response.json();

        props.setStudents(
            props.students.map((student) => {
                if (student._id === id) {
                    return {
                        ...student,
                        name: updatedStudent.name,
                        email: updatedStudent.email,
                        gender: updatedStudent.gender,
                        age: updatedStudent.age,
                    };
                }
                return student;
            })
        );

        setEditableId(null);
        setUpdatedData({
            name: "",
            email: "",
            gender: "",
            age: "",
        });
    };

    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;
        setUpdatedData({
            ...updatedData,
            [fieldName]: value,
        });
    };

    return (
        <>
            <Container fluid>
                <Table striped bordered hover variant="dark" className="table">
                    {/* Table headers */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.students.map((student) => (
                            <tr key={student._id}>
                                <td>
                                    {editableId === student._id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={updatedData.name === "" ? student.name : updatedData.name}
                                            onChange={(e) => handleInputChange(e, "name")}
                                        />
                                    ) : (
                                        student.name
                                    )}
                                </td>
                                <td>
                                    {editableId === student._id ? (
                                        <input
                                            type="text"
                                            email="email"
                                            value={updatedData.email === "" ? student.email : updatedData.email}
                                            onChange={(e) => handleInputChange(e, "email")}
                                        />
                                    ) : (
                                        student.email
                                    )}
                                </td>

                                <td>
                                    {editableId === student._id ? (
                                        <input
                                            type="text"
                                            gender="gender"
                                            value={updatedData.gender === "" ? student.gender : updatedData.gender}
                                            onChange={(e) => handleInputChange(e, "gender")}
                                        />
                                    ) : (
                                        student.gender
                                    )}
                                </td>

                                <td>
                                    {editableId === student._id ? (
                                        <input
                                            type="text"
                                            age="age"
                                            value={updatedData.age === "" ? student.age : updatedData.age}
                                            onChange={(e) => handleInputChange(e, "age")}
                                        />
                                    ) : (
                                        student.age
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="secondary" size="sm"
                                        onClick={() => {
                                            if (editableId === student._id) {
                                                handleUpdate(student._id);
                                            }
                                            setEditableId(
                                                editableId === student._id
                                                    ? null
                                                    : student._id
                                            );
                                        }}
                                    >
                                        {editableId === student._id ? "Save" : "Edit"}
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="danger" size="sm"
                                        onClick={() => handleDelete(student._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
export default UserData;