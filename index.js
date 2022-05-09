import dragAndDrop from "./src/dragAndDrop";
import "./src/style.sass";

new dragAndDrop("#card", {
  cardItems: ["React", "Native JS", "Redux", "Graph QL"],
});
