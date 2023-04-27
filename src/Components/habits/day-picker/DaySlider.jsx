import { useState, useEffect, useCallback, useReducer } from "react";
import DayCircle from "./DayCircle";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const reducer = (state, action) => {
	switch (action.type) {
		case "increment_day_diffrence": {
			return {
				currentDayDiffrence: state.currentDayDiffrence++,
				previousDay: state.previousDay,
			};
		}
		case "decrement_day_diffrence": {
			return {
				currentDayDiffrence: state.currentDayDiffrence--,
				previousDay: state.previousDay,
			};
		}
		case "change_previous_day": {
			return {
				currentDayDiffrence: state.currentDayDiffrence,
				previousDay: action.previousDay,
			};
		}
	}
};

const DaySlider = ({ choosedDay, setChoosedDay }) => {
	const [slides, setSlides] = useState([]);
	const [swiper, setSwiper] = useState({});
	const [slidesSubstractNum, setSlidesSubstractNum] = useState(0);
	const [leftToCurrentMonth, setLeftToCurrentMonth] = useState(null);

	const formatedDay = parseInt(choosedDay.format("D"));
	const currentDay = parseInt(moment().format("D"));

	const [state, dispatch] = useReducer(reducer, {
		currentDayDiffrence: 0,
		previousDay: formatedDay,
	});

	const prevMonth = moment().subtract(1, "month").month();
	const year = moment().year();
	const previousMonthDate = moment({ year, month: prevMonth });
	const previousMonthDays = previousMonthDate.daysInMonth();
	const currenntMonthDays = moment().daysInMonth();

	const activeSlideHandler = useCallback(
		async activeIndex => {
			if (swiper.initialized && slides.length > 0) {
				const filteredSlides = slides.filter(slide => slide !== null);
				const choosedNum = parseInt(filteredSlides[swiper.activeIndex].key);
				setChoosedDay(choosedNum);
				swiper.slideTo(activeIndex + 1);
			}
		},
		[swiper, slides, setChoosedDay]
	);
	const getSlidesHandler = useCallback(
		(manualActiveIndex = null, isInitial = false, clickedArrow = null) => {
			const activeIndex = manualActiveIndex || formatedDay;
			const sliderElements = [];
			let substractionNum = activeIndex - 6;

			const getStartIndex = () => {
				if (isInitial) {
					if (substractionNum < 0) {
						setLeftToCurrentMonth(previousMonthDays - substractionNum);
						return {
							index: previousMonthDays + substractionNum + 1,
							month: "previous",
						};
					} else if (substractionNum === 0) {
						setLeftToCurrentMonth(-1);
						return { index: previousMonthDays, month: "previous" };
					} else {
						setLeftToCurrentMonth(0);
						return { index: substractionNum, month: "current" };
					}
				} else {
					if (clickedArrow) {
						if (clickedArrow === "next") {
							if (state.currentDayDiffrence < 10) {
								dispatch({ type: "increment_day_diffrence" });
								leftToCurrentMonth < 0
									? setLeftToCurrentMonth(before => before++)
									: setLeftToCurrentMonth(before => (before += 0));
							} else {
								return { index: state.previousDay, month: "current" };
							}
						} else if (clickedArrow === "prev") {
							if (state.currentDayDiffrence > -10) {
								dispatch({ type: "decrement_day_diffrence" });
								setLeftToCurrentMonth(before => before--);
							} else {
								return { index: state.previousDay, month: "current" };
							}
						}
					}

					if (substractionNum < 0 && leftToCurrentMonth < 0) {
						return {
							index: previousMonthDays + substractionNum + 1,
							month: "previous",
						};
					} else if (substractionNum < 0 && leftToCurrentMonth === 0) {
						return {
							index: previousMonthDays + substractionNum,
							month: "next",
						};
					} else if (substractionNum > 0 && leftToCurrentMonth < 0) {
						return { index: substractionNum, month: "current" };
					} else if (substractionNum > 0 && leftToCurrentMonth === 0) {
						return { index: substractionNum, month: "next" };
					}else if(substractionNum === 0 && leftToCurrentMonth === 0){
						return { index: substractionNum, month: "next" };
					}
				}
			};

			const startIndex = getStartIndex();
			dispatch({
				type: "change_previous_day",
				previousDay: startIndex.index,
			});

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
						if (dayNumber <= previousMonthDays) {
							const el = <SwiperSlide key={dayNumber}></SwiperSlide>;
							sliderElements.push(el);
						} else {
							let newMonthIndex = dayNumber - previousMonthDays;
							const el = <SwiperSlide key={newMonthIndex}></SwiperSlide>;
							sliderElements.push(el);
						}
					} else {
						if (dayNumber <= currenntMonthDays) {
							const el = <SwiperSlide key={dayNumber}></SwiperSlide>;
							sliderElements.push(el);
						} else {
							let newMonthIndex = dayNumber - currenntMonthDays;
							const el = <SwiperSlide key={newMonthIndex}></SwiperSlide>;
							sliderElements.push(el);
						}
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
		[
			activeSlideHandler,
			swiper,
			formatedDay,
			leftToCurrentMonth,
			currenntMonthDays,
			previousMonthDays,
			state.currentDayDiffrence,
			state.previousDay,
		]
	);

	useEffect(() => {
		if (swiper && !swiper.destroyed) {
			if (slides.length === 0) {
				getSlidesHandler(undefined, true);
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
			if (state.currentDayDiffrence < 10) {
				getSlidesHandler(
					parseInt(slides[7 + slidesSubstractNum].key),
					undefined,
					"next"
				);
			} else {
				getSlidesHandler(
					parseInt(slides[6 + slidesSubstractNum].key),
					undefined,
					"next"
				);
			}

			swiper.slideTo(6);
		},
		onNavigationPrev: () => {
			if (state.currentDayDiffrence > -10) {
				getSlidesHandler(
					parseInt(slides[5 + slidesSubstractNum].key),
					undefined,
					"prev"
				);
			} else {
				getSlidesHandler(
					parseInt(slides[6 + slidesSubstractNum].key),
					undefined,
					"prev"
				);
			}

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
