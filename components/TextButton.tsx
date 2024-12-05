interface TextButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function TextButton(props: TextButtonProps) {
  const className =
    "text-sm text-primary font-semibold cursor-pointer hover:opacity-60 transition-all disabled:text-secondary disabled:font-normal" +
    (props.className ? ` ${props.className}` : "");
  return (
    <button
      className={className}
      disabled={props.disabled}
      type="button"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
