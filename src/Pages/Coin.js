import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { ManyCoins } from '../CryptoApis';
import { InfoState } from '../GetCryptoInfo';
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import {Table, Form} from 'react-bootstrap';
const Coin = () => {
    const [coins, setCoin] =  useState([]);
    const [load, setLoad] =  useState(false);
    const {currentMoney, Symbol} = InfoState();
    const [look, setLook] = useState("");

    const nav = useNavigate();

    const getCoins = async() =>  {
        setLoad(true); 
        const {data} = await axios.get(ManyCoins(currentMoney)); 
        setCoin(data);
        console.log(data);
        setLoad(false);
    };
    
    useEffect(() => {        
        getCoins();
    }, [currentMoney])

    const HC = () => {
        return coins.filter((coin) => 
        coin.name.toLowerCase().includes(look)||
        coin.name.toUpperCase().includes(look)|| 
        coin.symbol.toLowerCase().includes(look)
        )
        }

    return (
        <div>
            <container>
            <div class="container-sm">
            <h3>Search crypto prices</h3>
            <Form>
            <Form.Group className="mb-3">
            <Form.Control 
            className= "bg-dark text-white"
            type="text" 
            placeholder="Enter Crypto"
            onChange={(e) => {
            setLook(e.target.value);}} 
            />
            </Form.Group>
            </Form>
            
            {load? (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>): 
                (
                <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Crypto coin</th>
                        <th>MarketCap</th>
                        <th>Price</th>
                        <th>Price change (24hr % / {Symbol})</th>
                      </tr>
                    </thead>  
                    <tbody>
                    {HC().map((row)=>{
                        return(
                            <tr onClick={()=> nav(`/IndividualCoin/${row.id}`)}
                             key= {row.name}>
                                <td className= "col-2">
                                    <img
                                    src = {row?.image}
                                    alt = {row.name}
                                    height = "50"
                                    margin-right= "0"
                                    />
                                    <h3>{row.name}</h3> 
                                </td>
                                <td className= "col-2">
                                {Symbol}{" "}
                                {row.market_cap.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                                })}
                                </td>
                                <td className= "col-2">
                                {Symbol}{" "}
                                {row.current_price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                                })}
                                </td>
                                <td className= "col-2">
                                { row.price_change_percentage_24h < 0 ? (
                                <p class="text-danger">{row.price_change_percentage_24h.toFixed(2)}% / {row.price_change_24h.toFixed(2)}</p>): 
                                
                                (<p class="text-success">{row.price_change_percentage_24h.toFixed(2)}% / {row.price_change_24h.toFixed(2)}</p>)}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            )} 
            </div>
            </container>
        </div>
    )
}

export default Coin
