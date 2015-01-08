this.Posts = new Mongo.Collection("posts");
this.Posts.attachSchema(new SimpleSchema({
  tagIds: {
    type: [String],
    label: "Tags",
    optional: true
  }
}));

if (Meteor.isClient) {
  UI.registerHelper("posts", function() {
    return Posts.find();
  });
}

if (Meteor.isServer) {
  Meteor.publish("posts", function() {
    return Posts.find();
  });


  Meteor.startup(function () {
    this.Posts.remove({})
    this.Posts.insert({tagIds: ["foo", "bar"]});
  });
}
