import "./buttonGeneral.scss";

export default function ButtonGeneral({ text, isHomeVisible }) {
  return (
    <button className={isHomeVisible ? "buttonGeneral" : "button-grey"}>
      {text}
    </button>
  );
}
