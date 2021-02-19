import App from "./app"
import Server from "./config";

(() => {
  App.use(new Server()).start()
})()
