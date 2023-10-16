import React, { useRef, useState } from 'react'
import './App.css'

function CRUD() {
    const list = [
        {
            id: 1, 
           studentname: "kalaipriya",
            Teachername: "kavitha",
            subject:"social"
        },
        {
            id: 2, 
            studentname: "praba",
            Teachername: "suma",
            subject:"science"
        },
        {
          id: 3, 
          studentname: "tharani",
          Teachername: "venmathi",
          subject:"maths"
      },
    ]
    const [lists, setList] = useState(list)
    const [updateState, setUpdateState] = useState(-1)
    return(
        <div className='crud'>
            <div>
            <AddList setList = {setList }/>
            <form onSubmit={handleSubmit}>
            <table>
                {
                    lists.map((current) => (
                        updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/> :
                        <tr>
                            <td>{current.studentname}</td>
                            <td>{current.Teachername}</td>
                            <td>{current.subject}</td>
                            <td>
                                <button className='edit' onClick={() => handleEdit(current.id)}>Edit</button>
                                <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
            </form>
            </div>
        </div>
    )

    function handleEdit(id) {
        setUpdateState(id)
    }
    function handleDelete(id) {
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist)
    }
    function handleSubmit(event) {
        event.preventDefault()
        const studentname = event.target.elements.studentname.value
        const Teachername = event.target.elements.Teachername.value
        const subject = event.target.elements.subject.value
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, studentname:studentname, Teachername: Teachername,subject:subject} : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}

function EditList({current, lists, setList}) {
    function handInputname(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, studentname :value} : li
        ))

        setList(newlist)
    }
    function handInputprice(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, Teachername:value} : li
        ))

        setList(newlist)
    }
    function handInputexperience(event) {
      const value = event.target.value;
      const newlist = lists.map((li) => (
          li.id === current.id ? {...li, subject:value} : li
      ))

      setList(newlist)
    }
    return(
        <tr>
            <td><input type="text" onChange={handInputname} name='studentname' value={current.studentname}/></td>
            <td><input type="text" onChange={handInputname} name='Teachername' value={current.Teachername}/></td>
            <td><input type="text" onChange={handInputname} name='subject' value={current.subject}/></td>
            <td><button type='submit'>Update</button></td>
        </tr>
    )
}

function AddList({setList}) {
    const studentnameRef = useRef()
    const TeachernameRef = useRef()
    const subjectRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();
        const studentname = event.target.elements.studentname.value;
        const Teachername= event.target.elements.Teachername.value;
        const subject = event.target.elements.subject.value;
        const newlist = {
            id: 3,
            studentname,
            Teachername,
            subject
        }
        setList((prevList)=> {
            return prevList.concat(newlist)
        })
        studentnameRef.current.value = ""
        TeachernameRef.current.value = ""
        subjectRef.current.value = ""
    }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="studentname" placeholder="Enter studentname" ref={studentnameRef}/>
            <input type="text" name="Teachername" placeholder="Enter Teachername" ref={TeachernameRef}/>
            <input type="text" name="experience" placeholder="Enter subject" ref={subjectRef}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default CRUD;