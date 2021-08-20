import "./Button.css";

export const Button = (props: any) => {
  return (
    <button className={`${props.name} slide`} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
