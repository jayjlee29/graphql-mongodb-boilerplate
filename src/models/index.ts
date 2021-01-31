
interface User {
    userId: String;
    username: String
    email: String;
    mobileNumber: String;
    password: String;
    created: Date;
    updated: Date;
    deleted: Date;
}

interface Channel {
    title: string;
    description: string;
    memberIds: [string];
    userId: string;
    created: Date;
    updated: Date;
    deleted: Date;
}

interface ChannelMessage {
    channelId: String,
    payload: String,
    targetIds: [String],
    targetSent: [Boolean],
    created: Date;
    updated: Date;
    deleted: Date;
}

interface Connection {
    id: String,
    isConnected: Boolean,
    created: Date;
    updated: Date;
    deleted: Date;
}


export { User, Channel, ChannelMessage, Connection }

