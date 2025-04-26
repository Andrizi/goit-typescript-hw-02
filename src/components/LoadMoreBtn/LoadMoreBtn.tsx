import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  handleLoadMore: () => void;
  loadMore: boolean;
};

export default function LoadMoreBtn({
  handleLoadMore,
  loadMore,
}: LoadMoreBtnProps) {
  if (!loadMore) return null;

  return (
    <button className={css.button} onClick={handleLoadMore}>
      Load more
    </button>
  );
}
