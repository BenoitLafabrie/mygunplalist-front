import PropTypes from "prop-types";

const SlideArrowIcon = ({ width = "14", height = "19", fill = "#030303" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m.054 18.213v-5.113a.689.689 0 0 1 .689-.689h1.165a.689.689 0 0 1 .692.689.689.689 0 0 0 1.1.55l4.89-3.692a.689.689 0 0 0 0-1.1l-4.89-3.69a.689.689 0 0 0 -1.1.55.689.689 0 0 1 -.689.689h-1.168a.689.689 0 0 1 -.689-.689v-5.118a.689.689 0 0 1 1.1-.55l11.666 8.8a.689.689 0 0 1 0 1.1l-11.666 8.8a.689.689 0 0 1 -1.1-.537z"
      fill={fill}
      fillRule="evenodd"
    />
  </svg>
);

SlideArrowIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SlideArrowIcon;
