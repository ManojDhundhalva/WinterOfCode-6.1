import React, { useEffect, useRef } from 'react';
import loginVideo from '../images/loginVideo.mp4';
import '../CSS/Login.css'

const BackgroundVideo = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        // Check if the video is supported and is not null
        if (video) {
            // Set autoplay and loop attributes
            video.autoplay = true;
            video.loop = true;

            // Uncomment the following line if you want the video to mute
            // video.muted = true;
        }
    }, []);

    return (
        <video ref={videoRef} className="background-video" muted>
            <source src={loginVideo} type="video/mp4" />
            {/* Your browser does not support the video tag. */}
        </video>
    );
};

export default BackgroundVideo;