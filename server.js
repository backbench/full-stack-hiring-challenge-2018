const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require("path")
const mkdirp = require("mkdirp")
const rimraf = require('rimraf')


//console.log("working without error")
const app = express()

var dir =  process.cwd()
console.log(dir)
app.use(express.static(dir)); //current working directory
app.use(express.static(__dirname)); //module directory
var server = http.createServer(app).listen(3000, function() {
  console.log("server started at port 3000")
})

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        info.type = "file";
    }

    return info;
}

app.get('/browse', function(req, res) {
    var data = dirTree(dir)
    //console.log("data sent")
     res.json(data)
});

app.get('/', function(req, res) {
  res.redirect('public/index.html')
})

app.get('/create/', function(req, res) {
  const recievedPath = req.query.path
  const dir = process.cwd()
  const filePath = `${dir}/${recievedPath}`
  //console.log(fs.lstatSync(`${dir}/${filepath}`).isDirectory())
  console.log(path.basename(filePath))
  const ext = filePath.substr(filePath.lastIndexOf('.') + 1)
  console.log(ext)
  if(ext === filePath) {
    console.log(filePath)
    mkdirp(filePath, function (err) {
      if (err) console.error(err)
      else console.log('pow! folder created')
  })
  } else {
    fs.writeFile(filePath," ", function(err){
      if (err) console.error(err)
      else console.log('pow! file created')
    })
  }
  res.end()
})

app.get('/delete', function(req, res) {
  const recievedPath = req.query.path
  const dir = process.cwd()
  const filepath = `${dir}/${recievedPath}`
  //console.log(fs.lstatSync(`${dir}/${filepath}`).isDirectory())
  console.log(path.basename(filepath))
  fs.stat(filepath, function (err, stats) {
  // console.log(stats)
   if (err) {
       return console.error(err);
   }
   rimraf(filepath, function () { console.log('pow! file deleted'); });
})
  res.end(filepath)
})
