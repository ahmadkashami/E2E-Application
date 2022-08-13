import  {useState, useEffect} from 'react'
import { Link} from "react-router-dom";
import fireDb from "../firebase"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {toast} from "react-toastify";

const Home = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        fireDb.child('users').on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setData({...snapshot.val()})
            } else {
                setData({})
            }
        });

        return () => {
            setData({})
        };
    }, [])
    const onDelete=(id)=>{
        if(window.confirm('Are you sure you want to delete this user?')){
            fireDb.child(`users/${id}`).remove((err)=>{
                if(err){
                    toast.error(err)
                }else{
                    toast.success("User deleted successfully")
                }
            })
        }
    }
    return (
        <div style={{margin: "100px"}}>
            <Table striped bordered hover style={{maxWidth: "800px",margin:'auto'}}>
                <thead>
                <tr>
                    <th>#No</th>
                    <th> Name</th>
                    <th>Email Name</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(data).map((id, index) => {
                    return (
                        <tr key={id}>
                            <th scope="row">{index + 1}</th>
                            <td>{data[id].name}</td>
                            <td>{data[id].email}</td>
                            <td>{data[id].age}</td>
                            <td>
                                <Link to={`/view/${id}`}>
                                    <Button size="md" variant="success">View</Button>
                                </Link>{' '}
                                <Button size="md" variant="danger" onClick={() =>onDelete(id)}>Delete</Button>{' '}
                                <Link to={`/update/${id}`}>
                                    <Button size="md" variant="warning">Edit</Button>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    )
}
export default Home
