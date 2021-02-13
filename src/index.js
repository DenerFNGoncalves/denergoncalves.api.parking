import App from './app'
import Server from './config'

(() => {
    const server = Server()

    App.use(server)
    server.listen(3037, _ => {
        console.log('server running')
    })
})()