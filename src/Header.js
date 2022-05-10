import React from 'react';
import { InfoState } from './GetCryptoInfo';
import {Form,Navbar} from 'react-bootstrap';

const Header = () => {
    const {currentMoney, newMoney} = InfoState();
    console.log(currentMoney);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">
                        Cryptocurrency Pricechecker
                    </Navbar.Brand>
            </Navbar>
            <Form.Select aria-label="Default select example"
            className ="bg-dark text-white"
            value={currentMoney}
            onChange={(e) => newMoney (e.target.value)}>
                <option>Choose a Currency</option>
                <option value={"CAD"}>CAD</option>
                <option value={"USD"}>USD</option>
                <option value={"EUR"}>EUR</option>
                <option value={"JPY"}>JPY</option>
            </Form.Select>
        </div>
    )
}

export default Header
