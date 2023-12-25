import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/AboutUS.css';

function AboutUS() {
    const theme = createTheme({
        typography: {
            fontFamily: 'Quicksand',
            body1: {
                fontWeight: '600',
                fontSize: 'large',
            },
        },
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (

        <div data-aos="fade-up">
            <ThemeProvider theme={theme}>
                <div>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

                    <section className="section services-section" id="services">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="section-title">
                                        <h2>About US</h2>
                                        <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-lg-12">
                                    <div className="feature-box-1">
                                        <div className="icon" >
                                            <i class="fa-solid fa-users"></i>
                                        </div>
                                        <div className="feature-content">
                                            <div className='mt-1 mb-1 my-div'>Mentors</div>
                                            <h5>Manoj Dhundhalva</h5>
                                            <h5>Jeet Patel</h5>
                                            <h5>Shashank Upadhyay</h5>
                                            <h5>Bhavya Shah</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <div className="feature-box-1">
                                        <div className="icon" >
                                            <i className="fa fa-desktop" ></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5>Unique design</h5>
                                            <p>Our website features an innovative and user-friendly interface that sets it apart. We've focused on creating an intuitive design, making navigation seamless and ensuring a delightful user experience.</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-6 col-lg-4">
                                    <div className="feature-box-1">
                                        <div className="icon">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5>Different Layout</h5>
                                            <p>Experience a seamless user journey with our website's diverse layouts, carefully crafted to suit various preferences and provide an engaging and dynamic browsing experience.</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-6 col-lg-4">
                                    <div className="feature-box-1">
                                        <div className="icon">
                                            <i className="fa fa-comment"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5>Make it Simple</h5>
                                            <p>Crafted with simplicity in mind, our website delivers a seamless and intuitive experience, ensuring effortless navigation and enjoyment for every user.</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-6 col-lg-4">
                                    <div className="feature-box-1">
                                        <div className="icon">
                                            <i className="fa fa-image"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5>Responsiveness</h5>
                                            <p> Experience our website seamlessly across devices with its responsive design, ensuring optimal viewing and interaction on desktops, tablets, and mobile phones for a user-friendly experience.</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-6 col-lg-4">
                                    <div className="feature-box-1">
                                        <div className="icon">
                                            <i className="fa fa-th"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5>Testing for Perfection</h5>
                                            <p>Experience perfection with our meticulously crafted website – undergoes rigorous testing to ensure seamless functionality, user-friendliness, and an impeccable online experience.</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-6 col-lg-4">
                                    <div className="feature-box-1">
                                        <div className="icon">
                                            <i className="fa fa-cog"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5>Advanced Options</h5>
                                            <p>Explore enhanced functionalities with our website's Advanced Options, offering customizable features to tailor your experience and meet your specific needs.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default AboutUS;