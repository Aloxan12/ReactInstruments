import React, {useEffect, useState} from "react";
import s from './useEffect2.module.css'
import axios from 'axios'

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}

export const Github = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [usersGH, setUsersGH] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState('it-kamasutra')
    const [searchTerm, setSearchTerm] = useState('it-kamasutra')

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])


    useEffect(() => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsersGH(res.data.items)
            })
    }, [searchTerm])


    return (
        <div className={s.container}>
            <div>
                <div>
                    <input value={tempSearch} onChange={(e) => {
                        setTempSearch(e.currentTarget.value)
                    }} placeholder={'search...'}/>
                    <button
                        onClick={() =>
                            setSearchTerm(tempSearch)}
                    >Find
                    </button>
                </div>
                <ul>
                    {usersGH
                        ?.map((u) => <li
                            className={selectedUser === u ? s.selected : ''}
                            onClick={() => {
                                setSelectedUser(u)
                            }}>
                            {u.login}
                        </li>)}
                </ul>
            </div>
            <div>
                <h2>Username</h2>
                <div>Details</div>
            </div>
        </div>
    )
}