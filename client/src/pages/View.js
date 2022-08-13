import  {useState, useEffect} from 'react'
import { useParams, Link} from "react-router-dom";
import fireDb from "../firebase"
import {toast} from "react-toastify";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams()
    useEffect(() => {
        fireDb.child(`users/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setUser({...snapshot.val()})
            } else {
                toast.error("user not found")
                setUser({})
            }
        })
    }, [id])
    return (
        <div style={{marginTop:"100px"}}>
            <Card style={{width: '18rem',display: 'flex',alignItems: 'center',margin:"auto"}}>
                <ListGroup variant="flush">
                    <ListGroup.Item> Name: {user.name}</ListGroup.Item>
                    <ListGroup.Item> Age: {user.age}</ListGroup.Item>
                    <ListGroup.Item> Email: {user.email}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Link to="/">
                        <Button size="md" variant="success">Go Back</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}
export default View
