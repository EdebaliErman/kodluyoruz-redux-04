import React, { useEffect } from 'react'
import { fecthCharacters, selectData, selectError, selectStatus, selectPage } from '../../redux/chaacterSlice'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { Link } from 'react-router-dom'

function Home() {
    const dispatch = useDispatch()
    const characters = useSelector(selectData)
    const page = useSelector(selectPage)
    const status = useSelector(selectStatus)
    const error = useSelector(selectError)

    useEffect(() => {
        dispatch(fecthCharacters())
    }, [dispatch])
    if (status === "loading") {
        return <Loading />
    }
    if (status === "failed") {
        return <Error message={error.message} />
    }

    return (
        <div>
            <h1>Home</h1>
            <div className='home'>

                {characters.results?.map(character => <Link key={character.id} to={`/character/${character.id}`}>
                    <div className='card' >
                        <h2>{character.name}</h2>
                        <img src={character.image} alt={character.image} />
                    </div>
                </Link>)}
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={() => dispatch(fecthCharacters(page))}>
                Next Page
                </button>

            </div>
        </div>
    )
}

export default Home
