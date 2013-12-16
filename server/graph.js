Meteor.publish('nodesSubscription', function () {
  return Nodes.find();
});
Meteor.publish('linksSubscription', function () {
  return Links.find();
});