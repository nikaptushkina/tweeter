/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1648427048474
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense, donc je suis"
      },
      "created_at": 1648513448474
    }
]

const createTweetElement = (data) => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const name = data.user.name;
  const handle = data.user.handle;
  const avatar = data.user.avatars;
  const time = timeago.format(data.created_at);
  const content = data.content.text;

  const html = `
  <article class="tweet">
          <div class="tweetHeader">
            <div class="nameImage">
              <image id="avatar1" src="${escape(avatar)}"></image>
              <span>${escape(name)}</span>
            </div> 
            <span>${escape(handle)}</span>
          </div>
          <p>${escape(content)}</p>
          <footer>
            <div>${escape(time)}</div>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
        `;

  return html;
}

const renderTweets = (data) => {
  const $tweetComponent = $('#tweets-container');
  // $tweetComponent.empty();

  for(const user of data) {
    const $tweet = createTweetElement(user);
    $tweetComponent.prepend($tweet);
  }
}

const loadTweets = () => {
  $.ajax({
    url: '/tweets/',
    method: 'GET',
    dataType: 'json',
    success: (tweets) => {
      renderTweets(tweets);
    },
    error: (err) => {
      console.log("error:", err);
    }
  });
};

$(document).ready(function() {
  $("#emptyMessage").hide();
  $("#tooLong").hide();

  $("#tweets-container").empty();

  loadTweets();

  $(".tweet-form").submit(function(e){
    e.preventDefault();
    $("#emptyMessage").slideUp();
    $("#tooLong").slideUp();

    const serializedTweet = $(".tweet-form").serialize();

    console.log("******$$$", serializedTweet);

    if (serializedTweet.slice(5) === "") {
      $("#emptyMessage").slideDown();
      $(".tweet-form").trigger("reset");
      return;
    }

    if (serializedTweet.slice(5).length > 140) {
      $("#tooLong").slideDown();
      $(".tweet-form").trigger("reset");
      return;
    }

    // $.post('/tweets/', serializedTweet, response => {
    //   $(".tweet-form").trigger("reset");
    //   $(".counter").text('140');
    //   loadTweets();
    // })
    $.ajax("/tweets/", {method: "POST", data: serializedTweet})
      .then(function(){
        //empty the container to avoid duplicate messages
        $("#tweets-container").empty();
        loadTweets();
        $(".tweet-form").trigger("reset");
    })
  });
  //renderTweets(tweetData);
});