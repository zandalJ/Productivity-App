import { motion } from "framer-motion";
const SideNavLinkText = ({open,variants,children}) => {
    return (
			<motion.span
				animate={open ? "open" : "closed"}
				initial={open ? "open" : "closed"}
				variants={variants}>{children}</motion.span>
		);
};

export default SideNavLinkText;
