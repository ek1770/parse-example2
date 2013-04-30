Parse.initialize("LLHx2XYQ6XLq1ZZj8YEP0iqorXoKtORMIixYEKNt", "Gz8k5NT2CsV19kAxWFKy5mBxjmsq8QnVmIS5JPUE");
 
Recipe = Parse.Object.extend('Recipe');
recipe = new Recipe()


$(document).ready(function(){

  var query = new Parse.Query(Recipe);
  query.find({
    success:function(results) { 
      
      // Save all my recipes in window.recipes
      window.recipes = results;
      
      // render all the recipes into the page
      renderRecipeList(results)

      console.log('Successfully retrieved ' + results.length);
      },
      error: function(object, error) {
        console.log('ERROR! Try again' + error.code + error.message)
      }
    
  });

});

// This renders an array of recipes into the page
var renderRecipeList = function(recipes) {
  console.log('Here are my recipes: ', recipes);

  // loop through the array, and put each object's name 
  // into an <li> in the page.
  for(var i = 0; i < recipes.length; i++) {
    var id = recipes[i].id
    var name = '<h3>' + recipes[i].get('name') + '</h3>';
    var description = '<p>' + recipes[i].get('description') + '</p>';

    // $('.js-recipes-container ul').append('<li>'+name+description+'</li>');

    var li = $('<li id="' + id + '">'+name+description+'</li>').click(function(){
      var id = $(this).attr('id');
      console.log(id);

      query = new Parse.Query(Recipe)

      query.get(id,{
        success: function(result) {
          // do something here
          console.log(result.get('name'))
          renderSingleRecipe(result)
          editRecipe(result)
        } 
      })
      // console.log('i =', i)
      // console.log(recipes[i].get('name'))
    });
    $('.js-recipes-container ul').append(li);
  }
}


// render just one recipe
var renderSingleRecipe = function(recipe) {
  $('.js-recipes-container').hide();
  var name = '<h3>' + recipe.get('name') + '</h3>';
  var description = '<p>' + recipe.get('description') + '</p>';
  $('.js-single-recipe').html(name + description);
  $('.js-single-recipe').show() 

  
}

// edit recipe button
var editRecipe = function(recipe) {
  $('.js-edit-recipe').click(function(){
    $('.js-single-recipe').hide()
    $('.js-edit-page').show()
  })
}
