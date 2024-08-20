import React, { useRef } from 'react';
import Card from '../components/Card';

function cameraRef(WrappedComponent) {
    function HOC(props) {
        const videoRef = useRef();
        return (<>
            <Card className={'card center-aligned card-height-medium'}>
                <video id='video-ref' ref={videoRef} autoPlay playsInline />
            </Card>
            <WrappedComponent {...props} videoRef={videoRef} />
        </>)
    }
    return HOC;
}

export default cameraRef;