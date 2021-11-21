const Dialog = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 45 45"
      stroke="none"
      fill="currentColor"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M15.75 45a2.25 2.25 0 0 1-2.25-2.25V36h-9A4.5 4.5 0 0 1 0 31.5v-27C0 2.002 2.025 0 4.5 0h36A4.5 4.5 0 0 1 45 4.5v27a4.5 4.5 0 0 1-4.5 4.5H26.775l-8.325 8.347a2.293 2.293 0 0 1-1.575.653H15.75ZM18 31.5v6.93l6.93-6.93H40.5v-27h-36v27H18Z" />
    </svg>
  );
};

export default Dialog;
