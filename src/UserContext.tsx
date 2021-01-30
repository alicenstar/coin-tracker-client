import React from 'react';
import { IUser } from './types/types';


type Props = {
	children: React.ReactNode;
};

type UserContextType = {
    user: IUser | undefined;
    setUser: (user: IUser | undefined) => void;
}

const UserContext = React.createContext<UserContextType | undefined>(
    undefined
);

export const UserProvider = ({
    children
}: Props) => {
    const [ user, setUser ] = React.useState<IUser | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => React.useContext(UserContext);