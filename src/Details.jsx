import React, { useEffect, useState } from "react";
import useGetColors from "./useGetColors";
import Spinner from "./Spinner";
import './App.css';

const Details = () => {
    const [trigger, setTrigger] = useState(false);
    const [colorType, setColorType] = useState('rgb')
    const { colorsList, loading, error } = useGetColors(trigger);
    const clickFunc = () => {
        setTrigger(true)
    }
    useEffect(() => {
        if (!loading) setTrigger(false)
    }, [loading])
    return (
        <>
            <div>
                {loading && <Spinner />}
                {error && <p>Error with data</p>}
            </div>
            <div>
                <button className="btn btn-primary center" onClick={clickFunc} >{colorsList && colorsList.length > 0 ? 'Refresh Color Palate' : 'Generate Color Swatch'}</button><br></br>
                <label htmlFor="colorType">Choose color Type</label>
                <select id="colorType" onChange={(e) => setColorType(e.target.value)}>
                    <option value='rgb'>RGB</option>
                    <option value='hsl'>HSL</option>
                </select>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {colorsList && colorsList.length > 0 ? (
                        colorsList.map((color, index) => (
                            <div className="card" style={{ width: '18rem', backgroundColor: color.hex }} key={index}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: 'white' }}>{color.name}</h5>
                                    <p className="card-text" style={{ color: 'white' }}>
                                        {colorType === 'rgb' ? 'RGB: ' + color.rgb.join(', ') : 'HSL: ' + color.hsl.join(', ')}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No colors found!!!</p>
                    )}
                </div>

            </div>
        </>
    )
}
export default Details;