/** Style the transform handles for the current interaction
 */
const setHandleStyle = () => {
  if (!interaction instanceof ol.interaction.Transform) return;

  // Set cursor style
  ol.interaction.Transform.prototype.Cursors["rotate"] =
    "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAeBJREFUSEvdlbFLW1EUh7/zQlJMGhd1sRpIyaBT/wgXh0IpaN26u1sK3Tp0aTs6dHcSHUQoTi7iJIU62SFLIFIXo0SCkaZ5t5zkpd4mN7nXRYoX3vDePe9+5/7O+d0r3MOQe2Dw30Ei4DEwAdSAX4kKN5YaGhP3qxOykyVgyyPrOlAExoH3wL4d74OcAPP6gzHGyRHpLjGef0T96gYR2QVehEDWgE9RFNFut729oaBeEiLyFXjug9wJMKC/yA7w0gfp6OKSp1AQqlWYnYHqaXeZ/rhQuZyQnvZ2hq5EQuUy/T9rbYwx34AF4ApYNMbsuYolIl+AVa9cNiTZge5OPWCPReApcJk8M8A1sG15qBM/0MIiYuL41k8jIN6u6wV4IYVZ0SK/CjDkUKgX8mQ64ueZ2QBeO1ZZBjYtRZzJuBw/UPhEsrfARwv0DDjW91Qq1TFtYsrBxB3ZmVKpRLlc/mdqcjJNrfa79+0d8GF+bkxOfmitu0NhcRxPAee+7qrrUTTsrBpV7UwmQ6vVSgN/s3F2F6AyfFed7wIqFieoVC5crT700lLQod4foaCkbsGFtxVR2FEul8s0Gg2nUtlslmazqXNvgM/OUyDQUQo7APJ9BlZ5Vnwe8l1agTmMDns4kD/NNpkafvid6QAAAABJRU5ErkJggg==') 5 5, auto";
  ol.interaction.Transform.prototype.Cursors["rotate0"] =
    "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAu9JREFUSEvdld1L01Ecxj/nNzd1uZWWDEulGbIsV0YQQRdBEXVVROALXURmV0VQVgRddhGWhZBELxeVFEVvf0CUhFIURJQvvVGouQzb1GnUtLlz4uRmS2f7BSHRuTv8nvN9zvN8n+/5CaZhiWng4J8j0ReyAXbgKxCJujAa54bGqInumFGyBFgPLEtLS9uSmZlpkVJKv9/fJ6W8CbwC+oFcwAE0AG/jiZKRlAPnvN5ix4OmNmREMDxsxW6XIEYJBmH1Grfq6OgQTkcqTfdHKFlONXDSLInTMIxg6zMlFhVNcuAXR4QVVBh8HyBvPgeB42ZIlhmG8ejMaZtt545h0wEMhcDuZC9QZ4bkTXuLKIxXcK9RsL1KMdMJg4MgpQVfV6z3YyUDAcjOMWdXiddb3NjytC0zdpv2F7kUL/Xp7RdglW7w1Ssrm8tLH/8Spm4f5LvN2bVnaIA6R8bYDGkF6zZwRynVChwGRgBPbQ2thYVY7XZITYWBIKMjw6jSCiqBy8nsqh7wUztr1hgsvwC6u0mLFo8/6wGyo+r03Gjl34DncTP0Az8pwoZhHOp8J4/m6dQD3hJkWzsW091PAExEsr+vVx4fV+JGdfsw/jbJvmCfPOHIGCs7L1/Q81GVAjemINIq1wIhoDkRJtHEH3jfwbGYXZ8/L8aZ1a6zmg/0JCgStlgsKZFIRAkh3iul5pt5u+Z5PJ6WV22vs2LgI0fLqK+//frTp3AFEAYGgfqihekbc3JGuXU9jLbXkmr0Synzog/oONdUb1dZVaVx7fxZOQ70+53cbRxCT3V6OhiGYPOm2dhsgXGMzW4NhcNhbfTPg4nSFSd1xe5dMx6fqtPzl3y5C7Po7OxfBLw0Y1cMo1VWP2wWNQVuq+Fy6RGYvILBFPZWq9DFhogm6DTb+Im4bS6Xa+7Wit5KIcQCq1UIKQ2UUhIiTy5cmnM9EAjo/0rXVHqT/U/iz+moWoH0aFx14vReT/tv15+QJKs15ff/h+Q7KS/zGtdE+2gAAAAASUVORK5CYII=') 5 5, auto";

  if ($("#style").prop("checked")) {
    // Style the rotate handle
    interaction.setStyle(
      "rotate",
      new ol.style.Style({
        text: new ol.style.Text({
          text: "\uf0e2",
          textAlign: "left",
          fill: new ol.style.Fill({ color: "red" }),
        }),
      })
    );
    // Center of rotation
    interaction.setStyle(
      "rotate0",
      new ol.style.Style({
        text: new ol.style.Text({
          text: "\uf0e2",
          fill: new ol.style.Fill({ color: [255, 255, 255, 0.8] }),
          stroke: new ol.style.Stroke({ width: 2, color: "red" }),
        }),
      })
    );
    // Style the move handle
    interaction.setStyle(
      "translate",
      new ol.style.Style({
        text: new ol.style.Text({
          text: "\uf047",
          fill: new ol.style.Fill({ color: [255, 255, 255, 0.8] }),
          stroke: new ol.style.Stroke({ width: 2, color: "red" }),
        }),
      })
    );
  } else {
    interaction.setDefaultStyle();
  }
  // Refresh
  interaction.set("translate", interaction.get("translate"));
};
