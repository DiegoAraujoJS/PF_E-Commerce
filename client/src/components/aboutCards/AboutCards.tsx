import React from 'react'
import AboutCard from "../aboutCard/AboutCard"
import bootstrap from "bootstrap"
import styles from "./AboutCards.module.css"
const AboutCards = () => {
    return (
        <div className={styles.backgroud}>
        <div className="container justify-content-center aling-items-center h-100">
            <div className="row">
                <div className="col-md-4">
            <AboutCard/>
            </div>
            <div className="col-md-4">
            <AboutCard/>
            </div>
            <div className="col-md-4">
            <AboutCard/>
            </div>
            </div>

        </div>

        </div>
    )
}

export default AboutCards
