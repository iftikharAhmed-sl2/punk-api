import React, {useEffect, useState} from "react";
import axios from "axios";
import s from "./styles.module.scss";
import Search from "./search/Search";

function DataFetching(props) {
    const [beers, setBeers] = useState([]);
    const [searchText, setSearchText] = useState("")
    const fetchBeers = () => {
        axios.get("https://api.punkapi.com/v2/beers/")
            .then((res) => {
            console.log(res);
            setBeers(res.data);
        })
            .catch(err =>{
                console.log(err);
            });
    }

    const searchBeers = (searchText) =>{
        if (searchText !== ""){
            return axios.get(`https://api.punkapi.com/v2/beers?beer_name=${searchText}`)
                .then((res) => {
                    setBeers(res.data);
                })
        } else {
            fetchBeers().then(beers =>setBeers(beers));
        }
    }

    useEffect(() => {
        fetchBeers()
    }, [])
    return (
        <div>
            <Search setSearchText={setSearchText} searchBeers={searchBeers}/>
            <table className={s.table}>
                <tbody>
                    {beers.map(beer => (
                        <tr key={beer.id}>
                            <td>{beer.id}</td>
                            <td><img src={beer.image_url} alt={beer.name} /></td>
                            <td>{beer.name}</td>
                            <td>{beer.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default DataFetching;