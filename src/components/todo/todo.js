import React, { useEffect, useState } from 'react'
import "./style.css"

const getLocalData=()=>{
    const lists=localStorage.getItem("mytodolist")
    if(lists){
        return JSON.parse(lists)
    }
    else{
        return []
    }
}

const Todo = () => {
     const [inputData, setInputData] = useState("")
     const [items, setItems] = useState(getLocalData())
     const [isEditItem, setIsEditItem] = useState("")
     const [toggleButton, setToggleButton] = useState(false)
     const addition=()=>{
                if(!inputData){
                    alert("Plz fill the data")
                }    
                else if(inputData && toggleButton){
                    setItems(
                        items.map((curElem)=>{
                            if(curElem.id===isEditItem){
                                return {...curElem,name: inputData}
                            }   
                            return curElem                                 
                        })
                    )
                    setInputData("")
                    setIsEditItem(null)
                    setToggleButton(false)
                }

                else{
                    const myNewInputData= {
                        id: new Date().getTime().toString(),
                        name: inputData
                    }
                    setItems([...items, myNewInputData])
                    setInputData("")
                }    
     }

        const deleteItem= (index)=>{
            const updatedItems= items.filter((curElem)=>{
                return curElem.id!==index;
            })
                setItems(updatedItems)
        }

        const removeAll =()=>{
            setItems([])
        }

        const editItem=(index)=>{
                const item_todo_edited = items.find((curElem)=>
                {
                    return curElem.id===index
                }
                )
                setInputData(item_todo_edited.name)
                setIsEditItem(index)
                setToggleButton(true)
        }    


        useEffect(()=>{
                localStorage.setItem("mytodolist", JSON.stringify(items))
        }, [items]) 


     return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src='' alt='todologo'/>
                    <figcaption>Add Your List Here :</figcaption>
                </figure>
                <div className='addIttems'>
                    <input type='text' placeholder='✌ Add Item' className='form-control' value={inputData} onChange={(e)=>{setInputData(e.target.value)}} />
                    {toggleButton ? (<button className='far fa-edit add-btn' onClick={addition}>Edit</button>) : (<i className='fa fa-plus add-btn' onClick={addition}></i>)}
                    
                </div>
                        
                        <div className='showItems'>
                            {
                                items.map((curElem, index)=>{
                                    return (
                                        <div className='eachItem' key={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className='todo-btn'>
                                        <button className='far fa-edit add-btn' onClick={()=>{editItem(curElem.id)}}>Edit</button>
                                        <button className='far fa-trash-alt add-btn' onClick={()=>{
                                            deleteItem(curElem.id)
                                        }}>Del</button>
                                        </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>


                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}>
                       <span> CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
      
    </>
  )
}

export default Todo
