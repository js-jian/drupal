// module.exports = function() {
//     let hello = document.createElement("div")
//     hello.innerHTML = "Long time to see"
//     return hello
// }

import React, { Component } from "react";

let name = "Albert"

export default class Hello extends Component {
    render() {
        return (
            <div>{name}</div>
        )
    }
}