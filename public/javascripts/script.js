$( document ).ready(function($){ 
    function processForm(e){ 
        $('.red-msg').hide();
        $('.green-msg').hide();
        console.log("process form started");
        $('.red-msg').hide();
        $('green-msg').hide();
        var errorCounter = 0;
        var inputs = $('input');
        var select = $('select');
        var textarea = $('textarea');
        function checkForm(domElem) {
          $.each(domElem, function(index, value){
            if (value.checkValidity() === false) {
                errorCounter += 1;
                console.log("error #:" +errorCounter);
                if($(this).is('textarea')) {
                    $(this).after('<p class="red-msg"> This is a required field</p>');
                } else {
                    $(this).after('<span class="red-msg">    x This is a required field</span>');
                }                
            } 
          });
        }
        checkForm(inputs);
        checkForm(select);
        checkForm(textarea);
        
        if(errorCounter > 0) {
        console.log("if statement showing errors:" + errorCounter);
          $('.msg').last().text('Check the errors above').addClass('red-msg');
          return;
        } else {
            var timeStamp = new Date();
            $.ajax({ 
            url: '/dives/', 
            type: 'POST', 
            data: {
                "name": $('#name').val(),
                "title": $('#title').val(),
                "date": timeStamp,
                "where": $('#country option:checked').text(),
                "type": $('input[name=exp]:checked').val(),
                "description": $('#desc').val()
            },
            success: function(data){
            //on response from server, add new post 
            var newPost = "";
            newPost = '<div class="' + data.type + '"></div><article class="submission">' +
            '<h3>' + data.title + '<span class="small">    in ' + data.where + '</span><span class="small" style="color:black;"> by ' + data.name + '</span>' +
            '<br><span class="small" style="color: black;">' + data.date.toString().substring(0, data.date.toString().indexOf(':') - 2) +  
            '</span></h3><p style="margin: 10px 0 25px 0;">' + data.description + '</p></article>';
            $('#userSubmissions').after(newPost);
            //hide red error messages and show green submission message
            $('.red-msg').hide();
            $('.msg').last().text("Thanks for submitting the form. Check out your post below!").addClass('green-msg').show();
            //reset form to blank
            $('#name').val("");
            $('#title').val("");
            $('#country').val("");
            $('textarea').val("");
            return false;
            }
            }); 
        
         }
      e.preventDefault();
    }
    $('#submit-btn').on("click", processForm ); 
});

/*
(function (global) {
    'use strict';
  var DiveList = function(domID) {
    this.container = document.getElementByID(domID);
    this.name = document.getElementByID('name');
    this.title = document.getElementByID('title');

    this.input = "";
    this.post = "";
    this.divelist = "";
    if (this.container === null) {
        throw {
            name: 'BadID',
            message: 'An element with the ID of ' + domId + ' does not exist'
        };
    } else {
    this.render();
    }
  };
  DiveList.prototype.render = function() {
    this.container.innerHTML = "";
    var self = this;
    var dives = [];
    var addDive = function(e) {
        
        $.ajax({
            url: "/dives/",
            method: "POST",
            dataType: 'json',
            data: {
                name: $('#name').val(),
                title: $('#title').val(),
                date: "new Date()",
                location: "Jonah's appt.",
                type: $('input[name=exp]:checked').val(),
                description: $('#desc').val()

            }}).success(function(data){
                //self.render();
                console.log("success with submitting data");
            })
            e.preventDefault();
          }

     $.ajax({
        url:"/dives/",
        method:"GET",
    }).success(function(data) {
        dives = data;
        $('button').submit(addDive);  
    });
  };
  $('button').submit(addDive);
  global.DiveList = DiveList;
}(window || this));





/*
var pixGrid = function() {
    function centerImage(theImage) {
        var myDifX = (window.innerWidth - theImage.width) / 2, myDifY = (window.innerHeight - theImage.height) / 2;
        return theImage.style.top = myDifY + "px", theImage.style.left = myDifX + "px", 
        theImage;
    }
    var myNode = document.querySelector(".pixgrid");
    myNode.addEventListener("click", function(e) {
        if ("IMG" === e.target.tagName) {
            var myOverlay = document.createElement("div");
            myOverlay.id = "overlay", document.body.appendChild(myOverlay), myOverlay.style.position = "absolute", 
            myOverlay.style.top = 0, myOverlay.style.backgroundColor = "rgba(0,0,0,0.7)", myOverlay.style.cursor = "pointer", 
            myOverlay.style.width = window.innerWidth + "px", myOverlay.style.height = window.innerHeight + "px", 
            myOverlay.style.top = window.pageYOffset + "px", myOverlay.style.left = window.pageXOffset + "px";
            var imageSrc = e.target.src, largeImage = document.createElement("img");
            largeImage.id = "largeImage", largeImage.src = imageSrc.substr(0, imageSrc.length - 7) + ".jpg", 
            largeImage.style.display = "block", largeImage.style.position = "absolute", largeImage.addEventListener("load", function() {
                this.height > window.innerHeight && (this.ratio = window.innerHeight / this.height, 
                this.height = this.height * this.ratio, this.width = this.width * this.ratio), this.width > window.innerWidth && (this.ratio = window.innerWidth / this.width, 
                this.height = this.height * this.ratio, this.width = this.width * this.ratio), centerImage(this), 
                myOverlay.appendChild(largeImage);
            }), largeImage.addEventListener("click", function() {
                myOverlay && (window.removeEventListener("resize", window, !1), window.removeEventListener("scroll", window, !1), 
                myOverlay.parentNode.removeChild(myOverlay));
            }, !1), window.addEventListener("scroll", function() {
                myOverlay && (myOverlay.style.top = window.pageYOffset + "px", myOverlay.style.left = window.pageXOffset + "px");
            }, !1), window.addEventListener("resize", function() {
                myOverlay && (myOverlay.style.width = window.innerWidth + "px", myOverlay.style.height = window.innerHeight + "px", 
                myOverlay.style.top = window.pageYOffset + "px", myOverlay.style.left = window.pageXOffset + "px", 
                centerImage(largeImage));
            }, !1);
        }
    }, !1);
}();
*/