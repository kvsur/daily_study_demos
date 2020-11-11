import React, { useEffect, useRef } from 'react';

import { AudioSurfer } from 'audiosurfer';

// const container = document.querySelectory('#container');

// const audioSurfer = new AudioSurfer(container, {
//     color: '#1890ff', // color of wave 
//     showLog: false, // you show log when this code in runtime
//     pointerColor: '#ff6666', // color of potioner
//     progressColor: 'rgba(160, 160, 160, .5)', // color of played part
//     onCanplay: () => {},
//     onPlaying: () => {},
//     onPause: () => {},
//     onEnded: () => {},
//     onError: () => {},
// });

// // only support http 'GET' method, 
// audioSurfer.load('http://localhost:1024/demo.wav', { name: 'hello', age: 1});


export default function App() {
    let loaded = false;
    let audioSurfer = null;
    let container = useRef(null);
    useEffect(() => {
        return () => {
            container.current = null;
        }
    }, []);

    function handler() {
        if (loaded) return;
        loaded = true;
        audioSurfer = new AudioSurfer(container.current, {
            color: '#1890ff', // color of wave 
            showLog: false, // you show log when this code in runtime
            pointerColor: '#ff6666', // color of potioner
            progressColor: 'rgba(160, 160, 160, .5)', // color of played part
            onCanplay: () => {
                audioSurfer.play();
            },
            onPlaying: () => {},
            onPause: () => {},
            onEnded: () => {},
            onError: () => {},
        }, []);

        audioSurfer.load('http://127.0.0.1:5500/src/audioSurfer/audio/demo1.wav', { name: 'hello', age: 1});
    }

    return (
        <div id="container" ref={container} onClick={handler}>
            hello wolrd!!!
        </div>
    )
}
