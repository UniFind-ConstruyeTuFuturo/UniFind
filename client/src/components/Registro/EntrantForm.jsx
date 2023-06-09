import { useState } from "react";
import PropTypes from "prop-types";
import { post } from "../../api/api";
import "./form.css";

function EntrantForm({ handleChange, form, setStep }) {
  const spanVacio = {
    spanEmail: "",
    spanName: "",
    spanPassword: "",
    spanPassword2: "",
    spanDate: "",
    spanDirection: "",
    spanTel: "",
    spanTitle: "",
  };
  const [span, setSpan] = useState(spanVacio);

  const handleBlur = async () => {
    try {
      const response = await post("/validate-registro", form);
      const data = await response.json();
      setSpan({ ...spanVacio, ...data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await post("/entrant/first-step", form);
      const data = await response.json();
      if (data.success) {
        console.log("Etapa 2");
        setStep(2);
      } else {
        setSpan({ ...spanVacio, ...data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        <div className="inputbox">
          <input
            className="typebox"
            type="text"
            name="mail_user"
            id="mail_user"
            placeholder=" "
            value={form.mail_user}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>{span.spanEmail}</span>
          <label htmlFor="correo">Correo</label>
        </div>
        <div className="inputbox">
          <input
            className="typebox"
            type="text"
            name="name_user"
            id="name_user"
            placeholder=" "
            value={form.name_user}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>{span.spanName}</span>
          <label htmlFor="nombre">Nombre</label>
        </div>
        <div className="inputbox">
          <input
            className="typebox"
            type="password"
            name="password_user"
            id="password_user"
            placeholder=" "
            value={form.password_user}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>{span.spanPassword}</span>
          <label htmlFor="contrasena">Contraseña</label>
        </div>
        <div className="inputbox">
          <input
            className="typebox"
            type="password"
            name="password2_user"
            id="password2_user"
            placeholder=" "
            value={form.password2_user}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>{span.spanPassword2}</span>
          <label htmlFor="password2_user">Repetir Contraseña</label>
        </div>
        <div className="inputbox">
          <input
            className="typebox"
            type="date"
            name="date_user"
            id="date_user"
            placeholder=" "
            value={form.date_user}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>{span.spanDate}</span>
          <label htmlFor="nacimiento">Fecha de Nacimiento</label>
        </div>
        <div className="inputbox">
          <input
            className="typebox"
            type="text"
            name="direction_user"
            id="direction_user"
            placeholder=" "
            value={form.direction_user}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>{span.spanDirection}</span>
          <label htmlFor="direccion">Dirección</label>
        </div>
        <div className="inputbox">
          <input
            className="typebox"
            type="tel"
            name="tel_user"
            id="tel_user"
            placeholder=" "
            value={form.tel_user}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>{span.spanTel}</span>
          <label htmlFor="telefono">Teléfono</label>
        </div>
        <div className="inputbox">
          <input
            className="typebox"
            type="text"
            name="title"
            id="title"
            placeholder=" "
            value={form.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>{span.spanTitle}</span>
          <label htmlFor="titulo">Título Secundario</label>
        </div>

        <input className="boton" type="submit" name="boton" id="boton" />
        <br />
        <p>
          <a href="#">Ya tengo una cuenta</a>
        </p>
      </form>
    </div>
  );
}
EntrantForm.propTypes = {
  handleChange: PropTypes.func,
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
export default EntrantForm;
