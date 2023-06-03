import styles from "./ProgressCircle.module.scss";
import { motion } from "framer-motion";

const ProgressCircle = ({ unit, maxValue, currentValue, habitColor }) => {
	const progressText = `${currentValue} of ${maxValue}`;
	const progressValue = currentValue / maxValue;
	const circleMaxProgressValue = Math.round(283 * progressValue);


	return (
		<div className={styles["circle-box"]}>
			<svg className={styles["circle-box__svg"]} viewBox='0 0 100 100'>
				<g className={styles["circle-box__circle"]}>
					<circle
						className={styles["circle-box__path-elapsed"]}
						cx='50'
						cy='50'
						r='45'
					/>
					<motion.path
						initial={{ strokeDasharray: "0, 283" }}
						animate={{ strokeDasharray: `${circleMaxProgressValue}, 283` }}
						transition={{ duration: 0.3, ease: "linear" }}
						className={styles["circle-box__path-remaining"]}
						style={{stroke: habitColor}}
						d='
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0'></motion.path>
				</g>
			</svg>
			<div className={styles["circle-box__text-box"]}>
				<p className={styles["circle-box__text-box--progress-text"]}>
					{[progressText]}
				</p>
				<p className={styles["circle-box__text-box--unit-text"]}>{unit}</p>
			</div>
		</div>
	);
};

export default ProgressCircle;
