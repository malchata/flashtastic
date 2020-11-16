/* global registerPaint */

if (typeof registerPaint !== "undefined") {
  registerPaint("flashtastic", class {
    static get inputProperties() {
      return [
        "--flashtastic-radius",
        "--flashtastic-ray-width",
        "--flashtastic-threshold",
        "--flashtastic-color",
        "--flashtastic-top",
        "--flashtastic-left"
      ];
    }

    paint(ctx, geom, properties) {
      // A lil' bit o' setup here
      const fullArc = Math.PI * 2;
      const degToRad = Math.PI / 180;

      // These are custom properties
      const radius = parseInt(properties.get("--flashtastic-radius")) || 48;
      const rayWidth = parseFloat(properties.get("--flashtastic-ray-width")) || 1.5;
      const threshold = parseFloat(properties.get("--flashtastic-threshold")) || 0.75;
      const color = properties.get("--flashtastic-color").toString().trim() || "#fffbfe";
      const top = parseFloat(properties.get("--flashtastic-top")) || 0.25;
      const left = parseFloat(properties.get("--flashtastic-left")) || 0.1875;

      // Other stuff!
      const outerRadius = geom.width > geom.height ? geom.width * 1.5 : geom.height * 1.5;
      const x = geom.width * left;
      const y = geom.height * top;

      ctx.fillStyle = color;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, fullArc, false);
      ctx.fill();
      ctx.restore();

      for (let i = 0; i <= 360; i++) {
        if (Math.random() >= threshold) {
          const radiansEdge1 = degToRad * (i - rayWidth);
          const radiansEdge2 = degToRad * (i + rayWidth);

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo((Math.cos(radiansEdge1) * outerRadius), (Math.sin(radiansEdge1) * outerRadius));
          ctx.lineTo((Math.cos(radiansEdge2) * outerRadius), (Math.sin(radiansEdge2) * outerRadius));
          ctx.lineTo(x, y);
          ctx.fill();
        }
      }
    }
  });
}
