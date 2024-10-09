class MarmetoShippingBarV2 extends HTMLElement {
  constructor() {
    super();
    this.initShippingBar();
  }

  initShippingBar() {
    const mainElement = document.querySelector("cart-drawer");
    const quantityInput = document.querySelectorAll(".quantity__input");

    document
      .querySelectorAll(".shipping-threshold")
      .forEach((item) => item.classList.remove("active"));
    this.discountProgress = this.querySelector(".shipping-bar__indicator");
    this.discountProgress.classList.remove(
      "step1",
      "step2",
      "step3",
      "step4",
      "step5",
      "step6",
      "step7"
    );

    // Call this function on every cart-item update event.
    this.updateShippingBar();
  }
  updateShippingBar() {
    fetch("/cart.js")
      .then((response) => response.json())
      .then((cart) => {
        this.total_price = cart.total_price;
        this.cart_total = this.total_price / 100;
        this.subtotal = this.cart_total;

        const priceval1 =
            this.querySelector(".shipping-bar")?.getAttribute("data-priceVal1"),
          priceval2 =
            this.querySelector(".shipping-bar")?.getAttribute("data-priceVal2"),
          priceval3 =
            this.querySelector(".shipping-bar")?.getAttribute("data-priceVal3"),
          dis_coupon_msg1 =
            this.querySelector(".shipping-bar")?.getAttribute(
              "data-discCoupon1"
            ),
          dis_coupon_msg2 =
            this.querySelector(".shipping-bar")?.getAttribute(
              "data-discCoupon2"
            ),
          dis_coupon_msg3 =
            this.querySelector(".shipping-bar")?.getAttribute(
              "data-discCoupon3"
            );

        if (this.subtotal < priceval1 && this.subtotal > 0) {
          const away_amt = priceval1 - this.subtotal;
          document.querySelector(
            ".drawer__shipping-message"
          ).innerHTML = `<span class="discount-away-amt">₹${away_amt}</span> away from <span class="discount-away-next-offer">${dis_coupon_msg1}</span>`;
          this.discountProgress.className = "shipping-bar__indicator step1";
        } else if (this.subtotal == priceval1) {
          document.querySelector(
            ".drawer__shipping-message"
          ).innerHTML = `<p>unlocked ${dis_coupon_msg1}<p>`;
          this.discountProgress.className = "shipping-bar__indicator step2";
          document
            .querySelectorAll(".threshold-image")[0]
            ?.classList.add("active");
        } else if (this.subtotal > priceval1 && this.subtotal < priceval2) {
          debugger;
          const away_amt1 = priceval2 - this.subtotal;
          document.querySelector(
            ".drawer__shipping-message"
          ).innerHTML = `<span class="discount-away-amt">₹${away_amt1}</span> away from <span class="discount-away-next-offer">${dis_coupon_msg2}</span>`;
          this.discountProgress.className = "shipping-bar__indicator step3";
          this.querySelectorAll(".threshold-image")[0]?.classList.add("active");
        } else if (this.subtotal == priceval2) {
          document.querySelector(
            ".drawer__shipping-message"
          ).innerHTML = `<p>unlocked ${dis_coupon_msg2}<p>`;
          this.discountProgress.className = "shipping-bar__indicator step4";
          this.querySelectorAll(".threshold-image")[0]?.classList.add("active");
          this.querySelectorAll(".threshold-image")[1]?.classList.add("active");
        } else if (this.subtotal > priceval2 && this.subtotal < priceval3) {
          const away_amt2 = priceval3 - this.subtotal;
          document.querySelector(
            ".drawer__shipping-message"
          ).innerHTML = `<span class="discount-away-amt">₹${away_amt2}</span> away from <span class="discount-away-next-offer">${dis_coupon_msg3}</span>`;
          this.discountProgress.className = "shipping-bar__indicator step5";
          this.querySelectorAll(".threshold-image")[0]?.classList.add("active");
          this.querySelectorAll(".threshold-image")[1]?.classList.add("active");
        } else if (this.subtotal == priceval3) {
          document.querySelector(
            ".drawer__shipping-message"
          ).innerHTML = `<p>unlocked ${dis_coupon_msg3}<p>`;
          this.discountProgress.className = "shipping-bar__indicator step6";
          this.querySelectorAll(".threshold-image").forEach((item) => {
            item.classList.add("active");
          });
        } else {
          this.discountProgress.className = "shipping-bar__indicator step7";
          this.querySelectorAll(".threshold-image").forEach((item) => {
            item.classList.add("active");
          });
          document.querySelector(
            ".drawer__shipping-message"
          ).innerHTML = `<p>${finalThresholdMessage}<p>`;
        }
      });
  }
}

customElements.define("marmeto-shipping-bar-v2", MarmetoShippingBarV2);