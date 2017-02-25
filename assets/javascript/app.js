$(document).ready(function() {

// create a reaction based on a click
    $('button').on('click', function() {
        var animal = $(this).data('name');
        // refer to the information from the API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific button being clicked
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function(response) {


                console.log(response)

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    // Creating a div to hold the animal
                    var animalDiv = $('<div/>');

                    // Store the rating data in a dynamically created p tag
                    var p =$('<p/>');

                    // reference where the rating info is coming from
                    p.text(results[i].rating);

                    // create a new img element for each gif
                    var animalImage = $('<img/>');

                    animalImage.addClass('anImg')

                    // adjust the attributes to fixed height for a uniform feel across the gifs that are called on
                    animalImage.attr('src', results[i].images.fixed_height.url);

                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)

                    animalImage.attr('data-animate', results[i].images.fixed_height.url)

                    .attr('data-state', 'still');

                    // append the p to the end
                    animalDiv.append(p);
                    // append the img to the end
                    animalDiv.append(animalImage);
                    // place the results of the newest animal button clicked first, before past results 
                    animalDiv.prependTo($('#gifs'));
                }

                // adjust what happens when each gif is clicked to start and stop between animate and still
                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state');
                    // Show the results in the console
                    console.log(this);
                    // if/else statement to determine which state an img is in
                    if (state == 'still') {
                    
                    $(this).attr('src', $(this).data('animate'));
                    
                    $(this).attr('data-state', 'animate');

                    } else {
                            
                    $(this).attr('src', $(this).data('still'));
                    
                    $(this).attr('data-state', 'still');
                    }      
                });
            });
    });


    // Create an array to house the animal buttons
    var animals = [''];

        $('#addButton').on('click', function(){
            var animalButton = $("#animal-input").val();
            //adds and dynamically creates the new animal button

            var newButton = $("<button/>").addClass("btn btn-info animal").attr('data-name',animalButton).html(animalButton);
            
            // add the button to the end of the list of buttons
            $("#animalbuttons").append(newButton);
                console.log("Success");

            // reference information from the API
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalButton + "&api_key=dc6zaTOxFJmzC&limit=10";
                console.log(animalButton);

            // Create an ajax call for the button being created
            $.ajax({
            url: queryURL,
            method: 'GET'
            })

            .done(function(response) {

            var results = response.data;

            // run a loop to filter through the response data
                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div/>');

                    var p =$('<p/>');

                    p.text(results[i].rating);

                    var animalImage = $('<img/>');

                    animalImage.addClass('anImg')

                    animalImage.attr('src', results[i].images.fixed_height_still.url);

                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)

                    animalImage.attr('data-animate', results[i].images.fixed_height.url)

                    .attr('data-state', 'still');

                    animalDiv.append(p);

                    animalDiv.append(animalImage);

                    animalDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    console.log(this);

                    if (state == 'still') {
                    
                    $(this).attr('src', $(this).data('animate'));
                    
                    $(this).attr('data-state', 'animate');

                    } else {
                            
                    $(this).attr('src', $(this).data('still'));
                    
                    $(this).attr('data-state', 'still');
                    }      
                });
            });

            // Return a false value once the button has been created
            $("#animal-input").val("");
            return false;
        })
  
});