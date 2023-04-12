import { useState, useEffect } from "react";
import DayCircle from "./DayCircle";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const DaySlider = () => {
	const [slides, setSlides] = useState([]);
	const [swiper, setSwiper] = useState(null);
	const currentDay = parseInt(moment().format("D"));

	const activeSlideHandler = activeIndex => {
		console.log(swiper);
		swiper.slideTo(activeIndex-1)
		const updatedSlides = slides.map((slide, index) => {
			let key = index+1
			if (key !== activeIndex) {
				return (
					<SwiperSlide key={key} onClick={() => activeSlideHandler(key)}>
						<DayCircle number={key} />
					</SwiperSlide>
				);
			}else{
				return (
					<SwiperSlide key={key} onClick={() => activeSlideHandler(key)}>
						<DayCircle number={key} active/>
					</SwiperSlide>
				);
			}
		})
		setSlides(updatedSlides)
	};

	useEffect(() => {
		if(swiper){
		const sliderElements = [];
		for (let i = 1; i < 32; i++) {
			if (i !== currentDay) {
				const el = (
					<SwiperSlide key={i} onClick={() => activeSlideHandler(i)}>
						<DayCircle number={i} />
					</SwiperSlide>
				);
				sliderElements.push(el);
			} else {
				const el = (
					<SwiperSlide key={i} onClick={() => activeSlideHandler(i)}>
						<DayCircle number={i} active />
					</SwiperSlide>
				);
				sliderElements.push(el)
			}
		}
		setSlides([...sliderElements]);
	}
	}, [swiper]);



	const sliderParams = {
		initialSlide: currentDay - 1,
		slidesPerView: 7,
		centeredSlides: true,
		centeredSlidesBounds: true,
		onSwiper: swiper => setSwiper(swiper),
	};

	return <Swiper {...sliderParams}>{slides}</Swiper>;
};

export default DaySlider;
