import {app,port} from './app'
app.listen(port, (): void => {
    console.log("server running on " + port)
})