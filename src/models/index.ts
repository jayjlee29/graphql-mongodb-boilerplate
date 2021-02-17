
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
    status: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

interface IChannelMessage {
    id: string;
    channelId: string;
    payload: string;
    targetIds: string[];
    targetSent: Date[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

interface IChannelMember {
    id: string;
    channelId: string;
    memberId: string;
    userId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    
}
interface IConnection {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt?: Date;
    ws: any;
}

interface IAuthInfo {
    id: string;
    name?: string;
    sub?: string;
    connectedAt: Date;
    createdAt: Date;
    expireAt?: Date;
}

interface ISubscriptionMessage {
    channel: IChannel;
    message: IChannelMessage[];
    targets: IChannelMember[];
    createdAt: Date;
}

export { IUser, IChannel, IChannelMessage, IConnection, IAuthInfo, ISubscriptionMessage, IChannelMember }

