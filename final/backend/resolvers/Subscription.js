const Subscription = {
  activity: {
    subscribe(parent, props, { pubsub }, info) {
      // console.log(name)
      return pubsub.asyncIterator(`activity`);
    },
  },
  video: {
    subscribe(parent, props, { pubsub }, info) {
      return pubsub.asyncIterator('video');
    },
  },
  user: {
    subscribe(parent, props, { pubsub }, info) {
      return pubsub.asyncIterator('user');
    },
  },
};

export { Subscription as default };
