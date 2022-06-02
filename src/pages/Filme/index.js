import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toast } from 'react-toastify';

import api from '../../services/api';

import './filme-info.css';

function Filme() {

    const { id } = useParams();
    const [filme, setFilme ] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '46a466a991f964dc00204c2c9d180d92',
                    language: 'pt-BR',
                }
            }).then((response) => {
                setFilme(response.data);
                setLoading(false);
            }).catch((e) => {
                navigate("/", {replace:true});
            })
        }

        loadFilme();

        return () => {
            console.log ("componente foi desmontado");
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLsta = localStorage.getItem("@netFilm");

        let filmesSalvos = JSON.parse(minhaLsta) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
        
        if(hasFilme){
            toast.warning("Esse filme já está na lista.");
        }else{
            filmesSalvos.push(filme);
            localStorage.setItem('@netFilm', JSON.stringify(filmesSalvos));
            toast.success("Filme salvo com sucesso");
        }
    }

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }
    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src= {`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinópse:</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target="_blank" rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;