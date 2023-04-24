import { useState, useEffect, useCallback } from "react";
import DayCircle from "./DayCircle";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const DaySlider = ({ currentDay, setCurrentDay }) => {
	const [slides, setSlides] = useState([]);
	const [swiper, setSwiper] = useState({});
	const [slidesSubstractNum, setSlidesSubstractNum] = useState(0);
	const formatedDay = parseInt(currentDay.format("D"));

	const activeSlideHandler = useCallback(
		async activeIndex => {
			if (swiper.initialized && slides.length > 0) {
				const filteredSlides = slides.filter(slide => slide !== null);
				const choosedNum = parseInt(filteredSlides[swiper.activeIndex].key);
				setCurrentDay(choosedNum);
				swiper.slideTo(activeIndex + 1);
			}
		},
		[swiper, slides, setCurrentDay]
	);
	const getSlidesHandler = useCallback(
		(manualActiveIndex = null) => {
			const activeIndex = manualActiveIndex || formatedDay;
			const sliderElements = [];
			let subtractionNum = activeIndex - 6;

			const prevMonth = moment().subtract(1, "month").month();
			const year = moment().year();
			const date = moment({ year, month: prevMonth });
			const monthDays = date.daysInMonth();

			const getStartIndex = () => {
				if (subtractionNum < 0) {
					return { index: monthDays + subtractionNum, currentMonth: false };
				} else if (subtractionNum === 0) {
					return { index: monthDays, currentMonth: false };
				} else if (subtractionNum > 0 && subtractionNum <= monthDays) {
					return { index: subtractionNum, currentMonth: true };
				} else {
					return { index: subtractionNum - monthDays, currentMonth: false };
				}
			};

			const startIndex = getStartIndex();
			for (
				let i = startIndex.index;
				i < startIndex.index + 13 + startIndex.index;
				i++
			) {
				if (i < startIndex.index + startIndex.index) {
					sliderElements.push(null);
				} else {
					let dayNumber = i - startIndex.index;
					if (!startIndex.currentMonth) {
						if (dayNumber < monthDays) {
							const el = <SwiperSlide key={dayNumber}></SwiperSlide>;
							sliderElements.push(el);
						} else {
							let newMonthIndex = dayNumber - monthDays;
							const el = <SwiperSlide key={newMonthIndex}></SwiperSlide>;
							sliderElements.push(el);
						}
					} else {
						const el = <SwiperSlide key={dayNumber}></SwiperSlide>;
						sliderElements.push(el);
					}
				}
			}

			let substractNumber = 0;
			const outputSlider = sliderElements.map((el, index) => {
				if (el !== null) {
					setSlidesSubstractNum(substractNumber);
					let key = parseInt(el.key);
					if (key !== activeIndex) {
						return (
							<SwiperSlide
								key={key}
								onClick={() => activeSlideHandler(index - substractNumber - 1)}>
								<DayCircle number={key} />
							</SwiperSlide>
						);
					} else {
						return (
							<SwiperSlide
								key={key}
								onClick={() => activeSlideHandler(index - substractNumber - 1)}>
								<DayCircle number={key} active />
							</SwiperSlide>
						);
					}
				} else {
					substractNumber++;
					return null;
				}
			});

			if (swiper.initialized) {
				setSlides(outputSlider);
			}
		},
		[activeSlideHandler, swiper, formatedDay]
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

	const slidesHandler = () => {
		if (slides.length > 0) {
			getSlidesHandler(
				parseInt(slides[swiper.activeIndex + slidesSubstractNum].key)
			);
		}
	};

	const sliderParams = {
		modules: [Navigation],
		navigation: true,
		initialSlide: 6,
		slidesPerView: 7,
		allowTouchMove: false,
		centeredSlides: true,
		centeredSlidesBounds: true,
		slideToClickedSlide: true,
		onSwiper: swiper => initSwiperHandler(swiper),
		onClick: () => slidesHandler(),
		onNavigationNext: () => {
			getSlidesHandler(
				parseInt(slides[swiper.activeIndex + slidesSubstractNum].key)
			);
			swiper.slideTo(6);
		},
		onNavigationPrev: () => {
			getSlidesHandler(
				parseInt(slides[swiper.activeIndex + slidesSubstractNum].key)
			);
			swiper.slideTo(6);
		},
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
