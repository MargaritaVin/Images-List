import { useState, useEffect } from 'react';

const ImagesList = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState(1)

    useEffect (() => {
        setLoading(true);
        fetch(`https://picsum.photos/v2/list?page=${activePage}&limit=10`)
        .then((response) => response.json())
        .then((data) => {
            setImages((prevState) => [...prevState, ...data]);
            setLoading(false);
        });
    }, [activePage]);

    const handleShowImages = () => {
        setActivePage(activePage + 1)
    };

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
        <h1 className='heading'>Image Gallery</h1>
        <ul className='list-img'>
              {images.map(({id, download_url}) => (
                 <li className='item-img' key={id}><img className='img' src={download_url} alt=""/></li>
             ))}
        </ul>
        <button className='btn' onClick={handleShowImages}>Show more</button>
        </>
    )
};

export default ImagesList;