import { useEffect, useState } from "react";
import { buyGuideAPI } from "../../../services/buyGuideAPI";
import { Markup } from "interweave";
import './style.scss'

const BuyGuide = () => {
  const [buyGuide, setBuyGuide] = useState({});

  const getActiveBuyGuide = async () => {
    try {
      const res = await buyGuideAPI.getAllBuyGuide(1, 1, 0);
      if (res?.success){
        setBuyGuide(res?.payload?.buyGuide?.[0])
      }
    } catch (error) {
      console.log('getActiveBuyGuide >>> ', error);
    }
  }

  useEffect(() => {
    getActiveBuyGuide()
  }, []);

  return (
    <div>
      <div
        className='container-fluid page-header wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container'>
          <h1 className='display-3 mb-3 animated slideInDown'>
            HƯỚNG DẪN MUA HÀNG
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb mb-0'>
              <li className='breadcrumb-item'>
                <a className='text-body' href='/'>
                  Trang chủ
                </a>
              </li>
              <li className='breadcrumb-item'>
                <a className='text-body'>
                  Hướng dẫn mua hàng
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container-xxl guide-container">
        <div className="buy-guide-title">
          {buyGuide?.title}
        </div>
        <div className="guide-detail-description">
          <Markup content={buyGuide?.guide_description} />
        </div>
      </div>
    </div>
  );
};

export default BuyGuide;
