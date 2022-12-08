import './App.scss'
import React, {useEffect, useState} from "react";
import axios from "axios";

interface ICoin {
    image: string,
    name: string,
    current_price: number,
    price_change_percentage_24h: number
}

const url = 'https://precious-erin-bikini.cyclic.app/crypto'

function App() {

    const [cryptoCoins, setCryptoCoins] = React.useState<ICoin[]>([]);
    const [query, setQuery] = useState("")

    React.useEffect(() => {
        async function getPost() {
            const response = await axios.get(url);
            const rawCoins = response.data
            setCryptoCoins(rawCoins);
        }

        getPost();
    }, []);

    console.log(cryptoCoins)

    return (
        <div className="App">

            <input className='search' placeholder={'Enter your currency'}
                   onChange={(event: any) => setQuery(event.target.value)}/>

            <div className='searchWrapper'>

                {
                    cryptoCoins.filter((item: any) => {
                        if (query === '') {
                            return item
                        } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
                            return item
                        }
                    }).map((item: any, index: number) => (
                        <div className='infoCrypto' key={index}>
                            <img src={item.image} alt={''}/>
                            <p>{item.name}</p>
                            <p>{(item.current_price).toFixed(0)}$</p>
                            <p className={item.price_change_percentage_24h < 0 ? 'valueRed' : item.price_change_percentage_24h > 0 ? 'valueGreen' : 'error'}>{(item.price_change_percentage_24h).toFixed(2)}%</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default App

