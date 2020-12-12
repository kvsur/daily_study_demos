import React, { useEffect, useState } from 'react'
import Loading from './Loading.js';
import Error from "./Error";

const OtherComponent = React.lazy(() => import('./OtherComponent.js'));

export default function App() {
    const [state, setState] = useState({ person: {}});


    useEffect(() => {
        console.log('effect resolve');
        setState({
            person: {
                name: 'licheng'
            }
        })
    }, []);

    return (
        <div>
            App hello {state.person.name}
            <Error>
                <React.Suspense fallback={<Loading />}>
                    <OtherComponent />
                </React.Suspense>
            </Error>
        </div>
    )
}
