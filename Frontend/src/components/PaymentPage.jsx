// src/components/PaymentPage.jsx
import React, { forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = forwardRef(({ amount, product, billingDetails }, ref) => {
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    openPayment: (overrideAmount) => handlePayment(overrideAmount),
    startPayment: (overrideAmount) => handlePayment(overrideAmount),
  }));

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const handlePayment = async (overrideAmount) => {
    try {
      const rupeeAmount = Number(overrideAmount ?? amount);
      if (!rupeeAmount || rupeeAmount <= 0) {
        alert("Invalid amount.");
        return;
      }

      if (!billingDetails?.name || !billingDetails?.email || !(billingDetails?.phone || billingDetails?.contact)) {
        alert("Please fill billing details before proceeding.");
        return;
      }

      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        alert("Razorpay SDK failed to load. Check your connection.");
        return;
      }

      // 1) Create order
      const createRes = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: rupeeAmount,
        currency: "INR",
        product: product?.name,
      });

      const data = createRes.data;
      if (!data || !data.orderId) {
        console.error("Create-order response:", data);
        throw new Error("Order creation failed on server.");
      }

      const orderAmountPaise = data.amount; // paise
      const orderId = data.orderId;
      const currency = data.currency || "INR";

      // 2) Image for Razorpay
      let imageForRzp;
      if (product?.image) {
        if (String(product.image).startsWith("http")) {
          imageForRzp = product.image;
        } else {
          imageForRzp = `${import.meta.env.BASE_URL}${String(product.image).replace(/^\//, "")}`;
        }
      }

      // 3) Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderAmountPaise,
        currency,
        name: "Smart Mart",
        description: `${product?.name || "Purchase"} — ₹${rupeeAmount}`,
        image: imageForRzp,
        order_id: orderId,
        handler: async function (response) {
          try {
            await axios.post("http://localhost:5000/api/payment/save-payment", {
              orderId,
              paymentId: response.razorpay_payment_id,
              amount: rupeeAmount,
              currency,
              status: "success",
              product,
              billingDetails,
            });

            // ✅ Pass correct orderId & amount to OrderSuccess
            navigate("/order-success", {
              state: {
                product: product || null,
                orderId: orderId,
                paymentId: response.razorpay_payment_id,
                amount: orderAmountPaise / 100, // convert paise to INR
              },
            });
          } catch (saveErr) {
            console.error("Error saving payment:", saveErr);
            alert("Payment succeeded but saving order failed. Contact support.");
          }
        },
        prefill: {
          name: billingDetails?.name,
          email: billingDetails?.email,
          contact: billingDetails?.phone || billingDetails?.contact,
        },
        theme: { color: "#3399cc" },
      };

      // 4) Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initialization error:", err);
      alert(err?.response?.data?.message || err.message || "Payment could not be started.");
    }
  };

  return null;
});

export default PaymentPage;









