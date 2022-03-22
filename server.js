const http = require("http")
const path = require("path")
const fs =require("fs")

const server = http.createServer((req, res) => {
   
    // if(req.url === "/api/users"){
    //     // fs.readFile(
    //     //     path.join(__dirname, "public", "about.html"),
    //     //     (err, data) => {
    //     //         if(err) throw err

    //     //         res.writeHead(200, {"Content-type": "text/html"})
    //     //         res.end(data)
    //     //     })
    //     const users = [
    //         {name: "Bob Smith", age: 40},
    //         {name: "John Doe", age: 25},
    //     ]
    //     res.writeHead(200, {"Content-type": "application/json"})
    //     res.end(JSON.stringify(users))
    // }
    // else  if(req.url === "/"){
    //     fs.readFile(
    //         path.join(__dirname, "public", "index.html"),
    //         (err, data) => {
    //             if(err) throw err

    //             res.writeHead(200, {"Content-type": "text/html"})
    //             res.end(data)
    //         })
    // }
    // else{
    //     res.writeHead(400, {"Content-type": "text/html"})
    //     res.end(`<h1>Error error <br> ${(req.url).slice(1,)} doesnt exist or is deleter</h1>`)
    // }

    //build file path

    let filepath = path.join(__dirname, "public", req.url === '/'? "index.html": req.url )
    

    //getExtenion fo file
    let Xname = path.extname(filepath)
    let ContentType = "text/html"


    switch(Xname){
        case ".js": 
        ContentType = "text/javascript"
        break
        case ".css": 
        ContentType = "text/css"
        break
        case ".json": 
        ContentType = "application/json"
        break
        case ".png": 
        ContentType = "image/png"
        break
        case ".jpeg": 
        ContentType = "image/jpeg"
        break
    }

    //
    fs.readFile(filepath, (err, data) => {
        if(err){
            if(err.code == "ENOENT"){
                //page not found
                fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
                    res.writeHead(200, {"Content-type": "text/html"})
                     res.end(data, "utf-4")
                })
            }
            else{
                res.writeHead(500)
                res.end(`Server error: ${err.code}`)
            }
        }
        else{
            res.writeHead(200, {"Content-type": ContentType})
            res.end(data)
        }


    }
    
    )
})
const port = process.env.PORT || 5000
server.listen(port, () => {
    console.log("port runnung")
})