import React, { useEffect } from 'react';
import {useState} from 'react';
import { Chart } from '../CryptoApis';
import { InfoState } from '../GetCryptoInfo';
import axios from 'axios';
import {Spinner,Button,Container} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const Graph = ({coin}) => {
    const [graphData, setGraphData] = useState();
    const [Day, setDay] = useState(1);
    const {currentMoney} = InfoState();
    
    const getData = async ()=> {
        const {data} = await axios.get(Chart(coin.id,Day, currentMoney));
    
        setGraphData(data.prices);
    }

    useEffect (() => {
        getData();

    }, [Day])

    return (
        <div>
            {!graphData ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            ):(
                <>
                <Line
                data= {{
                    labels: graphData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                    return Day === 1? time: date.toLocaleDateString();
                }),
                datasets:[{
                    data: graphData.map((coin) => coin[1]),
                    label: `Price from the past ${Day} day(s) in ${currentMoney}`,
                    borderColor: "#f0f4f5",
                },
                ],
                }}
                options= {{
                    elements: {
                    point: {
                    radius: 1,
                        },
                      },
                    }}
                ></Line>
                <Container fluid>
                    <div className="d-grid gap-2">
                        <Button variant="dark" size = "sm" key={1} onClick={()=>{setDay(1)}}> 1 Day </Button> {' '}
                        <Button variant="dark" size = "sm" key={30} onClick={()=>{setDay(30)}}> 30 Days </Button> {' '}
                        <Button variant="dark" size = "sm" key={90} onClick={()=>{setDay(90)}}> 90 Days </Button> {' '} 
                        <Button variant="dark" size = "sm" key={365} onClick={()=>{setDay(365)}}> 1 Year </Button> {' '}
                        <Button variant ="dark"size ="lg" disabled ></Button> {' '}
                    </div>
                </Container>
                </>        
            )}
        </div>
            )
}

export default Graph;
