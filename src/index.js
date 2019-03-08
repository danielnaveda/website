import React from "react"
import ReactDOM from "react-dom"

import ApiCall from './apicall'

ReactDOM.render(
    <div>
        <ApiCall endpoint="http://localhost:8081/endpoint/private" button="private"/>
        <ApiCall endpoint="http://localhost:8081/endpoint/public"button="public"/>
        <ApiCall endpoint="http://localhost:8081/login"button="login"/>
    </div>
    ,
    document.getElementById("root")
)
