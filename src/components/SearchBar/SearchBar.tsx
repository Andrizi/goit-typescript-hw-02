import css from "./SearchBar.module.css";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

type SearchBarProps = {
  onSubmit: (topic: string) => void;
};

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [topic, setTopic] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topic.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }
    onSubmit(topic);
    setTopic("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={topic}
          onChange={handleChange}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
