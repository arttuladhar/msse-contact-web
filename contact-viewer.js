var apiKey = "beak"
var _contacts = {};
var _contactID = null;


$(document).on('pagebeforeshow', '#contact-page', function() {
	contactList = $("#contactlist")

	//Starting with Fresh List
	contactList.html('')

	//Get Contacts from TinyApollo
	$.get("http://contacts.tinyapollo.com/contacts?key="+apiKey, function(result) {
		_contacts = {}
		for (i in result.contacts) {
			var contact = result.contacts[i]
			_contacts[contact._id] = contact
			contactList.append('<li><a href="#details-page" data-contact-id="' +
				contact._id + '">' +
				contact.name + 
				'</a></li>');				
		}
	contactList.listview('refresh')
	});

});

//OnClick Listener for ContactList
$(document).on('click', '#contactlist a', function() {
	var link = $(this)
	_contactID = link.data('contact-id')
	// alert ("Clicked : " + _contactID);
	return true
});


//Details Page Load
$(document).on('pagebeforeshow', '#details-page', function() {
	var contact = _contacts[_contactID]

	//Debug
	//$('.contact-details').text(contact.name + ' details')

	//Filling Table
	$('#name').text(contact.name)
	$('#title').text(contact.title)
	$('#email').text(contact.email)
	$('#phone').text(contact.phone)
	$('#twitterid').text(contact.twitterId)

});

//Edit Page Load
$(document).on('pagebeforeshow', '#edit-page', function() {
	var contact = _contacts[_contactID]
	console.log(contact)

	$("input[name=name]").val(contact.name);
	$("input[name=title]").val(contact.title);
	$("input[name=email]").val(contact.email);
	$("input[name=phone]").val(contact.phone);
	$("input[name=twitterid]").val(contact.twitterId);
	
});

//Click Event Handler for Update Page
$(document).on('click', "#updatecontact", function() {
	var contact = _contacts[_contactID]
	contactData = function(item) {
    return {
     	name: 		item.find('input[name=name]').val(),
     	title: 		item.find('input[name=title]').val(),
     	email: 		item.find('input[name=email]').val(),
     	phone: 		item.find('input[name=phone]').val(),
     	twitterId: 	item.find('input[name=twitterid]').val()
    };
  	};

	var url = "http://contacts.tinyapollo.com/contacts/" + contact._id + "?key=" + apiKey
	item = $(this).parents("#edit-contact");
	data = contactData(item);

	console.log(url);
	console.log(data);

	//Sending Via Ajax
	$.ajax({
		url: url,
		type: 'PUT',
		dataType: 'json',
		data: data,
		success: function(data) {
			if (data.status == 'success') {
				console.log ("Updated")
				location.reload();
			} else {
				alert (data.message);
			}
		}
	});

});

$(document).on('click', '#addcontact', function() {
	contactData = function(item) {
    return {
     	name: 		item.find('input[name=name]').val(),
     	title: 		item.find('input[name=title]').val(),
     	email: 		item.find('input[name=email]').val(),
     	phone: 		item.find('input[name=phone]').val(),
     	twitterId: 	item.find('input[name=twitterid]').val()
    };
  	};

  	var url = "http://contacts.tinyapollo.com/contacts?key=" + apiKey
  	item = $(this).parents("#add-contact");
  	data = contactData(item);

  	console.log(url);
  	console.log(data);

  	//Sending Via Ajax
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: data,
		success: function(data) {
			if (data.status == 'success') {
				console.log ("Contact Created")
				location.reload();
			} else {
				alert (data.message);
			}
		}
	});

});

$(document).on('click', '#deletecontact', function() {
	var data
	var contact = _contacts[_contactID];
	var url = "http://contacts.tinyapollo.com/contacts/" + contact._id + "?key=" + apiKey;
	console.log (url);

	//Sending Via Ajax
	$.ajax({
		url: url,
		type: 'DELETE',
		dataType: 'json',
		data: data,
		success: function(data) {
			if (data.status == 'success') {
				console.log ("Contact")
				location.reload();
			} else {
				alert (data.message);
			}
		}
	});

});