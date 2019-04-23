import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './LandingPage.css';

class LandingPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSelect = this.onSelect.bind(this);

        this.state = {
            index: 0,
            direction: null,
        };
    }

    onSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    render() {
        const { index, direction } = this.state;

        return (
            <Carousel
                id="carousel"
                activeIndex={index}
                direction={direction}
                onSelect={this.onSelect}
            >
                <Carousel.Item>
                    <h1>NOW IN STOCK!</h1>
                    <img id="test"
                        className="d-block w-100"
                        src="http://sweetclipart.com/multisite/sweetclipart/files/baby_boy_socks_blue.png"
                        alt="Blue Baby Socks"
                    />
                    <Carousel.Caption>
                        <h2>Blue Baby Socks</h2>
                        <p>Nice pair of blue socks for baby boy</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <h1>NOW IN STOCK!</h1>
                    <img
                        className="d-block w-100"
                        src="http://sweetclipart.com/multisite/sweetclipart/files/baby_girl_socks_pink.png"
                        alt="Pink Baby Socks"
                    />

                    <Carousel.Caption>
                        <h2>Pink Baby Socks</h2>
                        <p>Nice pair of pink socks for baby girl</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <h1>NOW IN STOCK!</h1>
                    <img
                        className="d-block w-100"
                        src="http://sweetclipart.com/multisite/sweetclipart/files/baby_socks_yellow.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h2>Yellow Baby Socks</h2>
                        <p>Nice pair of yellow socks</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default LandingPage;