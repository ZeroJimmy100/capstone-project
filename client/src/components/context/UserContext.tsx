import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import axios from 'axios';

export const myContext = createContext<any>({});
export default function UserContext(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<any>();
    useEffect(() => {
        axios.get("http://localhost:4000/user", {withCredentials: true}).then(res => {
            setUser(res.data.user);
        })
    }, [])
    return (
        <myContext.Provider value={user}>{props.children}</myContext.Provider>
    )
}
