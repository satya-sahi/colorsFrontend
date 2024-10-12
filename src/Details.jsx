import React, { useEffect, useState } from "react";
import useGetColors from "./useGetColors";
import Spinner from "./Spinner";
import './App.css';

const Details = ()=>{
const [trigger,setTrigger] = useState(false);
const [colorType,setColorType] = useState('rgb')
 const   {colorsList,loading,error}=useGetColors(trigger);
 const clickFunc=()=>{
    setTrigger(true)
 }
 useEffect (()=>{
    if(!loading) setTrigger(false)
 },[loading])
    return(
        <>
        <div>
            {loading && <Spinner />}
            {error && <p>Error with data</p>}
        </div>
        <div>
            <button onClick={clickFunc} >{colorsList && colorsList.length>0 ?'Refresh Color Palate': 'Generate Color Swatch'}</button>
            <label htmlFor="colorType">Choose color Type</label>
            <select id="colorType" onChange={(e)=>setColorType(e.target.value)}>
                <option value='rgb'>RGB</option>
                <option value='hsl'>HSL</option>
            </select>
            {colorsList && colorsList.length>0 ? (
                <table >
                    <thead>
                        <tr>
                        <td>Color Name</td>
                        <td>{colorType==='rgb'? 'RGB Value':'HSL Value'}</td>
                        <td>color</td>
                        </tr>
                    </thead>
                    <tbody>
                        {colorsList.map((color,index)=>(
                        <tr key={index}>
                            <td>{color.name}</td>
                            <td>{colorType==='rgb'? color.rgb.join(', '): color.hsl.join(', ')}</td>
                            <td style={{backgroundColor:color.hex}}></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            //   <ul>
            //     {Object.entries(colorsList[0]).map(([key,value])=>(
            //         <li key={key}>
            //             {value.name}
            //         </li>
            //     ))}
            //   </ul>  
            ) :
            (
                <p>No colors found!!!</p>
            )}
        </div>
        </>
    )
}
export default Details;