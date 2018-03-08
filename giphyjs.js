
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
            var results = response.data;
          // Creating a div to hold the animal
          var animalDiv = $("<div class='animal'>");
         for (var a = 0; a < 10; a++){
          // Storing the rating data
          var rating = results[a].rating; 
          if(rating!=='r'&& rating !=='pg-13'){
          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);
          // Retrieving the URL for the image
          var imgURL = results[a].images.fixed_width_small_still.url;
          var gifImgURL = results[a].images.fixed_width_small.url;
          // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
            image.addClass("animalClass");
            image.attr("data-state","still");
            image.attr("data-still",imgURL);
            image.attr("data-animate",gifImgURL);

           //var imgID =  image.attr('id', 'q' + a);
            
           // Displaying the rating
          animalDiv.append(pOne);

          // Appending the image
           animalDiv.append(image);
 
          // Putting the entire animal above the previous animals
           $("#animals-view").append(animalDiv);
        
           //$('#q'+a).on("click",function(results,a) {
           //  console.log(results[a]);
           // $(this).attr("src", results[a].images.fixed_width.url);
            
         //});
       
        //Ending the if loop
      }
         //Ending the for loop
         }

        // $(document).on("click", ".animalClass", onClickImage);
        // function onClickImage(image,imgURL,imgID){
        // console.log(image);
         //console.log(imgURL);
         //console.log(imgID);
         // $(this).attr("src", results[a].images.fixed_width.url);
        //}
        });

      }

      //function onClickImage(image,imgURL,imgID){
        //console.log(imgID);
        //$(this).attr("src", results[a].images.fixed_width.url);
      //}

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var b = $("<button>");
          // Adding a class of animal-btn to our button
          b.addClass("animal-btn");
          // Adding a data-attribute
          b.attr("data-name", animals[i]);
          // Providing the initial button text
          b.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(b);
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
      $(document).on("click", ".animalClass", pausePlayGifs);



      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    
      function pausePlayGifs() {
        var state = $(this).attr("data-state");
         if (state === "still") {
           $(this).attr("src", $(this).attr("data-animate"));
           $(this).attr("data-state", "animate");
         } else {
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
     }
   }
   
   