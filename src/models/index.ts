
interface User {
    id: string;
    username: string
    email: string;
    mobileNumber: string;
    password: string;
    created: Date;
    updated: Date;
    deleted: Date;
}

interface Channel {
    id: string;
    title: string;
    description: string;
    memberIds: [string];
    userId: string;
    created: Date;
    updated: Date;
    deleted: Date;
}

interface ChannelMessage {
    channelId: string,
    payload: string,
    targetIds: [string],
    targetSent: [Date],
    userId: string,
    created: Date;
    updated: Date;
    deleted: Date;
}

interface Connection {
    id: string,
    clientId: string,
    userId: string,
    isConnected: boolean,
    created: Date;
    updated: Date;
}


export { User, Channel, ChannelMessage, Connection }

