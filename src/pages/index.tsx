import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/utils/requests";
import ProductLoader from "@/components/loaders/productLoader";
import { TProduct } from "../../types";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getCurrentPrice } from "@/utils/utils";

export default function Home() {
  // router
  const router = useRouter();

  const [productlength, setProductLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);

  // fetch products on landing
  useEffect(() => {
    fetchProducts();
  }, []);

  // fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res: any = await getAllProducts(productlength);
      setProducts(res.data.products);
      setProductLength((prev) => prev + 10);
      setLoading(false);
    } catch (error: any) {
      toast.error("Unable to Fetch Products, Please try again later");
    }
  };

  return (
    <div className="container-fluid">
      {/* nav  */}
      <Nav />
      {/* body container  */}
      <div className="container">
        {/* hero  */}
        <section className="hero">
          <div className="row">
            <div className="col-lg-4 col-12 mb-4 mb-lg-0">
              <div className="category cat1 d-flex flex-column gap-1">
                <small>5 Items</small>
                <h3>FURNITURE</h3>
                <a href="">Read More</a>
              </div>
            </div>
            <div className="col-lg-8 col-12">
              <div className="row">
                <div className="col-12 mb-4">
                  <div className="category cat2 d-flex flex-column gap-1">
                    <small>5 Items</small>
                    <h4>FURNITURE</h4>
                    <a href="">Read More</a>
                  </div>
                </div>
                <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                  <div className="category cat3 d-flex flex-column gap-1">
                    <small>5 Items</small>
                    <h4>FURNITURE</h4>
                    <a href="">Read More</a>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="category cat4 d-flex flex-column gap-1">
                    <small>5 Items</small>
                    <h4>FURNITURE</h4>
                    <a href="">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* products  */}
        <section className="products d-flex flex-column align-items-center">
          <div className="header d-flex flex-column">
            <p>Featured Products</p>
            <h3>BESTSELLER PRODUCTS</h3>
            <small>Problems trying to resolve the conflict between </small>
          </div>
          <div className="product-list d-flex justify-content-center">
            {products.map((product: TProduct, i: number) => {
              return (
                <div
                  className="product d-flex flex-column align-items-center"
                  key={i}
                  onClick={() => router.push(`/${product.id}`)}
                >
                  <div className="img-container">
                    <img src={product.thumbnail} alt="" />
                  </div>
                  <div className="product-details d-flex flex-column align-items-center">
                    <h4>{product.title}</h4>
                    <h5>{product.brand}</h5>
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
              );
            })}
            {/* loader  */}
            {loading && (
              <>
                {Array.from(Array(10).keys()).map((i) => {
                  return <ProductLoader key={i} />;
                })}
              </>
            )}
          </div>
          {productlength !== 100 && (
            <button onClick={() => fetchProducts()}>
              {loading ? (
                <ColorRing
                  visible={true}
                  height={30}
                  width={30}
                  colors={[
                    "#23a6f0",
                    "#23a6f0",
                    "#23a6f0",
                    "#23a6f0",
                    "#23a6f0",
                  ]}
                />
              ) : (
                "LOAD MORE PRODUCTS"
              )}
            </button>
          )}
        </section>
        {/* features  */}
        <section className="features d-flex flex-column">
          <div className="d-flex flex-column gap-2 align-items-center">
            <h5>Featured Products</h5>
            <h4>THE BEST SERVICES</h4>
            <p>Problems trying to resolve the conflict between</p>
          </div>
          <div className="services-list d-flex flex-wrap justify-content-center">
            <div className="service d-flex flex-column align-items-center">
              <img src="./assets/reader.png" alt="" />
              <h4>Easy Wins</h4>
              <p>Get your best looking smile now!</p>
            </div>
            <div className="service d-flex flex-column align-items-center">
              <img src="./assets/book.png" alt="" />
              <h4>Concrete</h4>
              <p>
                Defalcate is most focused in helping you discover your most
                beautiful smile
              </p>
            </div>
            <div className="service d-flex flex-column align-items-center">
              <img src="./assets/growth.png" alt="" />
              <h4>Hack Growth</h4>
              <p>Overcame any hurdle or any other problem.</p>
            </div>
          </div>
        </section>
        {/* posts  */}
        <section className="posts d-flex flex-column">
          <div className="d-flex flex-column align-items-center gap-1">
            <p>Practice Advice</p>
            <h3>Featured Posts</h3>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-md-4 mb-lg-0">
              <div className="post-card">
                <div className="post-img">
                  <img src="./assets/post1.png" alt="" />
                </div>
                <span>NEW</span>
                <div className="post-details d-flex flex-column">
                  <div className="d-flex gap-3 align-items-center">
                    <small className="active">Google</small>
                    <small>Trending</small>
                    <small>New</small>
                  </div>
                  <h3>Loudest à la Madison #1 (L'integral)</h3>
                  <p>
                    We focus on ergonomics and meeting you where you work. It's
                    only a keystroke away.
                  </p>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        style={{ marginRight: 5 }}
                      >
                        <path
                          d="M8.49933 14.6667C5.20378 14.6232 2.54277 11.9622 2.49933 8.66668C2.54277 5.37113 5.20378 2.71011 8.49933 2.66668C11.7949 2.71011 14.4559 5.37113 14.4993 8.66668C14.4559 11.9622 11.7949 14.6232 8.49933 14.6667ZM8.49933 4.00001C5.93611 4.03376 3.86641 6.10346 3.83266 8.66668C3.86641 11.2299 5.93611 13.2996 8.49933 13.3333C11.0625 13.2996 13.1322 11.2299 13.166 8.66668C13.1322 6.10346 11.0625 4.03376 8.49933 4.00001ZM11.8327 9.33334H7.83266V5.33334H9.16599V8.00001H11.8327V9.33334ZM14.0273 4.47201L12.0213 2.47201L12.9607 1.52734L14.9673 3.52734L14.0273 4.47134V4.47201ZM2.97066 4.47201L2.02733 3.52734L4.02133 1.52734L4.96466 2.47201L2.972 4.47201H2.97066Z"
                          fill="#23A6F0"
                        />
                      </svg>
                      22 April 2021
                    </h5>
                    <h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        style={{ marginRight: 5 }}
                      >
                        <g clipPath="url(#clip0_2058_46)">
                          <path
                            d="M16.3333 13.8334H2V0.833415C2 0.741748 1.925 0.666748 1.83333 0.666748H0.666667C0.575 0.666748 0.5 0.741748 0.5 0.833415V15.1667C0.5 15.2584 0.575 15.3334 0.666667 15.3334H16.3333C16.425 15.3334 16.5 15.2584 16.5 15.1667V14.0001C16.5 13.9084 16.425 13.8334 16.3333 13.8334ZM3.5 12.5001H14.6667C14.7583 12.5001 14.8333 12.4251 14.8333 12.3334V3.25008C14.8333 3.10008 14.6521 3.02716 14.5479 3.13133L10.1667 7.51258L7.55417 4.92925C7.52284 4.89823 7.48054 4.88083 7.43646 4.88083C7.39238 4.88083 7.35007 4.89823 7.31875 4.92925L3.38125 8.87925C3.36596 8.89457 3.35385 8.91277 3.34562 8.93279C3.3374 8.95281 3.33322 8.97427 3.33333 8.99591V12.3334C3.33333 12.4251 3.40833 12.5001 3.5 12.5001Z"
                            fill="#23856D"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2058_46">
                            <rect
                              width={16}
                              height="14.6667"
                              fill="white"
                              transform="translate(0.5 0.666748)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      10 comments
                    </h5>
                  </div>
                  <a href="">
                    Learn More
                    <i className="fa-solid fa-chevron-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-md-4 mb-lg-0">
              <div className="post-card">
                <div className="post-img">
                  <img src="./assets/post2.png" alt="" />
                </div>
                <span>NEW</span>
                <div className="post-details d-flex flex-column">
                  <div className="d-flex gap-3 align-items-center">
                    <small className="active">Google</small>
                    <small>Trending</small>
                    <small>New</small>
                  </div>
                  <h3>Loudest à la Madison #1 (L'integral)</h3>
                  <p>
                    We focus on ergonomics and meeting you where you work. It's
                    only a keystroke away.
                  </p>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        style={{ marginRight: 5 }}
                      >
                        <path
                          d="M8.49933 14.6667C5.20378 14.6232 2.54277 11.9622 2.49933 8.66668C2.54277 5.37113 5.20378 2.71011 8.49933 2.66668C11.7949 2.71011 14.4559 5.37113 14.4993 8.66668C14.4559 11.9622 11.7949 14.6232 8.49933 14.6667ZM8.49933 4.00001C5.93611 4.03376 3.86641 6.10346 3.83266 8.66668C3.86641 11.2299 5.93611 13.2996 8.49933 13.3333C11.0625 13.2996 13.1322 11.2299 13.166 8.66668C13.1322 6.10346 11.0625 4.03376 8.49933 4.00001ZM11.8327 9.33334H7.83266V5.33334H9.16599V8.00001H11.8327V9.33334ZM14.0273 4.47201L12.0213 2.47201L12.9607 1.52734L14.9673 3.52734L14.0273 4.47134V4.47201ZM2.97066 4.47201L2.02733 3.52734L4.02133 1.52734L4.96466 2.47201L2.972 4.47201H2.97066Z"
                          fill="#23A6F0"
                        />
                      </svg>
                      22 April 2021
                    </h5>
                    <h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        style={{ marginRight: 5 }}
                      >
                        <g clipPath="url(#clip0_2058_46)">
                          <path
                            d="M16.3333 13.8334H2V0.833415C2 0.741748 1.925 0.666748 1.83333 0.666748H0.666667C0.575 0.666748 0.5 0.741748 0.5 0.833415V15.1667C0.5 15.2584 0.575 15.3334 0.666667 15.3334H16.3333C16.425 15.3334 16.5 15.2584 16.5 15.1667V14.0001C16.5 13.9084 16.425 13.8334 16.3333 13.8334ZM3.5 12.5001H14.6667C14.7583 12.5001 14.8333 12.4251 14.8333 12.3334V3.25008C14.8333 3.10008 14.6521 3.02716 14.5479 3.13133L10.1667 7.51258L7.55417 4.92925C7.52284 4.89823 7.48054 4.88083 7.43646 4.88083C7.39238 4.88083 7.35007 4.89823 7.31875 4.92925L3.38125 8.87925C3.36596 8.89457 3.35385 8.91277 3.34562 8.93279C3.3374 8.95281 3.33322 8.97427 3.33333 8.99591V12.3334C3.33333 12.4251 3.40833 12.5001 3.5 12.5001Z"
                            fill="#23856D"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2058_46">
                            <rect
                              width={16}
                              height="14.6667"
                              fill="white"
                              transform="translate(0.5 0.666748)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      10 comments
                    </h5>
                  </div>
                  <a href="">
                    Learn More
                    <i className="fa-solid fa-chevron-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="post-card">
                <div className="post-img">
                  <img src="./assets/post3.png" alt="" />
                </div>
                <span>NEW</span>
                <div className="post-details d-flex flex-column">
                  <div className="d-flex gap-3 align-items-center">
                    <small className="active">Google</small>
                    <small>Trending</small>
                    <small>New</small>
                  </div>
                  <h3>Loudest à la Madison #1 (L'integral)</h3>
                  <p>
                    We focus on ergonomics and meeting you where you work. It's
                    only a keystroke away.
                  </p>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        style={{ marginRight: 5 }}
                      >
                        <path
                          d="M8.49933 14.6667C5.20378 14.6232 2.54277 11.9622 2.49933 8.66668C2.54277 5.37113 5.20378 2.71011 8.49933 2.66668C11.7949 2.71011 14.4559 5.37113 14.4993 8.66668C14.4559 11.9622 11.7949 14.6232 8.49933 14.6667ZM8.49933 4.00001C5.93611 4.03376 3.86641 6.10346 3.83266 8.66668C3.86641 11.2299 5.93611 13.2996 8.49933 13.3333C11.0625 13.2996 13.1322 11.2299 13.166 8.66668C13.1322 6.10346 11.0625 4.03376 8.49933 4.00001ZM11.8327 9.33334H7.83266V5.33334H9.16599V8.00001H11.8327V9.33334ZM14.0273 4.47201L12.0213 2.47201L12.9607 1.52734L14.9673 3.52734L14.0273 4.47134V4.47201ZM2.97066 4.47201L2.02733 3.52734L4.02133 1.52734L4.96466 2.47201L2.972 4.47201H2.97066Z"
                          fill="#23A6F0"
                        />
                      </svg>
                      22 April 2021
                    </h5>
                    <h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        style={{ marginRight: 5 }}
                      >
                        <g clipPath="url(#clip0_2058_46)">
                          <path
                            d="M16.3333 13.8334H2V0.833415C2 0.741748 1.925 0.666748 1.83333 0.666748H0.666667C0.575 0.666748 0.5 0.741748 0.5 0.833415V15.1667C0.5 15.2584 0.575 15.3334 0.666667 15.3334H16.3333C16.425 15.3334 16.5 15.2584 16.5 15.1667V14.0001C16.5 13.9084 16.425 13.8334 16.3333 13.8334ZM3.5 12.5001H14.6667C14.7583 12.5001 14.8333 12.4251 14.8333 12.3334V3.25008C14.8333 3.10008 14.6521 3.02716 14.5479 3.13133L10.1667 7.51258L7.55417 4.92925C7.52284 4.89823 7.48054 4.88083 7.43646 4.88083C7.39238 4.88083 7.35007 4.89823 7.31875 4.92925L3.38125 8.87925C3.36596 8.89457 3.35385 8.91277 3.34562 8.93279C3.3374 8.95281 3.33322 8.97427 3.33333 8.99591V12.3334C3.33333 12.4251 3.40833 12.5001 3.5 12.5001Z"
                            fill="#23856D"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2058_46">
                            <rect
                              width={16}
                              height="14.6667"
                              fill="white"
                              transform="translate(0.5 0.666748)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      10 comments
                    </h5>
                  </div>
                  <a href="">
                    Learn More
                    <i className="fa-solid fa-chevron-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* reviews  */}
        <section className="reviews">
          <div className="row">
            <div className="col-lg-7 col-md-5 col-12">
              <h3>What they say about us</h3>
              <div className="person d-flex flex-column align-items-center">
                <img src="./assets/user.png" alt="" />
                <div className="stars d-flex gap-2 align-items-center">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-regular fa-star" />
                </div>
                <p>
                  Slate helps you see how many more days you need to work to
                  reach your financial goal.
                </p>
                <h5>Regina Miles</h5>
                <h6>Designer</h6>
              </div>
            </div>
            <div className="col-lg-5 col-md-7 col-12">
              <div className="row">
                <div className="col-4">
                  <img
                    src="./assets/review1.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="./assets/review2.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="./assets/review3.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="./assets/review4.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="./assets/review5.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="./assets/review6.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="./assets/review7.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="./assets/review8.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="./assets/review9.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* call to action  */}
      <section className="call-to-action d-flex flex-column align-items-center">
        <h6>Designing Better Experience</h6>
        <h3>Problems trying to resolve the conflict between</h3>
        <p>
          Problems trying to resolve the conflict between the two major realms
          of Classical physics:
        </p>
        <h4>$16.48</h4>
        <button>ADD YOUR CALL TO ACTION</button>
      </section>
      {/* footer  */}
      <Footer />
    </div>
  );
}
