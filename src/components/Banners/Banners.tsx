import cn from 'classnames'
import React, { FC, useEffect } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useStore } from '../../store/store'
import s from './Banners.module.scss'

const Banners: FC = () => {
	const { fetchDataBanners, banners } = useStore()
	const swiperRef = React.useRef<SwiperType>(null)

	useEffect(() => {
		fetchDataBanners()
	}, [])

	return (
		<div className={s.sliderWrapper}>
			<Swiper
				onBeforeInit={swiper => {
					swiperRef.current = swiper
				}}
				speed={500}
				spaceBetween={16}
				slidesPerView={4}
				modules={[Navigation]}
				loop={true}
				className={s.slider}
			>
				{[...banners, ...banners].map((banner, id) => (
					<SwiperSlide key={id} className={s.item}>
						<a href='' className={s.link}>
							<img
								className={s.img}
								src={banner.image.replace(/\\/g, '')}
								alt={banner.text}
							/>
							<span className={s.text}>{banner.text}</span>
						</a>
					</SwiperSlide>
				))}
			</Swiper>

			<button
				className={cn(s.sliderBtn, s.sliderBtnPrev)}
				onClick={() => swiperRef.current?.slidePrev()}
			>
				<MdNavigateBefore size={32} />
			</button>
			<button
				className={cn(s.sliderBtn, s.sliderBtnNext)}
				onClick={() => swiperRef.current?.slideNext()}
			>
				<MdNavigateNext size={32} />
			</button>
		</div>
	)
}

export default Banners
