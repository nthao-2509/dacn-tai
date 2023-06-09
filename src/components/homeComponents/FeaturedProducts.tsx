import Container from 'common/Container'
import React from 'react'
import { StyleFeatureProduct } from './style'
import { DataFeaturedProducts } from 'modules/data-fake'
import { TypeDataProduct, TypeFeaturedProducts } from 'types/Types'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import CardGrid from 'common/CardGrid'
import { StyleCardGrid } from 'components/style'
import axios from 'axios'
import { UrlServer } from 'config/UrlServer'
import { FormatMoney } from 'format-money-js'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { addToCart } from 'features/cart/cartSlice'
import { addToWishList } from 'features/wishlist/wishListSlice'
const formatter = new Intl.NumberFormat('vi', {
  style: 'currency',
  currency: 'VND',
})
const FeaturedProducts = () => {
  const { product: dataProduct } = useSelector((state: any) => state.product)
  const cartT = useSelector((state: any) => state.cart)

  const customPagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="custom_pagination ' + className + '">' + '</span>'
    },
  }
  const dispatch = useDispatch<AppDispatch>()
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product))
  }
  const handleAddToWishList = (product: any) => {
    dispatch(addToWishList(product))
  }

  return (
    <StyleFeatureProduct>
      <Container>
        <h1 className='main__title'>Sản phẩm mới </h1>
        <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={customPagination}
          className='mySwiper'
          style={{
            paddingBottom: 50,
          }}
        >
          {dataProduct?.map((item: any, index: number) => {
            return (
              <SwiperSlide>
                <div className='cards__item' key={index}>
                  <div className='icon'>
                    <i onClick={() => handleAddToCart(item)} className='fa-solid fa-cart-shopping'></i>
                    <i onClick={() => handleAddToWishList(item)} className='fa-regular fa-heart'></i>
                  </div>
                  <div className='cards__item-image'>
                    <img
                      src={`${UrlServer}/image/${item.images?.[0]}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      alt={item.nameProduct}
                    />
                  </div>
                  <NavLink to={'product/' + item.slug}>
                    <div className='cards__item-button-view'>View Details</div>
                  </NavLink>
                  <div
                    className='cards__item-content'
                    style={{
                      padding: '10px 15px',
                    }}
                  >
                    <div className='title'>
                      <h3>{item.nameProduct}</h3>
                    </div>
                    <div className='price'>
                      <span>{formatter.format(item.priceProduct)}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Container>
    </StyleFeatureProduct>
  )
}

export default FeaturedProducts
