var apiKey = "admin"
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
	alert ("Clicked : " + _contactID);
	return true
});

//OnClick Listener for Edit
$(document).on('click', '#', function() {


}




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