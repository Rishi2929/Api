import React, { useEffect, useState } from 'react';
import './DataApi.css';

function DataApi() {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const resp = await fetch('https://api.sampleapis.com/beers/ale');
            const json = await resp.json();
            const sortedData = json.sort((a, b) => (a.price > b.price ? 1 : -1));
            setData(sortedData);
        } catch (err) {
            console.log("Catch block");
            setData([]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className='parent-div'>
                {
                    data.map((item, index) => (
                        <div key={index} className='item-tiles'>
                            <h3>{item.name}</h3>
                            <p>Price: {item.price}</p>
                            <p>Rating: {item.rating?.average}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default DataApi;
