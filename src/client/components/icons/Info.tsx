const Info = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 45 45"
      fill="currentColor"
      stroke="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M20.25 29.25h4.5v4.5h-4.5v-4.5Zm0-18h4.5v13.5h-4.5v-13.5ZM22.5 0C10.057 0 0 10.125 0 22.5A22.5 22.5 0 1 0 22.5 0Zm0 40.5a18 18 0 1 1 0-36 18 18 0 0 1 0 36Z" />
    </svg>
  );
};

export default Info;
