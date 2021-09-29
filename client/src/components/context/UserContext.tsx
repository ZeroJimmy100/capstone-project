import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import axios from 'axios';

const context_url: any = process.env.REACT_APP_URL_USER;

export const myContext = createContext<any>({});
export default function UserContext(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<any>();
    useEffect(() => {
        axios.get(context_url, {withCredentials: true}).then(res => {
            setUser(res.data.user);
        })
    }, [])
    return (
        <myContext.Provider value={user}>{props.children}</myContext.Provider>
    )
}
