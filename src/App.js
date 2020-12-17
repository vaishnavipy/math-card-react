
import { useEffect, useState } from 'react';
import './App.css';
import {useDrag,useDrop} from "react-dnd"

function App() {
  return (
    <div className="main-container">

      <Calculator />

      <RightGrid />

    </div>
  );
}



function DropComponent({value,itemType,handleChange,div}){

const [cardValues,setCardValues] = useState(value)

  const [{isOver},drop] = useDrop({
    accept:itemType,
    drop : (item)=> (changeValue(item)),
    collect:(monitor)=>({
      isOver: !!monitor.isOver(),
      
    })
  })

  function changeValue(item){
    setCardValues(item.id)
   
  }
  useEffect(()=>{
    handleChange({cardValues,div})
  },[cardValues])
  


  return( <div className={isOver ? "left-card hover" : "left-card"}  ref={drop}  >{cardValues}</div>)

}


function Calculator(){

  const [finalResult,setFinalResult] = useState(3)

  const [resultObj,setResultObj] = useState({number1:"1",symbol:"*",number2:"3"})

  function handleChange({cardValues,div}){
   
    
    setResultObj(prevState => ({...prevState,[div]:cardValues}))
  }

  useEffect(()=>{
    if(resultObj.symbol == "+"){
      setFinalResult(Number(resultObj.number1) + Number(resultObj.number2))
    }
    else if(resultObj.symbol == "-"){
      setFinalResult(Number(resultObj.number1) - Number(resultObj.number2))
    }
    else if(resultObj.symbol == "*"){
      setFinalResult(Number(resultObj.number1) * Number(resultObj.number2))
    }
    else if(resultObj.symbol == "/"){
      setFinalResult(Number(resultObj.number1) / Number(resultObj.number2))
    }

  },[resultObj])


  return(
  <div className="left-grid">
    <div className="calculate-class">
    <div className="empty" ></div>
    <DropComponent value={resultObj.number1} itemType="numbers"  handleChange={handleChange} div="number1"/>
    <DropComponent value={resultObj.symbol} itemType="symbols" handleChange={handleChange} div="symbol"/>
    <DropComponent value={resultObj.number2} itemType="numbers" handleChange={handleChange} div="number2"/>
  </div>
  <div className="result-div">
    <hr />
    <div className="result">{finalResult}</div>
  </div>
  </div>)


}

function RightGrid(){
  

  return(
  <div className="right-grid">
    <Numbers />
    <Symbols />
  </div>)


}

function DragComponent({key,i,id,cardType}){

  const ItemTypes={CARD:cardType}

  const [{isDragging},drag] = useDrag({
    item:{type:ItemTypes.CARD,
        id:id
        },
    collect:(monitor)=>({
      isDragging : !!monitor.isDragging()
    })  
  })
 

  return(<div  ref={drag} className="card"  key={key}>{i}</div>)
}



function Numbers(props){

  

  const numberArr = Array(10).fill(0)

  const numbers = numberArr.map((elm,i)=> <DragComponent  key={i} i={i} id={i} cardType="numbers"/> )
 
  return(<div className="numbers" >
    {numbers }
  </div>)
}

const symbolArr =["*","-","+","/"]

const symbols = symbolArr.map((elm,i) => <DragComponent key={i} i={elm} id={elm} cardType="symbols"/>)


function Symbols(){
  return(<div className="symbols">
    {symbols}
  </div>)
}


export default App;
