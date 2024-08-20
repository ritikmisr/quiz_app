import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import cameraRef from '../HigherOrderComponent/cameraRef';
import Button from '../components/Button';
import './GetCameraAccess.css';

function GetCameraAccess({ videoRef }) {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }

        const getCameraStream = async () => {
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({
                    video: true, audio: true
                });

                if (videoRef?.current) {
                    videoRef.current.srcObject = videoStream;
                    setIsLoading(false);
                    setError(false);

                    videoStream.getTracks().forEach(track => {
                        track.onended = () => {
                            setError(true);
                            alert('Camera access has been revoked.');
                        };
                    });
                }
            } catch (err) {
                setError(true);
            }
        };

        getCameraStream();

        return () => {
            if (videoRef?.current && videoRef?.current?.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);
    
    return (
        <>
            {isLoading || error ? (
                <Card className={'card center-aligned card-height-medium'}>
                    <h1>Pleas allow to microphone and camera access to enable test button
                    </h1>
                </Card>) : (<Button
                    className={'btn btn-primary'}
                    label={'Start test'}
                    handleClick={() => {navigate('/quiz')}}
                />)}
        </>
    )
}

export default cameraRef(GetCameraAccess);