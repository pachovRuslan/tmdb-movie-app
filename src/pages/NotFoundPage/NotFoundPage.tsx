import { Link } from "react-router";
import s from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <div className={s.page}>
      <p className={s.code}>404</p>
      <p className={s.message}>Page not found</p>
      <Link to="/" className={s.homeButton}>
        Back to Main
      </Link>
    </div>
  );
};
