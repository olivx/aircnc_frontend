import React , {useState, useMemo } from 'react'

import './style.css'
import camera from '../../assets/camera.svg'

import api from '../../services/api'
export default function New({history}) {
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] =  useState(null)

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault()

        const user_id =  localStorage.getItem('user')
        const data = new FormData()
        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        await api.post('/spots', data , {
            headers: { user_id }
        })
        
        history.push('/dashboard')
    }
    return(
        <form onSubmit={handleSubmit}>

            <label 
                id="thumbnail" 
                className={thumbnail ? 'has-thumbnail': ''}
                style={{ backgroundImage: `url(${preview})` }}>
                <input type="file" onChange={ event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="select image"/>
            </label>

            <label htmlFor="company">Empres * </label>
            <input 
            id="company"
            value={company}
            placeholder="sua empresa incrivel"
            onChange={event => setCompany(event.target.value)}/>

            <label htmlFor="tech">Tecnologias * <span>(separados por vírgulas)</span></label>
            <input
                id="tech"
                value={techs}
                placeholder="Quais tecnologias"
                onChange={event => setTechs(event.target.value)} />

            <label htmlFor="price">Preço <span>(Deixe em branco para Gratuito.)</span></label>
            <input
                id="price"
                value={price}
                placeholder="preço da diaria "
                onChange={event => setPrice(event.target.value)} />


            <button className="btn">
                Cadastrar 
            </button>
        </form>
    )
}