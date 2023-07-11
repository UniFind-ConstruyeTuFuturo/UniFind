import "./form.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { post } from "../../api/api";

function EntrantCode({ form, setStep }) {
  const [code, setCode] = useState(0);
  const [spanCode, setSpanCode] = useState("");

  const handleClick = () => setStep(1);

  const handleChange = (e) => setCode(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await post("/entrant/second-step", {
        ...form,
        code: code,
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setSpanCode("");
        setStep(3);
      } else {
        setSpanCode(data.spanCode);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let disabled;
  return (
    <>
      <div className="box">
        <button
          className="absolute top-8 left-8"
          type="button"
          id="volver"
          onClick={handleClick}
        >
          VOLVER
        </button>
        <form onSubmit={handleSubmit}>
          <p>
            <a id="repeat" href="">
              Solicitar nuevo código
            </a>
          </p>
          <div className="inputbox">
            <input
              className="typebox"
              type="number"
              name="code"
              placeholder="000000"
              value={code}
              disabled={disabled}
              onChange={handleChange}
            />
            <span>{spanCode}</span>
            <label htmlFor="">Ingresar Código</label>
          </div>
          <input
            className="boton"
            id="submit"
            type="submit"
            name="boton"
            disabled={disabled}
          />
        </form>
      </div>
    </>
  );
}
EntrantCode.propTypes = {
  form: PropTypes.shape({
    mail_user: PropTypes.string,
    name_user: PropTypes.string,
    password_user: PropTypes.string,
    password2_user: PropTypes.string,
    date_user: PropTypes.string,
    direction_user: PropTypes.string,
    tel_user: PropTypes.string,
    title: PropTypes.string,
  }),
  setStep: PropTypes.func,
};
export default EntrantCode;