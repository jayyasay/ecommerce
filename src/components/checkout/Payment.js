import { useContext, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CartContext } from "../../CartContext";

function Payment() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const data = [];
  cartItems.map((item) => {
    return data.push({
      key: item.id,
      name: item.name,
      quantity: item.quantity,
      price: "₱ " + item.price,
    });
  });

  const totalPrice = data.reduce(
    (total, item) => total + item.quantity * parseInt(item.price.substring(2)),
    0
  );

  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "ATiPUYYH6AQOcQHEggcwP77LgLSOi_orlJ-D_2s1ycBDY2x8aV0KoRRQc_sgwcHeFK-2WhRjOEUDJk11",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice,
                  },
                },
              ],
            });
          }}
        />
      </PayPalScriptProvider>
    </>
  );
}

export default Payment;
