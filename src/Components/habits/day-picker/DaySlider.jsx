import { useState, useEffect, useCallback } from "react";
import DayCircle from "./DayCircle";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const DaySlider = () => {
	const [slides, setSlides] = useState([]);
	const [swiper, setSwiper] = useState(null);
	const currentDay = parseInt(moment().format("D"));

	const getSlidesHandler = useCallback((manualActiveIndex = null) => {
		const activeIndex = manualActiveIndex || currentDay;
		const sliderElements = [];
		let subtractionNum = activeIndex - 30;

		const prevMonth = moment().subtract(1, "month").month();
		const year = moment().year();
		const date = moment({ year, month: prevMonth });
		const monthDays = date.daysInMonth();

		const getStartIndex = () => {
			if (subtractionNum < 0) {
				return { index: monthDays + subtractionNum, currentMonth: false };
			} else if (subtractionNum === 0) {
				return { index: monthDays, currentMonth: false };
			} else {
				return { index: subtractionNum, currentMonth: true };
			}
		};

		const startIndex = getStartIndex();

		for (let i = startIndex.index; i < startIndex.index + 30; i++) {
			if (!startIndex.currentMonth) {
				if (i <= monthDays) {
					console.log('ok');
					const el = (
						<SwiperSlide key={i} onClick={() => activeSlideHandler(i)}>
							<DayCircle number={i} />
						</SwiperSlide>
					);
					sliderElements.push(el);
				} else {
					let newMonthIndex = i - monthDays;
					const el = (
						<SwiperSlide
							key={newMonthIndex}
							onClick={() => activeSlideHandler(newMonthIndex)}>
							<DayCircle number={newMonthIndex} />
						</SwiperSlide>
					);
					sliderElements.push(el);
				}
			} else {
				const el = (
					<SwiperSlide key={i} onClick={() => activeSlideHandler(i)}>
						<DayCircle number={i} />
					</SwiperSlide>
				);
				sliderElements.push(el);
			}
		}

		const outputSlider = sliderElements.map((el, index) => {
			let key = parseInt(el.key) + 1;
			if (key !== activeIndex) {
				return (
					<SwiperSlide key={key} onClick={() => activeSlideHandler(key)}>
						<DayCircle number={key} />
					</SwiperSlide>
				);
			} else {
				return (
					<SwiperSlide key={key} onClick={() => activeSlideHandler(key)}>
						<DayCircle number={key} active />
					</SwiperSlide>
				);
			}
		});

		console.log(outputSlider);
		setSlides(outputSlider);
	}, []);

	const activeSlideHandler = activeIndex => {
		swiper.slideTo(activeIndex - 1);
		getSlidesHandler(activeIndex);
	};

	useEffect(() => {
		if (swiper) {
			getSlidesHandler();
		}
	}, [swiper]);

	useEffect(() => {
		console.log(slides);
	}, [slides]);

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

// ugulem dziala tylko z liczbami cos sie jebie tzn jest dzien nr2 a pozniej nagle 32 (bez 1) i na slidera wypierdala za kazdym kliknieciu elementa
