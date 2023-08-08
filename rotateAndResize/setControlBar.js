// // Main control bar
// const mainbar = new ol.control.Bar();
// map.addControl(mainbar);

// // Editbar
// const editbar = new ol.control.EditBar({
//   source: vectorLayer, // .getSource(),
//   edition: false,
//   interactions: {
//     Select: false,
//     Delete: false,
//     Info: false,
//     Split: false,
//     Offset: false,
//   },
// });
// mainbar.addControl(editbar);

// Undo redo interaction
const undoInteraction = new ol.interaction.UndoRedo();
map.addInteraction(undoInteraction);

// // Add buttons to the bar
// const bar = new ol.control.Bar({
//   group: true,
//   controls: [
//     // new ol.control.Button({
//     //   html: '<i class="fa fa-undo" ></i>',
//     //   title: "undo...",
//     //   handleClick: function () {
//     //     undoInteraction.undo();
//     //   },
//     // }),
//     // new ol.control.Button({
//     //   html: '<i class="fa fa-repeat" ></i>',
//     //   title: "redo...",
//     //   handleClick: function () {
//     //     undoInteraction.redo();
//     //   },
//     // }),
//     new ol.control.Button({
//       html: '<i class="fa fa-undo" ></i>',
//       title: "reset...",
//       handleClick: function () {
//         const actionCnt = undoInteraction.length();
//         for (let i = 0; i < actionCnt; i++) {
//           undoInteraction.undo();
//           $("#rotateinfo").text("rotate: ");
//           $("#scaleinfo").text("scale: ");
//           makeResetValue();
//         }
//       },
//     }),
//   ],
// });
// mainbar.addControl(bar);

const resetEdit = () => {
  const actionCnt = undoInteraction.length();
  for (let i = 0; i < actionCnt; i++) {
    undoInteraction.undo();
    $("#rotateinfo").text("rotate: ");
    $("#scaleinfo").text("scale: ");
    makeResetValue();
    searchPlaceToCoor();
  }
};
