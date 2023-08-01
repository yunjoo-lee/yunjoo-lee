// Main control bar
const mainbar = new ol.control.Bar();
map.addControl(mainbar);

// Editbar
const editbar = new ol.control.EditBar({
  source: vectorLayer, // .getSource(),
  edition: false,
  interactions: {
    Select: false,
    Delete: true,
    Info: false,
    Split: false,
    Offset: false,
  },
});
mainbar.addControl(editbar);

// Undo redo interaction
const undoInteraction = new ol.interaction.UndoRedo();
map.addInteraction(undoInteraction);

// Add buttons to the bar
const bar = new ol.control.Bar({
  group: true,
  controls: [
    new ol.control.Button({
      html: '<i class="fa fa-undo" ></i>',
      title: "undo...",
      handleClick: function () {
        undoInteraction.undo();
      },
    }),
    new ol.control.Button({
      html: '<i class="fa fa-repeat" ></i>',
      title: "redo...",
      handleClick: function () {
        undoInteraction.redo();
      },
    }),
  ],
});
mainbar.addControl(bar);
