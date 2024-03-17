import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.png';
import openai from 'openai'; // Import the openai module

const ImageGenerator = () => {
    const [image_url, set_image_url] = useState('/');
    let inputRef = useRef(null);
    const [loading, set_loading] = useState(false);
    const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

    const imageGenerator = async () => {
        if (inputRef.current.value === '') {
            return 0;
        }
        set_loading(true);
        
        const response = await openai.Images.generate({
            model: 'dall-e-3',
            body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n: 1,
                size: '512x512',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openaiApiKey}`,
                    'User-Agent': 'OpenAI-Generator',
                },
            }),
        });
        const data = await response.json();
        const data_array = data.data;
        if (Array.isArray(data_array) && data_array.length > 0 && data_array[0].url) {
            set_image_url(data_array[0].url);
        } else {
            console.error('Invalid data received:', data);
        }
        set_loading(false);
    };

    return (
        <div className='generator'>
            <div className='header'>Ai Image Generator</div>
            <div className='img-loading'>
                <div className='image'>
                    <img src={image_url === '/' ? default_image : image_url} alt='' />
                </div>
                <div className='loading'>
                    <div className={loading ? 'loading-bar-full' : 'loading-bar'}></div>
                    <div className={loading ? 'loading-text' : 'display-none'}>Loading....</div>
                </div>
            </div>
            <div className='search-box'>
                <input type='text' ref={inputRef} className='search-input' placeholder='hyper-realistic cat playing piano in field of flowers' />
                <div className='generate-btn' onClick={() => { imageGenerator() }}>
                    Generate
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;
