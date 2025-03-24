import { React, useState, useEffect } from 'react';
import { collection, addDoc, getDocs} from 'firebase/firestore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import "../App.css";
import {db} from "../../firebaseConfig.js"

const Questions = () => {
      const [userData, setUserData] = useState({
            name: "",
            question: "",
            email: ""
      })
      const [questions, setQuestions] = useState([])

      const setQuestionData = (newData) => {
      //   setQuestions((prevQuestions) => [...prevQuestions, ...newData])
      setQuestions(newData)
      }

      const addUserData = async (event) => {
            event.preventDefault()
            if (!(userData.email === "") && !(userData.name === "") && !(userData.question === "")){
                  try {
                  const doc = await addDoc(collection(db, "userData"), {
                        email: userData.email,
                        name: userData.name,
                        question: userData.question,    
                  });
                  setUserData({
                        name: "",
                        question: "",
                        email: ""
                  });
                  getUserData()
                  } catch (error) {
                        console.error(error);
                  }
            }
      }

      const getUserData = async () => {
            let newData = []
            await getDocs(collection(db, "userData"))
                  .then((querySnapshot)=>{               
                  newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id, name:doc.data().name, question:doc.data().question }));  
                  setQuestionData(newData)
                  console.log(questions)
            })
      }

      useEffect(()=>{
            getUserData();
      },[])

      return (
            <>
            <div className="row container align-items-center">
            <Form onSubmit={addUserData}>
                  <Form.Group className="mb-3 col-6 container" controlId="formBasicName">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={userData.name} type="text" placeholder="Name" onChange={(event) => setUserData((prevUserData) => ({
                                                                              ...prevUserData, name: event.target.value
                                                                              }))}/>
                  </Form.Group>
                  <Form.Group className="mb-3 col-6 container" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={userData.email} type="email" placeholder="Enter email"  onChange={(event) => setUserData((prevUserData) => ({
                                                                              ...prevUserData, email: event.target.value
                                                                              }))}/>
                  <div className="d-flex justify-content-start">
                  <Form.Text className="text-muted w-100">
                        We'll never share your email with anyone else.
                  </Form.Text>
                  </div>                                                           
                  </Form.Group>
                
                  <Form.Group className="mb-3 col-6 container" controlId="formBasicTextArea">
                        <Form.Label>Question</Form.Label>
                        <Form.Control value={userData.question} as="textarea" placeholder="Enter you question here" rows={4} cols={40} onChange={(event) => setUserData((prevUserData) => ({
                                                                                                                        ...prevUserData, question: event.target.value
                                                                                                                  }))}/>
                  <div className="col-auto mb-3 d-flex justify-content-start">
                  <Button variant="primary" type="submit" className='button-css'>
                        Submit
                  </Button>
                  </div>                                                                                                
                  </Form.Group>

            </Form>
            <div className="col-6">
                  <Table striped bordered hover >
                        <thead>
                        <tr>
                        <th className="w-auto d-flex text-start">Client Name</th>
                        <th className="w-auto table-fixed text-wrap text-start">Client Question</th>
                        </tr>
                        </thead>
                        <tbody>
                              {questions.map((el) => { return <tr key={el.id}>
                              <td className="text-start">{ el.name}</td>   
                              <td className="text-start">{el.question}</td>                                                                                       
                              </tr>} )}  
                        </tbody>
                  </Table>
            </div>
            </div>
            </>
    )
}

export default Questions