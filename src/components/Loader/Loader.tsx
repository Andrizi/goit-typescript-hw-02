import css from "../Loader/Loader.module.css";
import GridLoader from "react-spinners/GridLoader";

type LoaderProps = {
  loading: boolean;
};

export default function Loader({ loading }: LoaderProps) {
  if (loading) {
    return (
      <div className={css.container}>
        <GridLoader className={css.loader} color="#3f51b5" size={20} />
      </div>
    );
  }

  return null;
}
