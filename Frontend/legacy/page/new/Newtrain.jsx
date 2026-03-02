import NewsListPage from "./NewsListPage";
import { NEWS_CATEGORIES } from "../../data/news";

export default function Newtrain(props) {
  return (
    <NewsListPage
      {...props}
      title={NEWS_CATEGORIES.TRAINING.label}
      category={NEWS_CATEGORIES.TRAINING.key}
    />
  );
}
