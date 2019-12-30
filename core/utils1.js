const fs = require('fs')
const o= fs.readFileSync('/Users/moon/test_o','utf-8')
const d =fs.readFileSync('/Users/moon/test_d','utf-8')
const dess =[]
const a=[]
o.trim().split('\n').forEach(function(v, i) {
    const index = v.lastIndexOf("--")
    const des ="/**"+v.substr(index+2)+"*/"
    dess.push(des)
})
o.split('\n').forEach(function(v, i) {
    if(dess[i]){
        console.log("\t"+dess[i])
    }
    const index = v.lastIndexOf("--")
    const des =v.substr(0,index)+","
    console.log(des)
})