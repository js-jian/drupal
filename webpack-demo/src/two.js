function two() {
    let ele = document.createElement("div")
    ele.innerHTML = "第二个入口文件"
    return ele
}

document.getElementById("root").appendChild(two())