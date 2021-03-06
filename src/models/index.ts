
interface IUser {
    id?: string;
    username?: string
    displayName?: string
    email?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
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
    userId: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface ISentChannelMessage {
    id: string;
    channelId: string;
    messageId: string;
    userId: string;
    fromUserId: string; 
    createdAt: Date;
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
    displayName?: string;
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

export { 
    IUser, 
    IChannel, 
    IChannelMessage, 
    IConnection, 
    IAuthInfo, 
    ISubscriptionMessage, 
    IChannelMember,
    ISentChannelMessage
 }

