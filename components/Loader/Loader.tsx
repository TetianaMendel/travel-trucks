import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.overlay}>
      <div className={css.loader}>
        <div className={css.spinner} />

        <div className={css.content}>
          <h2 className={css.title}>Loading tracks...</h2>

          <p className={css.text}>
            Please wait while we fetch the best
            <br />
            travel trucks for you
          </p>
        </div>
      </div>
    </div>
  );
}