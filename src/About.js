import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from './Header';


export class About extends Component {

    render() {
        return (
            <div>
                <Header hideDropDowns={true}></Header>

                <Container fluid={false}>
                    <Row>
                        <Col>
                            <h1>About ON City Books</h1>
                            <p>This Website provides visualizations and raw data for the Ontario Municipal Financial Information Return (FIR) data
                                collected by the Ontario government. That data exposes important financial and statistical information on 
                                municipalities to the public. Just as importantly it does so in a consistent manner across municipalities in Ontario.
                                The website was created because the raw FIR data provided by the Government of Ontario does not make it easy to compare
                                all the measures collected across different years and municipalities.
                            </p>
                            <h1>Disclaimer</h1>
                            <p>Information on this website should reflect what is available on the <a href="https://efis.fma.csc.gov.on.ca/fir">Ontario FIR website</a> (described below). That said,
                                there may be omissions or inaccuracies that result from translating that information to the formats displayed here. 
                                If you see a problem please <a href="https://github.com/johnhaldeman/on-city-books/issues">log an issue</a>.
                                </p>
                                <p>
                                This application is best used to help provide context to municipal financial news or to help
                                people ask questions about what is going on in the management of their cities. The financial information contained
                                here is less appropriately used solely as the basis to draw conclusions about municipal financial problems or successes.
                            </p>
                            <h1>Frequently Asked Questions</h1>
                            <p>This section contains a list of common concerns and questions</p>
                            <h2>Where is this data from?</h2>
                            <p>The data presented was retrieved from the Ontario FIR website located <a href="https://efis.fma.csc.gov.on.ca/fir">here</a>.</p>
                            <h2>Is the data up-to-date?</h2>
                            <p>We attempt to refresh the data weekly from the FIR. Unfortunately, the data there is often not made available by the 
                                municipalities as quickly as many would like.
                            </p>
                            <h2>Why is 2018 data for a municipality missing?</h2>
                            <p>Municipalities can only provide the data for a year once it is over. From there it is up to the city to compile and upload
                                the information which can take a while. How quickly that happens appears to be very inconsistent across municipalities.
                                Unfortunately, for certain municipalities it may be the end of 2019 before 2018 data will be provided.
                            </p>
                            <h2>I see a problem with the data/application, or I would like to request a new feature?</h2>
                            <p>Feel free to file an issue <a href="https://github.com/johnhaldeman/on-city-books/issues">here</a>.
                            </p>
                            <h2>Who built this website?</h2>
                            <p>This website is a hobby project built by John Haldeman who works in Information Security and Software Development in Windsor, Ontario.
                                You can connect with John 
                                on <a href="https://github.com/johnhaldeman">Github</a>, <a href="https://twitter.com/JLHaldeman">Twitter</a> or using <a href="https://www.linkedin.com/in/john-haldeman-1a106234/">LinkedIn</a>.
                            </p>
                            <h2>What technologies did you use?</h2>
                            <p>This Website uses:
                                <ul>
                                    <li> <a href="https://reactjs.org/">ReactJS</a> as it's Javascript view library</li>
                                    <li> <a href="https://getbootstrap.com/">Bootstrap</a> for CSS</li>
                                    <li> <a href="https://react-bootstrap.github.io/">React Bootstrap</a> to make it easy to use Bootstrap components in React</li>
                                    <li> <a href="https://d3js.org/">D3</a> for data visualizations and formatting</li>
                                    <li> <a href="https://reacttraining.com/react-router/">React Router</a> for routing in the app</li>
                                    <li> <a href="https://github.com/axios/axios">Axios</a> for easy JSX calls</li>
                                    <li> <a href="https://csv.js.org/">CSV for NodeJS</a> for CSV parsing</li>
                                    <li> A couple icons from <a href="https://fontawesome.com/license/free">Font Awesome</a> </li>
                                </ul>
                            </p>
                            
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


