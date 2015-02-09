'use strict';

$(function () {
  var User = function (first_name, last_name, age) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
  };
  User.prototype.create_html = function (index) {
    return '<tr><td>' +
            (index + 1) + '</td><td>' +
            this.first_name + '</td><td>' +
            this.last_name + '</td><td>' +
            this.age + '</td><td>' +
            '<a class = "edit" href="#" data-index="' + index +
              '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>&nbsp;' +
            '<a class = "remove" href="#" data-index="' + index +
              '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>' + '</td></tr>';
  };

  var users = [];
  var edited = false;

  $('#save').on('click', function() {
    var first_name = $('#first_name');
    var last_name = $('#last_name');
    var age = $('#age');

    if (first_name.val().length === 0) {
      alert("First name can't be blank");
      return false;
    }
    if (last_name.val().length === 0) {
      alert("Last name can't be blank");
      return false;
    }
    if ((age.val() <= 0)) {
      alert("Age should be greater than 0");
      return false;
    }

    if (edited) {
      users[edited].first_name = first_name.val();
      users[edited].last_name = last_name.val();
      users[edited].age = age.val();
      edited = false;
    } else {
      users.push(new User(first_name.val(), last_name.val(), age.val()));
    }
    first_name.val('');
    last_name.val('');
    age.val('');
    render();
    return false;
  });

  $('body').on('click', '.remove', function () {
    users.splice(this.dataset.index, 1);
    render();
    return false;
  });

  $('body').on('click', '.edit', function () {
    edited = this.dataset.index;
    $('#first_name').val(users[edited].first_name);
    $('#last_name').val(users[edited].last_name);
    $('#age').val(users[edited].age);
    return false;
  });

  function render(){
    $('tbody').html('');
    users.forEach(function(user, index) { $('tbody').append(user.create_html(index)); })
  }
});