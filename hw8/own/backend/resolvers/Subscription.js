const Subscription = {
  chatBox: {
    subscribe(parent, {name}, { pubsub }, info) {
      // console.log(name)
      return pubsub.asyncIterator(`chatBox ${name}`);
    },
  },
};

export { Subscription as default };
