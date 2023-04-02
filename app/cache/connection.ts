import { createClient } from 'redis';

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST_NAME,
        port: Number(process.env.REDIS_PORT)
    },
});
async function initialize(): Promise<void> {
    await client.connect();
    client.on("connect", function () {
        console.log("Connection Successful!!");
    });
    client.on('error', err => {
        console.log('Error ' + err);
    });
};
initialize();
export default client;
