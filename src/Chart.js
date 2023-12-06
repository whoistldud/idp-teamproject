import React, {useState, useEffect, useCallback, useMemo, Component} from "react";
import axios from 'axios';
import "./App.css";
import "./Chart.css";

function Chart() {
  const [hos,setHos]= useState([]);
  const [ss,setSs] = useState("");
    // 변수 초기값
    useEffect(()=>{
        axios.get('https://raw.githubusercontent.com/kimdayeon37/barchart/main/hos_%E1%84%82%E1%85%A9%E1%84%8B%E1%85%AF%E1%86%AB1.json').then((res)=>{
            setHos(res.data)
        })
    },[]) //Mount 할 때만 실행 => componenetDidMount
    //이벤트 등록
    
    const  handleUserInput =useCallback((ss)=> {
        setSs(ss)
    },[ss])
    
    return(
    <div className={"row"} style ={{ marginLeft:"2%"}}>
            <H2/>
            <SearchBar ss={ss} onUserInput={handleUserInput}/>
            <div style = {{ height: "500px", overflow: "auto"}}><HospitalTable hospital={hos} ss={ss}/></div>
        </div>)}
        //음악리스트 큰 틀
function HospitalTable(props) {
    const row=[];
    props.hospital.forEach((m)=>{
        if(m.진료과목내용명.indexOf(props.ss)==-1 && (m.도로명전체주소.indexOf(props.ss)==-1) ){
            return;
        }
        //배열에 추가
        row.push(<HospitalRow hospital={m}/>)
    })
   return(
       <table className={"table"}>
           <thead>
               <tr className={"danger"}>
                        <th>의료기관명</th>
                        <th>진료과목</th>
                        <th>도로명주소</th>
                        <th>전화번호</th>
               </tr>
           </thead>
           <tbody>
           {row}
           </tbody>
       </table>
   )
}
//음악 한곡씩
function HospitalRow(props) {
    return(
        <tr>
            <td>{props.hospital.사업장명}</td>
            <td>{props.hospital.진료과목내용명}</td>
            <td>{props.hospital.도로명전체주소}</td>
            <td>{props.hospital.소재지전화}</td>
        </tr>
    )
}
//검색바 useCallback 사용
function SearchBar(props) {
    const  onChange =(e)=>{
        props.onUserInput(e.target.value);
    }
    return(
        <table className={"table"}>
            <tr>
                <td>
                    <input type={"text"} size={"30"} className={"input-sm"} placeholder={"병원에 대한 정보를 입력하세요"} onChange={onChange}
                           value={props.ss}/>
                </td>
            </tr>
        </table>
    )
}


//Memo 기능 사용
const  H2= React.memo(()=>{
    return(
        <h1 className={"text-center"}>의료기관 검색 🔍</h1>
    )})


export default Chart; 