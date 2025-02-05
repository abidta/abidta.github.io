$(window).on("load", function () {
  $("#loading").hide();
});

// Type Writer
var typed3 = new Typed("#typed3", {
  strings: [
    "Full Stack Developer^2000",
    "Open Sourcerer^2000",
    "Software Architect^2000",
    "System Designer",
    "Web Developer^2000",
    "Freelancer^2000",
  ],
  typeSpeed: 50,
  backSpeed: 50,
  smartBackspace: true, // this is a default
  loop: true,
});
//nav bar shrink
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("head-bar").style.background = "rgba(0, 0, 0, 0.9)";
  } else {
    document.getElementById("head-bar").style.background = "none";
  }
}

//form validation

$(document).ready(function () {
  $("#contact-form").validate({
    rules: {
      yourname: {
        required: true,
        minlength: 4,
      },
      email: {
        emailCheck: true,
      },
      subject: {
        required: true,
        minlength: 3,
      },
      message: {
        required: true,
        minlength: 20,
      },
    },
    messages: {
      yourname: {
        required: "This field cannot be empty!",
        minlength: "Name should have atleast 4 charecters.",
      },
      subject: {
        required: "This field cannot be empty!",
      },
      message: {
        required: "This field cannot be empty!",
      },
      email: {
        required: "This field cannot be empty!",
        emailCheck: "Please Enter a valid email address",
      },
    },
  });
  $.validator.addMethod("emailCheck", function (value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  });
});

// form submission

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  if ($("#contact-form").valid()) {
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form";
            }
          });
        }
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
  }
}
form.addEventListener("submit", handleSubmit);
