// Shipping bar:

class MarmetoShippingBarV2 extends HTMLElement {
  constructor() {
    super();

    this.initShippingBar();
  }

  initShippingBar() {

  // Select the main element (replace '.cart-drawer' with the appropriate selector)
  const mainElement = document.querySelector('cart-drawer');

  // Select the quantity input element
  const quantityInput = document.querySelectorAll('.quantity__input');

  // Create a new event for cart open or quantity change
  const cartOpenOrQuantityChangeEvent = new Event('cartOpenOrQuantityChange');

  // Function to handle the mutation
  const handleMutation = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (mainElement.classList.contains('active')) {
          // Dispatch the event
          mainElement.dispatchEvent(cartOpenOrQuantityChangeEvent);
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(handleMutation);

  // Start observing the target node for configured mutations
  observer.observe(mainElement, { attributes: true });

  // Add an event listener for the input event on quantity input element
  quantityInput.forEach((item)=>{
    addEventListener('change', () => {
      mainElement.dispatchEvent(cartOpenOrQuantityChangeEvent);
    });
  })
  

  // Add an event listener for the custom event
  mainElement.addEventListener('cartOpenOrQuantityChange', () => {
    setTimeout(function () {
      fetch("/cart.js")
        .then((response) => response.json())
        .then((cart) => {
          this.total_price = cart.total_price;
          this.cart_total = total_price / 100;
          this.subtotal = cart_total;

          let priceval1 = document.querySelector('.shipping-bar')?.getAttribute("data-priceVal1"),
           priceval2 = document.querySelector('.shipping-bar')?.getAttribute("data-priceVal2"),
           priceval3 = document.querySelector('.shipping-bar')?.getAttribute("data-priceVal3"),
           dis_coupon_msg1 = document.querySelector('.shipping-bar')?.getAttribute("data-discCoupon1"),
           dis_coupon_msg2 = document.querySelector('.shipping-bar')?.getAttribute("data-discCoupon2"),
           dis_coupon_msg3 = document.querySelector('.shipping-bar')?.getAttribute("data-discCoupon3");

          document
            .querySelectorAll(".shipping-threshold")
            .forEach((item) => item.classList.remove("active"));
          this.discountProgress = document.querySelector(
            ".shipping-bar__indicator"
          );
          this.discountProgress.classList.remove(
            "step1",
            "step2",
            "step3",
            "step4",
            "step5",
            "step6",
            "step7"
          );

          if (this.subtotal < priceval1 && subtotal > 0) {
            let away_amt = priceval1 - subtotal;
            document.querySelector(".discount-away-amt").innerHTML = "";
            document.querySelector(".discount-away-amt").innerHTML =
              "₹" + away_amt;
            document.querySelector(".discount-away-next-offer").innerHTML =
              "";
            document.querySelector(".discount-away-next-offer").innerHTML =
              dis_coupon_msg1;

            this.discountProgress.className =
              "shipping-bar__indicator step1";
            
          }
          else if(this.subtotal == priceval1){
            let away_amt1 = priceval2 - subtotal;s

            document.querySelector('.shipping-bar__message').innerHTML = `<p>You unlocked ${dis_coupon_msg1}<p>`
            this.discountProgress.className =
              "shipping-bar__indicator step2";
            document
              .querySelectorAll(".threshold-image")[0]
              ?.classList.add("active");
          } 
          else if (this.subtotal > priceval1 && subtotal < priceval2) {
            let away_amt1 = priceval2 - subtotal;
            document.querySelector(".discount-away-amt").innerHTML = "";
            document.querySelector(".discount-away-amt").innerHTML =
              "₹" + away_amt1;
            document.querySelector(".discount-away-next-offer").innerHTML =
              "";
            document.querySelector(".discount-away-next-offer").innerHTML =
              dis_coupon_msg2;

            this.discountProgress.className =
              "shipping-bar__indicator step3";
            document
              .querySelectorAll(".threshold-image")[0]
              ?.classList.add("active");
          }
          else if( this.subtotal == priceval2){
            document.querySelector('.shipping-bar__message').innerHTML = `<p>You unlocked ${dis_coupon_msg2}<p>`
            this.discountProgress.className =
              "shipping-bar__indicator step4";
            document
              .querySelectorAll(".threshold-image")[0]
              ?.classList.add("active");
            document
              .querySelectorAll(".threshold-image")[1]
              ?.classList.add("active");
          }
           else if (this.subtotal > priceval2 && subtotal < priceval3) {
            let away_amt2 = priceval3 - subtotal;
            console.log(away_amt2);
            document.querySelector(".discount-away-amt").innerHTML = "";
            document.querySelector(".discount-away-amt").innerHTML =
              "₹" + away_amt2;
            document.querySelector(".discount-away-next-offer").innerHTML =
              "";
            document.querySelector(".discount-away-next-offer").innerHTML =
              dis_coupon_msg3;

            this.discountProgress.className =
              "shipping-bar__indicator step5";

            document
              .querySelectorAll(".threshold-image")[0]
              ?.classList.add("active");
            document
              .querySelectorAll(".threshold-image")[1]
              ?.classList.add("active");
          }
          else if(this.subtotal == priceval3){
            document.querySelector('.shipping-bar__message').innerHTML = `<p>You unlocked ${dis_coupon_msg3}<p>`
            this.discountProgress.className =
              "shipping-bar__indicator step6";
            document
              .querySelectorAll(".threshold-image")[0]
              ?.classList.add("active");
            document
              .querySelectorAll(".threshold-image")[1]
              ?.classList.add("active");
              document
              .querySelectorAll(".threshold-image")[2]
              ?.classList.add("active");
          } 
          else {
            this.discountProgress.className =
              "shipping-bar__indicator step7";
            document
              .querySelectorAll(".threshold-image")[0]
              ?.classList.add("active");
            document
              .querySelectorAll(".threshold-image")[1]
              ?.classList.add("active");
            document
              .querySelectorAll(".threshold-image")[2]
              ?.classList.add("active");

              document.querySelector('.shipping-bar__message').innerHTML = `<p>${finalThresholdMessage}<p>`
          }
        });
    }, 2000);
  });
  }
}

customElements.define('marmeto-shipping-bar-v2', MarmetoShippingBarV2)