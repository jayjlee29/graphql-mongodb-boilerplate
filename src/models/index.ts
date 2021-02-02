
interface IUser {
    id: string;
    username: string
    email: string;
    mobileNumber: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

interface IChannel {
    id: string;
    title: string;
    description: string;
    memberIds: [string];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

interface IChannelMessage {
    channelId: string;
    payload: string;
    targetIds: [string];
    targetSent: [Date];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

interface IConnection {
    id: string;
    clientId: string;
    userId: string;
    isConnected: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface IAuthInfo {
    id: string;
    connectedAt: Date;
    name: string;
}

interface ISubscriptionMessage {
    channel: IChannel;
    message: [IChannelMessage];
    createdAt: Date;
}

export { IUser, IChannel, IChannelMessage, IConnection, IAuthInfo, ISubscriptionMessage }

