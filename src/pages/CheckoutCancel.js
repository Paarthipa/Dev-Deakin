import "../styles/CheckoutCancel.css";

export default function CheckoutCancel() {
  return (
    <div className="checkout-cancel">
      <h1>Payment Cancelled </h1>
      <p>No charges were made. You can try again from the Plans page.</p>
      <button
        className="btn"
        onClick={() => (window.location.href = "/plans")}
      >
        Back to Plans
      </button>
    </div>
  );
}
