import { useState, useEffect, useCallback } from "react";
import DayCircle from "./DayCircle";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const DaySlider = () => {
	const [slides, setSlides] = useState([]);
	const [swiper, setSwiper] = useState({});
	const currentDay = parseInt(moment().format("D"));

	const activeSlideHandler = useCallback(
		activeIndex => {
			if (swiper.initialized && slides.length>0) {
				console.log(activeIndex);
				console.log('ok');
				swiper.slideTo(activeIndex);
			}
		},
		[swiper, slides]
	);

	const getSlidesHandler = useCallback(
		(manualActiveIndex = null) => {
			const activeIndex = manualActiveIndex || currentDay;
			const sliderElements = [];
			let subtractionNum = activeIndex - 14;

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
			for (
				let i = startIndex.index;
				i < startIndex.index + 29 + startIndex.index;
				i++
			) {
				if (i < startIndex.index + startIndex.index) {
					sliderElements.push(null);
				} else {
					let dayNumber = i - startIndex.index;
					if (!startIndex.currentMonth) {
						if (dayNumber < monthDays) {
							const el = (
								<SwiperSlide
									key={dayNumber}
									onClick={() => activeSlideHandler(dayNumber)}>
									<DayCircle number={dayNumber} />
								</SwiperSlide>
							);
							sliderElements.push(el);
						} else {
							let newMonthIndex = dayNumber - monthDays;
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
							<SwiperSlide
								key={dayNumber}
								onClick={() => activeSlideHandler(dayNumber)}>
								<DayCircle number={dayNumber} />
							</SwiperSlide>
						);
						sliderElements.push(el);
					}
				}
			}

			const outputSlider = sliderElements.map((el, index) => {
				if (el !== null) {
					let key = parseInt(el.key) + 1;
					if (key !== activeIndex) {
						return (
							<SwiperSlide key={key} onClick={() => activeSlideHandler(index)}>
								<DayCircle number={key} />
							</SwiperSlide>
						);
					} else {
						return (
							<SwiperSlide key={key} onClick={() => activeSlideHandler(index)}>
								<DayCircle number={key} active />
							</SwiperSlide>
						);
					}
				} else {
					return null;
				}
			});

			if (swiper.initialized) {
				setSlides(outputSlider);
			}
		},
		[currentDay, activeSlideHandler, swiper.initialized]
	);

	useEffect(() => {
		if (swiper && !swiper.destroyed) {
			if (slides.length === 0) {
				getSlidesHandler();
			}
		}
	}, [swiper, getSlidesHandler, slides.length]);

	const initSwiperHandler = useCallback(swiper => {
		setSwiper(swiper);
	}, []);

	// const slidesHandler = () => {
	// 	if (slides.length > 0) {
	// 		console.log(swiper.activeIndex);
	// 		console.log(parseInt(slides[swiper.activeIndex].key));
	// 		getSlidesHandler(parseInt(slides[swiper.activeIndex].key));
	// 		console.log(swiper);
	// 		console.log(slides);
	// 	}
	// };

	useEffect(() => {
		console.log(swiper);
	}, [swiper])

	useEffect(() => {
		console.log(slides);
	}, [slides])

	const sliderParams = {
		initialSlide: 13,
		slidesPerView: 7,
		centeredSlides: true,
		centeredSlidesBounds: true,
		slideToClickedSlide: true,
		onSwiper: swiper => initSwiperHandler(swiper),
		// onSlideChange: () => slidesHandler(),
	};

	return (
		<Swiper {...sliderParams}>
			{swiper.initialized &&
				slides.map(item => {
					if (item === null) {
						return null;
					}
					return item;
				})}
		</Swiper>
	);
};

export default DaySlider;
