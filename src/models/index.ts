
interface IUser {
    id: string;
    username: string
    email: string;
    mobileNumber: string;
    password: string;
    created: Date;
    updated: Date;
    deleted: Date;
}

interface IChannel {
    id: string;
    title: string;
    description: string;
    memberIds: [string];
    userId: string;
    created: Date;
    updated: Date;
    deleted: Date;
}

interface IChannelMessage {
    channelId: string;
    payload: string;
    targetIds: [string];
    targetSent: [Date];
    userId: string;
    created: Date;
    updated: Date;
    deleted: Date;
}

interface IConnection {
    id: string;
    clientId: string;
    userId: string;
    isConnected: boolean;
    created: Date;
    updated: Date;
}

interface IAuthInfo {
    id: string;
    connected: Date;
    name: string;
}


export { IUser, IChannel, IChannelMessage, IConnection, IAuthInfo }

