/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function(){

  $('[action="/tweet-submit"]').on('submit', function(event) {
    event.preventDefault();
    var text = $(this).serialize();
    var text = text.slice(5);
    if(text === ""){
      alert("No Tweet");
    }
    if(text.length > 140){
      alert("Too many characters bro!");
    } else {
  //  validateForm(event);
    $.ajax({
      url: "/tweets",
      method: "post",
      data: $(this).serialize()
    }).then(function(){
        loadTweets();
      });
    }
  });

  function loadTweets() {
    event.preventDefault();
    $.ajax({
      url: "/tweets",
      method: "get",
      success: function(tweets){
        renderTweets(tweets);
      }
    })
  }

   function renderTweets(tweets) {
    $(".tweets-container").empty();
    tweets.forEach(function(uniqueTweet){
      var newTweet = createTweetElement(uniqueTweet);
      $(".tweets-container").append(newTweet);
      })
    }

   function createTweetElement(tweet){
     var $tweet      = $("<article>").addClass("tweet");
  //creates the header
     var $avatar     = $("<img>").attr("src", tweet.user.avatars.small);
     var $h3         = $("<h3>").text(tweet.user.name);
     var $handle     = $("<span>").addClass("handle").text(tweet.user.handle);
     var $header     = $("<header>").append($avatar).append($handle).append($h3);
     $tweet.append($header);
  //creates the container
     var $content    = $("<span>").addClass("content").text(tweet.content.text);
     var $div        = $("<div>").addClass("content-container");
     $div.append($content)
     $tweet.append($div);
  //creates the footer
     var $created_at = $("<span>").addClass("created_at").text(tweet.created_at);
    //  var $icon       = $("<i class="fa fa-flag" aria-hidden="true"></i>").addClass("");
      //  <i class="fa fa-retweet" aria-hidden="true"></i>
      //  <i class="fa fa-heart" aria-hidden="true"></i>
     var $footer     = $("<footer>").append($created_at);
     $tweet.append($footer);
  //return the final product
     return $tweet;
      }

    loadTweets();

      $("#slideToggle").click(function() {
        $(".new-tweet").slideToggle();
      });

 });
