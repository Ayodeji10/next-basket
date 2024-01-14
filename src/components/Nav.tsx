import React, { useEffect, useState } from "react";
import { TProduct } from "../../types";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getCurrentPrice, getTotalPrice } from "@/utils/utils";
import { toast } from "react-toastify";

type Props = {
  cartAdded?: boolean;
  wishlistAdded?: boolean;
  product?: TProduct;
};

export default function Nav({ cartAdded, wishlistAdded, product }: Props) {
  const [whishlist, setWishlist] = useState<TProduct[] | []>([]);
  const [cart, setCart] = useState<TProduct[] | []>([]);

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishList] = useState(false);

  // get previous cart and wish list
  useEffect(() => {
    const previousWhishlist: TProduct[] | [] = JSON.parse(
      localStorage.getItem("bandageWhishlist") || "[]"
    );
    if (previousWhishlist) {
      setWishlist(previousWhishlist);
    }
    const previousCart: TProduct[] | [] = JSON.parse(
      localStorage.getItem("bandageCart") || "[]"
    );
    if (previousCart) {
      setCart(previousCart);
    }
  }, []);

  //   add current product to cart
  useEffect(() => {
    if (cartAdded && product) {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem("bandageCart", JSON.stringify(newCart));
    }
  }, [cartAdded]);

  //   add current product to wishlist
  useEffect(() => {
    if (wishlistAdded && product) {
      const newWishlist = [...whishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem("bandageWhishlist", JSON.stringify(newWishlist));
    }
  }, [wishlistAdded]);

  //   remove from cart
  const handleRemoveFromCart = (id: number) => {
    const newCartItems = cart.filter((item: TProduct) => item.id !== id);
    setCart(newCartItems);
    localStorage.setItem("bandageCart", JSON.stringify(newCartItems));
    toast.success("Item Removed from cart", {
      position: "bottom-right",
    });
  };

  //   remve from whishlist
  const handleRemoveFromwishlist = (id: number) => {
    const newWishList = whishlist.filter((item: TProduct) => item.id !== id);
    setWishlist(newWishList);
    localStorage.setItem("bandageWhishlist", JSON.stringify(newWishList));
    toast.success("Item Removed from wish list", {
      position: "bottom-right",
    });
  };

  //   increase quantity
  const handleQuantityIncrease = (id: number) => {
    let newCart = cart.map((item: TProduct) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity && item.quantity + 1 };
      } else {
        return item;
      }
    });
    setCart(newCart);
    localStorage.setItem("bandageCart", JSON.stringify(newCart));
  };

  //   reduce quantity
  const handleReduceQuantity = (id: number) => {
    const selectedItem = cart.find((item: TProduct) => item.id === id);
    if (
      selectedItem &&
      selectedItem.quantity !== undefined &&
      selectedItem.quantity > 1
    ) {
      let newCart = cart.map((item: TProduct) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity && item.quantity - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
      localStorage.setItem("bandageCart", JSON.stringify(newCart));
    } else {
      handleRemoveFromCart(id);
    }
  };

  return (
    <>
      {/* info  */}
      <div className="info align-items-center justify-content-center">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center justify-content-mmd-start justify-content-lg-start align-items-center">
            <div className="d-flex flex-column flex-sm-column flex-md-row gap-0 gap-md-4 align-items-center">
              <p>
                <i className="fa-solid fa-phone" />
                (225) 555-0118
              </p>
              <p>
                <i className="fa-regular fa-envelope" />
                michelle.rivera@example.com
              </p>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 col-12 justify-content-center">
            <p>Follow Us and get a chance to win 80% off</p>
          </div>
          <div className="col-lg-3 col-md-12 col-12 d-flex justify-content-lg-end justify-content-center mt-lg-0 mt-md-3">
            <div className="d-flex align-items-center gap-3">
              <p>Follow Us :</p>
              <div className="d-flex align-items-center gap-3">
                <i className="fa-brands fa-instagram" />
                <i className="fa-brands fa-youtube" />
                <i className="fa-brands fa-facebook" />
                <i className="fa-brands fa-twitter" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* navbar  */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h3>Bandage</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-between align-items-center"
            id="navbarScroll"
          >
            <ul className="navbar-nav align-items-lg-start align-items-center">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu"></ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pages
                </a>
              </li>
            </ul>
            <div className="right-menu d-flex align-items-center justify-content-center">
              <a href="">
                <i className="fa-regular fa-user" />
                Login / Register
              </a>
              <i className="fa-solid fa-magnifying-glass" />
              <a onClick={() => setShowCart(true)}>
                <i className="fa-solid fa-cart-shopping" />
                <small>{cart.length}</small>
              </a>
              <Offcanvas
                show={showCart}
                onHide={() => setShowCart(false)}
                placement="end"
                className="cart"
              >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                  <h2 className="mb-4">Your Cart</h2>
                  {cart.length < 1 ? (
                    <h4>No Items in Cart</h4>
                  ) : (
                    <>
                      {cart.map((item: TProduct, i: number) => {
                        return (
                          <div className="row mb-4" key={i}>
                            <div className="col-2">
                              <div className="img-container">
                                <img src={item.thumbnail} alt={item.title} />
                              </div>
                            </div>
                            <div className="col-6">
                              <h3 className="mb-1">{item.title}</h3>
                              <h4 className="mb-1">{item.category}</h4>
                              <h5 className="mb-0">
                                $
                                {getCurrentPrice(
                                  item.price,
                                  item.discountPercentage
                                ).toLocaleString()}
                              </h5>
                            </div>
                            <div className="col-3">
                              <h4 className="mb-2">Quantity</h4>
                              <div className="d-flex align-items-ceter gap-2 mb-2">
                                <button
                                  className="btn"
                                  onClick={() => handleReduceQuantity(item.id)}
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  className="btn"
                                  onClick={() =>
                                    handleQuantityIncrease(item.id)
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <h6>
                                Total: $
                                {(
                                  getCurrentPrice(
                                    item.price,
                                    item.discountPercentage
                                  ) * (item.quantity ? item.quantity : 1)
                                ).toLocaleString()}
                                {/* {
                                  Number(
                                    getCurrentPrice(
                                      item.price,
                                      item.discountPercentage
                                    )
                                  )
                                  // * (item.quantity ? item.quantity : 1)
                                } */}
                              </h6>
                            </div>
                            <div className="col-1">
                              <i
                                className="fa-regular fa-rectangle-xmark"
                                onClick={() => handleRemoveFromCart(item.id)}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <p className="mt-3">Cart Total: ${getTotalPrice(cart)}</p>
                    </>
                  )}
                </Offcanvas.Body>
              </Offcanvas>
              <a onClick={() => setShowWishList(true)}>
                <i className="fa-regular fa-heart" />{" "}
                <small>{whishlist.length}</small>
              </a>
              <Offcanvas
                show={showWishlist}
                onHide={() => setShowWishList(false)}
                placement="end"
                className="cart"
              >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                  <h2 className="mb-4">Your Wish List</h2>
                  {whishlist.length < 1 ? (
                    <h4>No Items in wiish list</h4>
                  ) : (
                    <>
                      {whishlist.map((item: TProduct, i: number) => {
                        return (
                          <div className="row mb-4 align-items-center" key={i}>
                            <div className="col-3">
                              <div className="img-container">
                                <img src={item.thumbnail} alt={item.title} />
                              </div>
                            </div>
                            <div className="col-8">
                              <h3 className="mb-1">{item.title}</h3>
                              <h4 className="mb-1">{item.category}</h4>
                              <h5 className="mb-0">
                                $
                                {getCurrentPrice(
                                  item.price,
                                  item.discountPercentage
                                )}
                              </h5>
                            </div>
                            <div className="col-1">
                              <i
                                className="fa-regular fa-rectangle-xmark"
                                onClick={() =>
                                  handleRemoveFromwishlist(item.id)
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                      <p className="mt-3">
                        Wish List Total: ${getTotalPrice(whishlist)}
                      </p>
                    </>
                  )}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
