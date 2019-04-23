import React, { Component } from "react";
import "./Dashboard.css";
import "./../../../../App.css";
import { Container, Row, Col } from "react-bootstrap";

import AddAddressForm from "../AddAddressForm/AddAddressForm";
import Address from "../Address/Address";

import OrderHistory from "../OrderHistory/OrderHistory";
import UserInfo from "../UserInfo/UserInfo";
import Tabs from "../../../../components/Tabs/Tabs";

class Dashboard extends Component {
    state = {
        getAddresses: null /* Saves products by their productId */
    };

    constructor(props) {
        super(props);
        this.setAddressesFunction = this.setAddressesFunction.bind(this);
    }

    setAddressesFunction(getAddresses) {
        this.setState({
            getAddresses: getAddresses
        });
    }

    render() {
        return (
            <div>
                <Tabs>
                    <div label="Profile">
                        <h5>Profile Dashboard Home</h5>
                        <UserInfo />
                    </div>
                    <div label="Orders History">
                        <OrderHistory />
                    </div>
                    <div label="Address">
                        <Container>
                            <Row>
                                <Col sm={12} md={4} lg={4}>
                                    <AddAddressForm
                                        triggerGetAddresses={this.state.getAddresses}
                                    />
                                </Col>
                                <Col sm={12} md={8} lg={8}>
                                    <Address
                                        triggerSetAddressesFunction={this.setAddressesFunction}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default Dashboard;
