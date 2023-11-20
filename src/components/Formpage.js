import React, { useState } from "react";
import UserData from "./UserData";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Formpage(props) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [gender, setGender] = useState("");
    let [age, setAge] = useState("");

    let handleadd = (e) => {
        e.preventDefault();
        addstudent(name, email, gender, age);
        setName("");
        setEmail("");
        setGender("");
        setAge("");
    };

    let addstudent = async (name, email, gender, age) => {
        if (name === "" || email === "" || gender === "" || age === "") {
            alert("empty fields are not allowed, kindly check !!!");
        }

        let response = await fetch(
            "http://localhost:5000/addstudent",
            {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": true,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    gender: gender,
                    age: age,
                }),
            }
        );
        let newstudent = await response.json();
        props.setStudents([...props.students, newstudent]);
    };

    return (
        <>
            <Container>
                <form onSubmit={handleadd}>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                        <Form.Control
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text id="basic-addon1">Email address</InputGroup.Text>
                        <Form.Control
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text id="basic-addon1">Gender</InputGroup.Text>
                        <Form.Control
                            aria-label="Gender"
                            aria-describedby="basic-addon1"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text id="basic-addon1">Age</InputGroup.Text>
                        <Form.Control
                            aria-label="Age"
                            aria-describedby="basic-addon1"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </InputGroup>
                    <div className="d-grid gap-1">
                        <Button className="addbtn" variant="secondary" size="sm" type="submit">ADD</Button>{' '}
                    </div>
                </form>
                <Container fluid="md" className="containerfluid">
                    <h2 className="text-center">Student Data</h2>
                    <UserData students={props.students} setStudents={props.setStudents} /></Container>
            </Container>
        </>
    );
}
export default Formpage;