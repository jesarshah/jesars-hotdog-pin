
// A reference to Stripe.js
var stripe;

var item_amount = document.getElementById("quantity-input");
var customer_name = document.getElementById("name");
var customer_email = document.getElementById("email");
var customer_shipping_address = 
  JSON.stringify(document.getElementById("address").value) + "," +
  JSON.stringify(document.getElementById("state").value) + "," +
  JSON.stringify(document.getElementById("postal_code").value) + "," +
  JSON.stringify(document.getElementById("country").value);

var orderData = {
  items: 1,
  id: "HOTDOG-PIN",
  description: "A fun HOTDOG-PIN to accessorize your gear!",
  currency: "usd",
};

// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;

fetch("/create-payment-intent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(orderData)
})
  .then(function(result) {
    return result.json();
  })
  .then(function(data) {
    return setupElements(data);
  })
  .then(function({ stripe, card, clientSecret }) {
    document.querySelector("button").disabled = false;

    // Handle form submission.
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      // Initiate payment when the submit button is clicked
      pay(stripe, card, clientSecret);
    });
  });



// Set up Stripe.js and Elements to use in checkout form
var setupElements = function(data) {
  stripe = Stripe(data.publishableKey);
  var elements = stripe.elements();
  var style = {
    base: {
      color: "#ffc0cb",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  };

  var card = elements.create("card", { style: style });
  card.mount("#card-element");

  return {
    stripe: stripe,
    card: card,
    clientSecret: data.clientSecret
  };
};

/*
 * Calls stripe.confirmCardPayment which creates a pop-up modal to
 * prompt the user to enter extra authentication details without leaving your page
 */
var pay = function(stripe, card, clientSecret) {
  changeLoadingState(true);

  // Initiate the payment.
  // If authentication is required, confirmCardPayment will automatically display a modal
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card
      }
    })
    .then(function(result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment has been processed!
        orderComplete(clientSecret);
      }
    });
};

var address_vars = document.getElementById("submit-address");
console.log(address_vars);

// Capturing order details and displaying to the customer
var createCheckoutSession = function(name, email) {
    name = customer_name.value;
    email = customer_email.value;
    var shipping_address = 
    JSON.stringify(document.getElementById("address").value) + "," +
    JSON.stringify(document.getElementById("state").value) + "," +
    JSON.stringify(document.getElementById("postal_code").value)
    return {name, email};
};

/* ------- Post-payment helpers ------- */

/* Shows a success / error message when the payment is complete */
var orderComplete = function(clientSecret) {
  // Just for the purpose of the sample, show the PaymentIntent response object
    var name;
    var email;
    console.log("---_______-----------__________----------");
    console.log(createCheckoutSession(name, email).name);
  stripe.retrievePaymentIntent(clientSecret).then(function(result) {    
    var paymentIntent = result.paymentIntent;
    var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
    document.querySelector(".sr-payment-form").classList.add("hidden");
    document.querySelector("pre").textContent = "Congrats on your purchase " + JSON.stringify(createCheckoutSession(name, email).name) + "! Check " + JSON.stringify(createCheckoutSession(name, email).email) + " for your receipt";

    document.querySelector(".sr-result").classList.remove("hidden");
    setTimeout(function() {
      document.querySelector(".sr-result").classList.add("expand");
    }, 200);

    changeLoadingState(false);
  });
};

var showError = function(errorMsgText) {
  changeLoadingState(false);
  var errorMsg = document.querySelector(".sr-field-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
var changeLoadingState = function(isLoading) {
  if (isLoading) {
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};
