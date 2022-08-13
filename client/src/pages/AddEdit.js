import  {useState, useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import './AddEdit.css'
import fireDb from "../firebase"
import {toast} from "react-toastify"

const initialState = {
    name: "",
    email: "",
    age: 0,
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const {name, email, age} = state;

    const history = useNavigate()
    const {id} = useParams()
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
    }, [id])
    useEffect(() => {
        if (id) {
            setState({...data[id]})
        } else {
            setState({...initialState})
        }
        return () => {
            setState({...initialState})
        }
    }, [id, data]);


    const handleInputChange = (e) => {
        const {name, value} = e.target
        setState({...state, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !age) {
            toast.error("Please fill  all fields")
        } else {
          if(!id){
              fireDb.child('users').push(state, (err) => {
                  if (err) {
                      toast.error(err)
                  } else {
                      toast.success("User Added successfully")
                  }
                  setTimeout(() => history('/'), 500)
              });
          }else {
              fireDb.child(`users/${id}`).set(state, (err) => {
                  if (err) {
                      toast.error(err)
                  } else {
                      toast.success("User update successfully")
                  }
                  setTimeout(() => history('/'), 500)
              });
          }
        }
    }
    return (
        <div style={{marginTop: "100px"}}>
            <form
                className="form"
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name :</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    name="name"
                    value={name||""}
                    onChange={handleInputChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={email||""}
                    onChange={handleInputChange}
                />
                <label htmlFor="Age">Age</label>
                <input
                    type="number"
                    id="age"
                    placeholder="Age"
                    name="age"
                    value={age||""}
                    onChange={handleInputChange}
                />
                <input type="submit" value={id?"Update":"Save"}/>
            </form>

        </div>
    )
}
export default AddEdit
