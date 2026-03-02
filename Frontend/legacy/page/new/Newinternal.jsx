import { NEWS_CATEGORIES } from "../../data/news";
import NewsListPage from "./NewsListPage";

export default function Newinternal(props) {
  return (
    <NewsListPage
      {...props}
      title={NEWS_CATEGORIES.INTERNAL.label}
      category={NEWS_CATEGORIES.INTERNAL.key}
    />
  );
}
