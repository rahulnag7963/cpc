import React from 'react';
import {useParams} from 'react-router-dom';
import { InfoState } from '../GetCryptoInfo';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { OneCoin } from '../CryptoApis';
import {Card,Spinner,Row,Col, Button, FormControl, InputGroup} from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import Graph from './Graph';
const IndividualCoin = () => {
    const { CryptoId }= useParams();
    const [coin, setCoin] = useState();
    const {currentMoney, Symbol} = InfoState();

    const getCoins= async() => {
        const {data} = await axios.get(OneCoin(CryptoId));
        setCoin(data);
    }

    useEffect(()=>{
        getCoins();
    },[]);

    if(!coin){
        return (  
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>)}
    return (
        <div className = "p-3">
        <Row >
        <Col sm = {3}>     
            <Card 
            bg='dark'
            text='light'
            style={{ width: '22rem' }}
            className="mb-2"
                    >
                <Card.Img variant="top" src={coin.image.large}/>
                    <Card.Body>
                        <Card.Title>{coin.name}</Card.Title>
                        <Card.Text>
                        {ReactHtmlParser(coin.description.en.split(". ")[0])}
                        </Card.Text>
                        <Card.Link href={coin.links.homepage[0]}>{coin.name} Official Website</Card.Link>
                    </Card.Body>
            </Card>
        </Col>
        <Col sm= {8}>   
            <Graph coin={coin}/>
        </Col>
        </Row>
        <Row>
        <Col sm= {3}>
        <Card
            bg='dark'
            text='light'
            className="mb-2">
                    <Card.Body>
                        <Card.Title>{coin.name} information</Card.Title>
                        <Row className = "bg-dark text-white px-4">Date created: {coin.genesis_date}</Row>
                        <Row className = "bg-dark text-white px-4">All time high: {Symbol}{coin.market_data.ath[currentMoney.toLowerCase()].toLocaleString()}</Row>
                        <Row className = "bg-dark text-white px-4">Marketcap: {Symbol}{coin.market_data.market_cap[currentMoney.toLowerCase()].toLocaleString()} </Row>
                        <Row className = "bg-dark text-white px-4">Total volume: {coin.market_data.total_volume[currentMoney.toLowerCase()].toLocaleString()}</Row>    
                        <Row className = "bg-dark text-white px-4">24 hr high: {Symbol}{coin.market_data.high_24h[currentMoney.toLowerCase()].toLocaleString()}</Row>
                        <Row className = "bg-dark text-white px-4">24 hr low: {Symbol}{coin.market_data.low_24h[currentMoney.toLowerCase()].toLocaleString()}</Row>  
                        <Row className = "bg-dark text-white px-4">Price change past 24hrs: {Symbol}{coin.market_data.price_change_24h_in_currency[currentMoney.toLowerCase()].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Row>
                        <Row className = "bg-dark text-white px-4">Total Supply is: {coin.market_data.total_supply === null ? "Infinite" : coin.market_data.total_supply.toLocaleString()}</Row>
                        <Row className = "bg-dark text-white px-4">Circulating Supply is: {coin.market_data.total_supply === null ? "Infinite" : coin.market_data.circulating_supply.toLocaleString()}</Row>
                    </Card.Body>
        </Card> 
        </Col>
        </Row>   
        </div>
    )
}

export default IndividualCoin
