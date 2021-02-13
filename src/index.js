import App from "./app"
import Server from "./config";

(() => {
  const server = Server()

  App.use(server)
  server.listen(3037, () => {
    console.log("server running")
  })
  
})()
