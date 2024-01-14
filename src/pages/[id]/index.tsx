import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TProduct } from "../../../types";
import { getSingleProduct } from "@/utils/requests";
import { toast } from "react-toastify";
import SkeletonLoader from "@/components/loaders/skeleton";
import { getCurrentPrice } from "@/utils/utils";
import ProductLoader from "@/components/loaders/productLoader";
import Image from "next/image";

export default function SingleProductPage() {
  // router
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>({});
  const [imageIndex, setImageIndex] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);
  const [cartAdded, setCartAdded] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);

  // fetch products on landing
  useEffect(() => {
    if (router.isReady) {
      fetchProducts();
    }
  }, [router.isReady]);

  const fetchProducts = async () => {
    try {
      const res = await getSingleProduct(router.query.id);
      setProduct(res[0].data);
      setBestSellers(res[1].data.products);
      setLoading(false);
    } catch (error) {
      toast.error("Unable to Fetch this product, please try again later");
    }
  };

  //   add to wish list
  const handleLike = () => {
    let previousWhishlist: TProduct[] | [] = JSON.parse(
      localStorage.getItem("bandageWhishlist") || "[]"
    );
    if (
      previousWhishlist.find(
        (wishlistProduct: TProduct) => wishlistProduct.id === product.id
      )
    ) {
      //   toast.warning("Item already on your wish list");
    } else {
      localStorage.setItem(
        "bandageWhishlist",
        JSON.stringify([...previousWhishlist, product])
      );
      setWishlistAdded(true);
      toast.success("Added to Wish List", {
        position: "bottom-right",
      });
    }
  };

  //   add to cart
  const handleCart = () => {
    let previosCart: TProduct[] | [] = JSON.parse(
      localStorage.getItem("bandageCart") || "[]"
    );
    if (
      previosCart.find(
        (wishlistProduct: TProduct) => wishlistProduct.id === product.id
      )
    ) {
      //   toast.warning("Item already in your cart");
    } else {
      localStorage.setItem(
        "bandageCart",
        JSON.stringify([...previosCart, { ...product, quantity: 1 }])
      );
      setCartAdded(true);
      toast.success("Added to Cart", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="container-fluid">
      {/* info  */}
      <Nav
        cartAdded={cartAdded}
        wishlistAdded={wishlistAdded}
        product={product}
      />
      {/* body container  */}
      <div className="single-product">
        {/* product  */}
        <div className="product">
          <div className="container">
            <div className="top d-flex align-items-center justify-content-center d-flex justify-content-md-start justify-content-lg-start">
              <a href="/">Home</a>
              <i className="fa-solid fa-chevron-right" />
              <a href="" className="active">
                Shop
              </a>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="big-image">
                  {imageIndex !== 0 && (
                    <i
                      className="fa-solid fa-chevron-left"
                      onClick={() => {
                        if (imageIndex !== 0) {
                          setImageIndex((prev) => prev - 1);
                        }
                      }}
                    />
                  )}
                  {loading ? (
                    <SkeletonLoader height={"450px"} width={"100%"} />
                  ) : (
                    <Image
                      src={product.images[imageIndex]}
                      unoptimized
                      width={10}
                      height={10}
                      alt={product.title}
                    />
                  )}
                  {imageIndex + 1 < product?.images?.length && (
                    <i
                      className="fa-solid fa-chevron-right"
                      onClick={() => {
                        if (imageIndex + 1 < product?.images?.length) {
                          setImageIndex((prev) => prev + 1);
                        }
                      }}
                    />
                  )}
                </div>
                <div className="scroller d-flex gap-3">
                  {loading ? (
                    <>
                      {Array.from(Array(4).keys()).map((i) => {
                        return (
                          <SkeletonLoader width="100px" height="75px" key={i} />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {product.images.map((image: string, i: number) => {
                        return (
                          <div
                            className="img-container"
                            key={i}
                            onClick={() => setImageIndex(i)}
                          >
                            <Image
                              src={image}
                              unoptimized
                              width={10}
                              height={10}
                              alt={product.title}
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 mt-4 mt-md-0 mt-lg-0">
                <div className="details">
                  {loading ? (
                    <SkeletonLoader height={20} width={200} mb={2} />
                  ) : (
                    <h1>{product.title}</h1>
                  )}
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div>
                      {loading ? (
                        <div className="d-flex align-items-center gap-1">
                          {Array.from(Array(5).keys()).map((i) => {
                            return (
                              <SkeletonLoader
                                width="20px"
                                height="20px"
                                key={i}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <>
                          <i
                            className={`${
                              product.rating >= 1 ? "fa-solid" : "fa-regular"
                            } fa-star`}
                          ></i>
                          <i
                            className={`${
                              product.rating >= 2 ? "fa-solid" : "fa-regular"
                            } fa-star`}
                          ></i>
                          <i
                            className={`${
                              product.rating >= 3 ? "fa-solid" : "fa-regular"
                            } fa-star`}
                          ></i>
                          <i
                            className={`${
                              product.rating >= 4 ? "fa-solid" : "fa-regular"
                            } fa-star`}
                          ></i>
                          <i
                            className={`${
                              product.rating === 5 ? "fa-solid" : "fa-regular"
                            } fa-star`}
                          ></i>
                        </>
                      )}
                    </div>
                    <small>10 Reviews</small>
                  </div>
                  {loading ? (
                    <SkeletonLoader width={"100px"} height={"20px"} mb={2} />
                  ) : (
                    <h2>
                      $
                      {getCurrentPrice(
                        product.price,
                        product.discountPercentage
                      ).toLocaleString()}
                    </h2>
                  )}
                  <h3>
                    Availability : <span>In Stock </span>
                  </h3>
                  <div className="d-flex colors align-items-center">
                    <div className="circle c1" />
                    <div className="circle c2" />
                    <div className="circle c3" />
                    <div className="circle c4" />
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span id="option">Select Options</span>
                    {loading ? (
                      <SkeletonLoader height={"40px"} width={"40px"} />
                    ) : (
                      <button onClick={handleLike}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          viewBox="0 0 512 512"
                        >
                          {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                          <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                        </svg>
                      </button>
                    )}
                    {loading ? (
                      <SkeletonLoader height={"40px"} width={"40px"} />
                    ) : (
                      <button onClick={handleCart}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M0 1.63333C0 1.46536 0.0667281 1.30427 0.185505 1.1855C0.304281 1.06673 0.465377 1 0.633353 1H2.53341C2.67469 1.00004 2.8119 1.04731 2.92322 1.1343C3.03454 1.22129 3.11357 1.34299 3.14776 1.48007L3.66078 3.53333H18.3672C18.4602 3.53342 18.5521 3.55398 18.6362 3.59356C18.7204 3.63315 18.7948 3.69077 18.8541 3.76235C18.9135 3.83393 18.9564 3.9177 18.9797 4.00772C19.0031 4.09774 19.0063 4.19179 18.9892 4.2832L17.0891 14.4165C17.062 14.5617 16.9849 14.6927 16.8714 14.7871C16.7578 14.8815 16.6148 14.9332 16.4672 14.9333H5.06682C4.91917 14.9332 4.7762 14.8815 4.66263 14.7871C4.54906 14.6927 4.47204 14.5617 4.44487 14.4165L2.54608 4.3022L2.0394 2.26667H0.633353C0.465377 2.26667 0.304281 2.19994 0.185505 2.08117C0.0667281 1.96239 0 1.8013 0 1.63333ZM3.92932 4.8L5.59251 13.6667H15.9415L17.6047 4.8H3.92932ZM6.33353 14.9333C5.66163 14.9333 5.01724 15.2002 4.54214 15.6753C4.06703 16.1504 3.80012 16.7948 3.80012 17.4667C3.80012 18.1385 4.06703 18.7829 4.54214 19.258C5.01724 19.7331 5.66163 20 6.33353 20C7.00543 20 7.64981 19.7331 8.12492 19.258C8.60003 18.7829 8.86694 18.1385 8.86694 17.4667C8.86694 16.7948 8.60003 16.1504 8.12492 15.6753C7.64981 15.2002 7.00543 14.9333 6.33353 14.9333ZM15.2005 14.9333C14.5286 14.9333 13.8842 15.2002 13.4091 15.6753C12.934 16.1504 12.6671 16.7948 12.6671 17.4667C12.6671 18.1385 12.934 18.7829 13.4091 19.258C13.8842 19.7331 14.5286 20 15.2005 20C15.8724 20 16.5168 19.7331 16.9919 19.258C17.467 18.7829 17.7339 18.1385 17.7339 17.4667C17.7339 16.7948 17.467 16.1504 16.9919 15.6753C16.5168 15.2002 15.8724 14.9333 15.2005 14.9333ZM6.33353 16.2C6.66948 16.2 6.99167 16.3335 7.22922 16.571C7.46678 16.8085 7.60023 17.1307 7.60023 17.4667C7.60023 17.8026 7.46678 18.1248 7.22922 18.3623C6.99167 18.5999 6.66948 18.7333 6.33353 18.7333C5.99758 18.7333 5.67539 18.5999 5.43783 18.3623C5.20028 18.1248 5.06682 17.8026 5.06682 17.4667C5.06682 17.1307 5.20028 16.8085 5.43783 16.571C5.67539 16.3335 5.99758 16.2 6.33353 16.2ZM15.2005 16.2C15.5364 16.2 15.8586 16.3335 16.0962 16.571C16.3337 16.8085 16.4672 17.1307 16.4672 17.4667C16.4672 17.8026 16.3337 18.1248 16.0962 18.3623C15.8586 18.5999 15.5364 18.7333 15.2005 18.7333C14.8645 18.7333 14.5423 18.5999 14.3048 18.3623C14.0672 18.1248 13.9338 17.8026 13.9338 17.4667C13.9338 17.1307 14.0672 16.8085 14.3048 16.571C14.5423 16.3335 14.8645 16.2 15.2005 16.2Z"
                            fill="#252B42"
                          />
                        </svg>
                      </button>
                    )}
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z"
                          fill="black"
                        />
                        <path
                          d="M2 10C2 10 5 4.5 10 4.5C15 4.5 18 10 18 10C18 10 15 15.5 10 15.5C5 15.5 2 10 2 10ZM10 13.5C10.9283 13.5 11.8185 13.1313 12.4749 12.4749C13.1313 11.8185 13.5 10.9283 13.5 10C13.5 9.07174 13.1313 8.1815 12.4749 7.52513C11.8185 6.86875 10.9283 6.5 10 6.5C9.07174 6.5 8.1815 6.86875 7.52513 7.52513C6.86875 8.1815 6.5 9.07174 6.5 10C6.5 10.9283 6.86875 11.8185 7.52513 12.4749C8.1815 13.1313 9.07174 13.5 10 13.5Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* description  */}
        <div className="description">
          <div className="container">
            <div className="top d-flex justify-content-center align-items-center">
              <p>Description</p>
              <p>Additional Information</p>
              <p>
                Reviews <span>(0)</span>
              </p>
            </div>
            <div className="info">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  {loading ? (
                    <SkeletonLoader width={"300px"} height={"20px"} mb={4} />
                  ) : (
                    <h3>{product.description}</h3>
                  )}
                  <div className="text d-flex flex-column">
                    <p>
                      Met minim Mollie non desert Alamo est sit cliquey dolor do
                      met sent. RELIT official consequent door ENIM RELIT
                      Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <p className="block">
                      Met minim Mollie non desert Alamo est sit cliquey dolor do
                      met sent. RELIT official consequent door ENIM RELIT
                      Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <p>
                      Met minim Mollie non desert Alamo est sit cliquey dolor do
                      met sent. RELIT official consequent door ENIM RELIT
                      Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-3 mt-md-0 mt-lg-0">
                  <div className="img-container">
                    {loading ? (
                      <SkeletonLoader width={"100%"} height="372px" />
                    ) : (
                      <Image
                        src={product.thumbnail}
                        unoptimized
                        width={10}
                        height={10}
                        alt={product.title}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* best sellers  */}
        <div className="best-sellers">
          <div className="container">
            <div className="products">
              <h3>BESTSELLER PRODUCTS</h3>
              <div className="row">
                {loading ? (
                  <>
                    {Array.from(Array(8).keys()).map((i) => {
                      return (
                        <div
                          className="col-lg-3 col-md-4 col-sm-6 col-12"
                          key={i}
                        >
                          <ProductLoader />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {bestSellers.map((product: TProduct, i: number) => {
                      return (
                        <div
                          className="col-lg-3 col-md-4 col-sm-6 col-12"
                          key={i}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="product-card"
                            onClick={() => {
                              router.push(`/${product.id}`).then(() => {
                                router.reload();
                              });
                            }}
                          >
                            <div className="img-container">
                              <Image
                                src={product.thumbnail}
                                unoptimized
                                width={10}
                                height={10}
                                alt={product.title}
                              />
                            </div>
                            <div className="details d-flex flex-column">
                              <h4>{product.title}</h4>
                              <h5>{product.category}</h5>
                              <p>
                                ${product.price.toLocaleString()}{" "}
                                <span>
                                  $
                                  {getCurrentPrice(
                                    product.price,
                                    product.discountPercentage
                                  ).toLocaleString()}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="brands">
              <div className="row align-items-center justify-content-center">
                <div className="col-lg-2 col-md-4 col-12 d-flex justify-content-center">
                  <Image
                    src="/assets/holi.png"
                    unoptimized
                    width={10}
                    height={10}
                    alt="img"
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-12 d-flex justify-content-center mt-5 mt-0 mt-lg-0">
                  <Image
                    src="/assets/lya.png"
                    unoptimized
                    width={10}
                    height={10}
                    alt="img"
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-12 d-flex justify-content-center mt-5 mt-0 mt-lg-0">
                  <Image
                    src="/assets/cap.png"
                    unoptimized
                    width={10}
                    height={10}
                    alt="img"
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-12 d-flex justify-content-center mt-5 mt-md-4 mt-lg-0">
                  <Image
                    src="/assets/stripe.png"
                    unoptimized
                    width={10}
                    height={10}
                    alt="img"
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-12 d-flex justify-content-center mt-5 mt-md-4 mt-lg-0">
                  <Image
                    src="/assets/aws.png"
                    unoptimized
                    width={10}
                    height={10}
                    alt="img"
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-12 d-flex justify-content-center mt-5 mt-md-4 mt-lg-0">
                  <Image
                    src="/assets/bot.png"
                    unoptimized
                    width={10}
                    height={10}
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer  */}
      <Footer />
    </div>
  );
}
