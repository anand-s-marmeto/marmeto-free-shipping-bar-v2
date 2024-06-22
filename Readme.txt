Paste the below code in theme.liquid just above the body tag:

<script>
  let priceval1 = {{settings.first_shipping_threshold }}
  let priceval2 = {{ settings.second_shipping_threshold }}
  let priceval3 ={{ settings.third_shipping_threshold }}

  let dis_coupon_msg1 = "{{ settings.first_threshold_message }}"
  let dis_coupon_msg2 = "{{ settings.second_threshold_message }}"
  let dis_coupon_msg3 = "{{ settings.third_threshold_message }}"

  let finalThresholdMessage = "{{ settings.final_threshold_message }}"
</script>

This code creates variables with the values received from global settings and can be used anywhere in the code base.


Paste the below code in settings_schema.json:


{
    "name": "Free shipping bar",
    "settings": [
      {
        "type": "richtext",
        "id": "free_shipping_heading",
        "label": "Heading",
        "default":"<p>Free shipping</p>"
      },
      {
        "type": "text",
        "id": "first_shipping_threshold",
        "label": "First shipping threshold"
      },
      {
        "type": "text",
        "id": "first_threshold_message",
        "label": "First threshold message"
      },
      {
        "type": "image_picker",
        "id": "first_threshold_image",
        "label": "First threshold image"
      },
      {
        "type": "text",
        "id": "second_shipping_threshold",
        "label": "Second shipping threshold"
      },
      {
        "type": "text",
        "id": "second_threshold_message",
        "label": "Second threshold message"
      },
      {
        "type": "image_picker",
        "id": "second_threshold_image",
        "label": "Second threshold image"
      },
      {
        "type": "text",
        "id": "third_shipping_threshold",
        "label": "Third shipping threshold"
      },
      {
        "type": "text",
        "id": "third_threshold_message",
        "label": "Third threshold message"
      },
      {
        "type": "image_picker",
        "id": "third_threshold_image",
        "label": "Third threshold image"
      },
      {
        "type": "text",
        "id": "final_threshold_message",
        "label": "Final threshold message"
      },
      {
        "type": "text",
        "id": "threshold_price_limit",
        "label": "Threshold price limit"
      }
    ]
  }

Use the below code to render the 'shipping-bar' snippet:
{% render 'shipping-bar' %}

Note : Edit the css and elements to target according to your requirements.
