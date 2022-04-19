import {app} from './app';
import { port } from './config';

app.listen(port, (): void => {
    console.log("server running on " + port)
})