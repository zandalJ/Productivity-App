import { useRef } from "react";
import DayCircle from "./DayCircle";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const DaySlider = () => {
	const swiperRef = useRef(null);
	const currentDay = parseInt(moment().format("D"));
	const sliderElements = [];

	const activeSlideHandler = index => {
		console.log(index);
		swiperRef.current?.slider.slideTo(index);
	};

	for (let i = 1; i < 32; i++) {
		if (i !== currentDay) {
			sliderElements.push(
				<SwiperSlide key={i} onClick={() => activeSlideHandler(i)}>
					<DayCircle number={i} />
				</SwiperSlide>
			);
		} else {
			sliderElements.push(
				<SwiperSlide key={i} onClick={() => activeSlideHandler(i)}>
					<DayCircle number={i} active />
				</SwiperSlide>
			);
		}
	}

	const sliderParams = {
		initialSlide: currentDay - 1,
		slidesPerView: 7,
		centeredSlides: true,
		centeredSlidesBounds: true,
		onClick: e => console.log(e.target),
	};

	return <Swiper ref={swiperRef} {...sliderParams}>{sliderElements}</Swiper>;
};

export default DaySlider;
