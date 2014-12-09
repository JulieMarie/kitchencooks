$( document ).ready(function() {

  var fb = new Firebase('https://hrr-kitchen.firebaseio.com/chats');

  //collects input from user, sends it to firebase server
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      fb.push({name: name, text: text});
      $('#nameInput').val('');
      $('#messageInput').val('');
    }
  });

  //collects any firebase data that is added
  fb.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });

  //jquery function to append dom elements to page
  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<strong/>').text(name+': ')).appendTo($('.chat'));
    $('.chat')[0].scrollTop = $('.chat')[0].scrollHeight;
  };

});