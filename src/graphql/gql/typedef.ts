

const typedef = `
type Query {
  getChannelMessages(channelId: String!, limit: Int!): [ChannelMessage]
  getChannels(limit: Int!): [Channel]
}

type Mutation {
  createChannel(title: String!, memberIds: [String]) : Channel
  addMemberChannel(channelId: String!, memberIds: [String]!) : Channel
  publishChannelMessage(channelId: String!, payload: String!): ChannelMessage
}

type Subscription {
  channel(channelId: String!): SubscriptionMessage
}
type SubscriptionMessage {
  channel: Channel
  message: [ChannelMessage]
  createdAt: Date
}

`

export default typedef