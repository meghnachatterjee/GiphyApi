
      // Initial array of animals
      var animals = ["cat", "dog", "rabbit", "lion","tiger","pig","elephant","cow","fox","bull"];

      // displayanimalInfo function re-renders the HTML to display the appropriate content
      function displayanimalInfo() {

          $("#animals-view").empty();

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=31ACAkYgalqKKzMdEHTwNh3YDlsjNGv9&q="+animal+"&limit=25&offset=0&rating=G&lang=en";

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            console.log(response);

          // Creating a div to hold the animal
          var animalDiv = $("<div class='animal'>");

         for (var a = 0; a < 10;a++){

          // Storing the rating data
          var rating = response.data[a].rating;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          animalDiv.append(pOne);

          // Retrieving the URL for the image
          var imgURL = response.data[a].images.original_still.url;
          var gifImgURL = response.data[a].images.downsized.url;

          // Creating an element to hold the image

       
            var image = $("<img>").attr("src", imgURL);
            image.attr('id', 'q' + a);
            

           // Appending the image
           animalDiv.append(image);
 
           // Putting the entire animal above the previous animals
           $("#animals-view").append(animalDiv);
        
 
         $("#q"+ a).on("click", function() {
             $(this).attr("src", gifImgURL);
         });

         //Ending the for loop
         }


        });

      }

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a animal button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "animal-btn"
      $(document).on("click", ".animal-btn", displayanimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    