const http = require("http");
const fs = require("fs");

let homeCount = 0,
  indexCount = 0,
  aboutCount = 0,
  errorCount = 0,
  currentCount = 0;

const server = http.createServer((req, res) => {
  let url = req.url.split("/")[1];
  console.log(req.url);

  req.on("data", (data) => {
    console.log("data");
    console.log(data.toString());
  });

  if (url !== "styles.css" && url !== "main.js" && url !== "favicon.ico") {
    switch (url) {
      case "index":
      case "about":
        req.on("end", () => {
          if (url === "index") {
            indexCount++;
            currentCount = indexCount;
          } else {
            aboutCount++;
            currentCount = aboutCount;
          }
          fs.readFile("./views/" + url + ".html", "utf8", (err, data) => {
            res.setHeader("Content-type", "text/html");
            if (err) {
              console.log(err.message);
              res.write("Server Error");
              res.end();
            } else {
              res.write(data);
              res.write(
                "<script>let container = document.querySelector('.middle');let para = document.createElement('p');para.innerText =" +
                  currentCount +
                  ";container.appendChild(para)</script>"
              );
              res.end();
            }
          });
        });
        break;
      case "":
        req.on("end", () => {
          homeCount++;
          currentCount = homeCount;
          fs.readFile("./views/home.html", "utf8", (err, data) => {
            res.setHeader("Content-type", "text/html");
            if (err) {
              console.log(err.message);
              res.write("Server Error");
              res.end();
            } else {
              res.write(data);
              res.write(
                "<script>let container = document.querySelector('.middle');let para = document.createElement('p');para.innerText =" +
                  currentCount +
                  ";container.appendChild(para)</script>"
              );

              res.end();
            }
          });
        });
        break;
      default:
        req.on("end", () => {
          errorCount++;
          currentCount = errorCount;
          fs.readFile("/views/error.html", "utf8", (err, data) => {
            res.setHeader("Content-type", "text/html");
            if (err) {
              console.log(err.message);
              res.write("Server Error");
              res.end();
            } else {
              res.write(data);
              res.end();
            }
          });
        });
        break;
    }
  } else if (url === "styles.css") {
    fs.readFile("./views/styles.css", "utf8", (err, data) => {
      if (err) {
        console.log(err.message);
        res.write("Server Error");
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  }
  // else if(url==="main.js"){
  //     fs.readFile("./views/main.js", "utf8", (err, data) => {
  //       if (err) {
  //         console.log(err.message);
  //         res.write("Server Error");
  //         res.end();
  //       } else {
  //     console.log(data)

  //     data.replaceAll("somCount","Visitors Count: "+currentCount)
  // console.log(data)
  //         res.write(data);
  //         res.end();
  //       }
  //     });

  // }
  else {
    return;
  }
});

server.listen("8000", "localhost", () => {
  console.log("Server is listening at 8000");
});
