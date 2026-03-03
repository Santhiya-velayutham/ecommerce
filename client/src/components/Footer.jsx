export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            <h5 className="text-warning">MyShop</h5>
            <p>Your trusted online store.</p>
          </div>

          <div className="col-md-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Orders</li>
              <li>Cart</li>
              <li>Payment</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6>Contact</h6>
            <p>Email: santhiya@myshop.com</p>
            <p>Phone: +91 9585699387</p>
          </div>

        </div>

        <hr />
        <p className="text-center small">
          © 2026 MyShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}