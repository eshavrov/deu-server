const Cross = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 11 11"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M10 1L1 10M10 10L1 1L10 10Z" />
    </svg>
  );
};

export default Cross;
