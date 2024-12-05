interface TextButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function TextButton(props: TextButtonProps) {
  return (
    <button
      className="text-sm text-primary font-semibold cursor-pointer hover:opacity-60 transition-all disabled:text-secondary"
      disabled={props.disabled}
      type="button"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
