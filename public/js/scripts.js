$(function() {
  smoothScroll(300);
  workBelt();
  workLoad();
  client();
});

function smoothScroll (duration) {
  $('a.thumb-unit').on('click', function(event) {
    var target = $($(this).attr('href'));

    if(target.length) {
      console.log(target.length);
      event.preventDefault();
      $('html,body').animate( {
        scrollTop: target.offset().top
      }, duration);
    }
  });
}

function workBelt() {
  $('a.thumb-unit').click(function(e) {
      $('.work-belt').css('left', '-100%');
      $('.work-container').show();
      e.preventDefault();
  });

  $('svg.back-icon').click(function(e) {
    $('.work-belt').css('left', '0%');
    $('.work-container').hide(800);
    e.preventDefault();
  });
}

// Loader
function workLoad() {
  $.ajaxSetup({cache: true});

  $('.thumb-unit').click(function() {

    var self = $(this),
    newTitle = self.find('div.text-overlay h4').text(),
    author = self.find('div.text-overlay h5').text(),
    spinner = '<div class="loader">Loading...</div>',

    newFolder = self.data('folder'), // refers to data-folder="work-1" inside of the portfolio section
    newHTML = '../loaders/'+ newFolder +'.html'; // loads a specific project on click
    $('.project-load').html(spinner).load(newHTML);
    $('.project-name').text(newTitle);
    $('.author').text(author);

  });
}
// Image Indicators
function client() {
  $('.client-unit').first().addClass('active-client');
  $('.client-logo').first().addClass('active-client');

  $('.client-logo').click(function(){
    var self = $(this), //client-logo
    siblings = self.parent().children(), // siblings of client-logo
    position = siblings.index(self);
    $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
    siblings.removeClass('active-client');
    self.addClass('active-client');

  });

  $('.client-control-next, .client-control-prev').click(function(){
    var self = $(this),
    activeClient = $('.clients-belt').find('.active-client'),
    position = $('.clients-belt').children().index(activeClient);
    clientNum = $('.client-unit').length;

    if(self.hasClass('client-control-next')){

      if (position < 3) {
        $('.active-client').removeClass('active-client').next().addClass('active-client');
        console.log("Next");
      } else {
        $('.client-unit').removeClass('active-client').first().addClass('active-client');
        $('.client-logo').removeClass('active-client').first().addClass('active-client');
      }

    } else {
      if (position === 0){
        $('.client-unit').removeClass('active-client').last().addClass('active-client');
        $('.client-unit').removeClass('active-client').last().addClass('active-client');
      } else {
        $('.active-client').removeClass('active-client').prev().addClass('active-client');
      }
    }

  });
}
