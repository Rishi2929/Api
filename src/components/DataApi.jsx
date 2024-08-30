import React, { useEffect, useState } from 'react';
import './DataApi.css';

function DataApi() {
    const [data, setData] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');

    const getData = async () => {
        try {
            const resp = await fetch('https://api.sampleapis.com/beers/ale');
            const json = await resp.json();

            const sortedData = json.sort((a, b) => {
                let valueA, valueB;

                if (sortCriteria === 'price') {
                    valueA = parseFloat(a.price.replace(/[^0-9.-]+/g, "")) || 0;
                    valueB = parseFloat(b.price.replace(/[^0-9.-]+/g, "")) || 0;
                } else if (sortCriteria === 'rating') {
                    valueA = a.rating?.average || 0;
                    valueB = b.rating?.average || 0;
                }

                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            });

            setData(sortedData);
        } catch (err) {
            console.log("Catch block");
            setData([]);
        }
    };

    useEffect(() => {
        getData();
    }, [sortCriteria, sortOrder]);

    return (
        <div>
            <div className="sort-btn-container">
                <button onClick={() => setSortCriteria('price')}>Sort by Price</button>
                <button onClick={() => setSortCriteria('rating')}>Sort by Rating</button>
                <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                </button>
            </div>
            <div className='parent-div'>
                {data.map((item) => (
                    <div key={item.id} className='item-tiles'>
                        <img src={item.image} alt={item.name} className='product-image' />
                        <h3>{item.name}</h3>
                        <p>Price: {item.price}</p>
                        <p>Rating: {item.rating?.average}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataApi;
