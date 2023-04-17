import { Nanofragment } from "nanofront/tools";
import "../../styles/home.css";

export default function Home({ props }) {
  console.log(props);
  return (
    <div className="center-and-column">
      <h1>Home page</h1>
      <Nanofragment name="about" podlets={props.podlets} />
      <Nanofragment name="react" podlets={props.podlets} />
    </div>
  );
}
