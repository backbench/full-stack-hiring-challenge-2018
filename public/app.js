$(document).ready( function () {

  var dialog = $("#dialog" ).dialog({
      autoOpen: false,
      height: 200,
      width: 350,
      modal: true,
      title: 'Enter the path here',
      height: "auto",
    buttons: [
        {
            id: "b",
            text: "Submit",
            click: function() {
            let val = $("#target").val()
            console.log(val)
            $.get(`/create`, { path: val}).then(function(data) {
              console.log(data)
            })
            $(this).dialog("close")
            window.location.reload(true)
            }
        },
        {
            id: "d",
            text: "Delete",
            click: function() {
              let val = $("#target").val()
              console.log(val)
              $.get(`/delete`, { path: val}).then(function(data) {
                console.log(data)
              })
                $(this).dialog("close")
                window.location.reload(true)
            }
        }
    ]
    });

//used jquery tree plugin for tree like displau

   $.get('/browse').then(function(data){
     data  = [
       data
     ]
      $('#tree1').tree({
           data: data
       });
        console.log(data)
})

$( "#button" ).on( "click", function(e) {
  e.preventDefault()
   dialog.dialog( "open" )
   $("#d").button("disable")
   $("#b").button("enable")
 });

$("#delete").on('click', function(e){
  e.preventDefault()
  dialog.dialog("open")
  $("#b").button("disable")
   $("#d").button("enable")
})
})
