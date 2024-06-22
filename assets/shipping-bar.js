class MarmetoShippingBarV2 extends HTMLElement {
  constructor() {
    super();
    this.initShippingBar();
  }

  initShippingBar() {
    document.addEventListener("click", function (event) {
      // Add the classname of your cart and quantity-selector button if present:
      if (
        event.target.classList.contains("cart-icon") ||
        event.target.classList.contains("quantity__button")
      ) {
        setTimeout(function () {
          fetch("/cart.js")
            .then((response) => response.json())
            .then((cart) => {
              this.total_price = cart.total_price;
              this.cart_total = total_price / 100;
              this.subtotal = cart_total;

              document
                .querySelectorAll(".shipping-threshold")
                .forEach((item) => item.classList.remove("active"));
              this.discountProgress = document.querySelector(
                ".shipping-bar__indicator"
              );
              // Removing the step classnames:
              this.discountProgress.classList.remove(
                "step1",
                "step2",
                "step3",
                "step4"
              );
              
              // Deciding the shipping-bar__indicator width depending on the current cart price:
              if (subtotal < priceval1) {
                let away_amt = priceval1 - subtotal;
                document.querySelector(".discount-away-amt").innerHTML = "";
                document.querySelector(".discount-away-amt").innerHTML =
                  "₹" + away_amt;
                document.querySelector(".discount-away-next-offer").innerHTML =
                  "";
                document.querySelector(".discount-away-next-offer").innerHTML =
                  dis_coupon_msg1;
              } else if (subtotal > priceval1 && subtotal < priceval2) {
                let away_amt1 = priceval2 - subtotal;
                document.querySelector(".discount-away-amt").innerHTML = "";
                document.querySelector(".discount-away-amt").innerHTML =
                  "₹" + away_amt1;
                document.querySelector(".discount-away-next-offer").innerHTML =
                  "";
                document.querySelector(".discount-away-next-offer").innerHTML =
                  dis_coupon_msg2;

                this.discountProgress.className =
                  "shipping-bar__indicator step1";
                document
                  .querySelectorAll(".threshold-image")[0]
                  ?.classList.add("active");
              } else if (subtotal > priceval2 && subtotal < priceval3) {
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
                  "shipping-bar__indicator step2";

                document
                  .querySelectorAll(".threshold-image")[0]
                  ?.classList.add("active");
                document
                  .querySelectorAll(".threshold-image")[1]
                  ?.classList.add("active");
              } else {
                this.discountProgress.className =
                  "shipping-bar__indicator step4";
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
        }, 1000);
      }
    });
  }
}

customElements.define('marmeto-shipping-bar-v2', MarmetoShippingBarV2)
