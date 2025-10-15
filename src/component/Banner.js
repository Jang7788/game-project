import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

function Banner() {
    const images = ["One", "Two", "Three"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % 3);
        }, 3000);

        return () => clearInterval(intervalId);

    }, []); 

    const next = () => {
        setIndex(prevIndex => (prevIndex + 1) % 3);
    };

    const previous = () => {
        setIndex(prevIndex => (prevIndex - 1 + 3) % 3);
    };

    return (
        <div className="container text-center mt-5">
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    {images.map((imageText, i) => (
                        <div
                            key={i}
                            className={i === index ? 'carousel-item active' : 'carousel-item'}
                        >
                            <h1 style={{ padding: '100px 0', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}>
                                {imageText}
                            </h1>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" onClick={previous}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" onClick={next}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Banner;