import React, { useState,useRef } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.png'


const ImageGenerator = () => {

    const[image_url, set_image_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, set_loading] = useState(false);

    const openaiApiKey = process.env.OPENAI_API_KEY;
    const imageGenerator = async () => {
        if (inputRef.current.value==="") {
            return 0;
        }
        set_loading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                    `Bearer ${openaiApiKey}`,
                    "User-Agent": "OpenAI-Generator"
                },
                body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n: 1,
                size:"512x512"
                }),
            }
        );
        let data = await response.json();
        let data_array = data.data;
        set_image_url(data_array[0].url);
        set_loading(false);
    }

    return (
        <div className='generator'>
        <div className="header">Ai image <span>generator</span></div>
        <div className="img-loading">
            <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" /></div>
            <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading....</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className="search-input" placeholder="hyper-realistic cat playing piano in field of flowers"/>
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
        </div>
    )
}

export default ImageGenerator