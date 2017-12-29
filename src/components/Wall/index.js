import React, {Component} from "react";
import {Experience} from "../WallComponents";
import "./index.css";

class Wall extends Component {
    render() {
        const {experiences} = this.props;
        const experiencesList = experiences.map(el => (<Experience key={el._id} experience={el}/>));
        return <main>{experiencesList}</main>;
    }
}

export default Wall;
