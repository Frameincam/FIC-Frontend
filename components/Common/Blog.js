import Link from 'next/link';

const Blog = ({ bgColor }) => {
  return (
    <>
      <section className={`blog-area ${bgColor} with-events pt-100 pb-70`}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 col-md-12'>
              <div className='blog-item-list'>
                <h2>Events</h2>

                <div className='row'>
                  <div className='col-lg-4 col-md-6'>
                    <div className='single-blog-post'>
                      <div className='post-image'>
                       
                          <a className='d-block'>
                            <img className='events-img' src='/images/blog/blog1.jpeg' alt='image' />
                          </a>
                       
                      </div>

                      {/* <div className='post-content'>
                        <ul className='post-meta d-flex align-items-center'>
                          <li>
                            <div className='d-flex align-items-center'>
                              <img src='/images/user1.jpg' alt='image' />
                              <span>
                                <a href='#'>Taylor</a>
                              </span>
                            </div>
                          </li>
                          <li>
                            <i className='flaticon-calendar'></i> Aug 7, 2020
                          </li>
                        </ul>
                        <h3>
                          <Link href='/single-blog-1'>
                            <a>
                              10 Types of Social Proof and What Makes Them
                              Effective
                            </a>
                          </Link>
                        </h3>
                        <Link href='/single-blog-1'>
                          <a className='link-btn'>
                            <i className='flaticon-right-arrow'></i>
                          </a>
                        </Link>
                      </div> */}
                    </div>
                  </div>

                  <div className='col-lg-4 col-md-6'>
                    <div className='single-blog-post'>
                      <div className='post-image'>
                        
                          <a className='d-block'>
                            <img className='events-img' src='/images/blog/blog2.jpeg' alt='image' />
                          </a>
                        
                      </div>

                      {/* <div className='post-content'>
                        <ul className='post-meta d-flex align-items-center'>
                          <li>
                            <div className='d-flex align-items-center'>
                              <img src='/images/user2.jpg' alt='image' />
                              <span>
                                <a href='#'>Sarah</a>
                              </span>
                            </div>
                          </li>
                          <li>
                            <i className='flaticon-calendar'></i> Aug 6, 2020
                          </li>
                        </ul>
                        <h3>
                          <Link href='/single-blog-1'>
                            <a>
                              Tech Products That Make It Easier to Stay Home
                            </a>
                          </Link>
                        </h3>
                        <Link href='/single-blog-1'>
                          <a className='link-btn'>
                            <i className='flaticon-right-arrow'></i>
                          </a>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
