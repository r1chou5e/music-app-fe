import { useRef, useEffect } from "react";
import useSize from "../hooks/useSize";

function animateBars(analyser, canvas, canvasCtx, dataArray, bufferLength) {
  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = "red";

  const HEIGHT = canvas.height / 2.5;

  var barWidth = Math.ceil(canvas.width / bufferLength) * 3;
  let barHeight;
  let x = 0;

  for (var i = 0; i < bufferLength; i++) {
    barHeight = ((dataArray[i] / 255) * HEIGHT) / 1.8;
    const blueShade = Math.floor((dataArray[i] / 255) * 5); // generate a shade of blue based on the audio input
    const blueHex = ["#ff0000", "#f87171", "#ff0000", "#f87171", "#ff0000"][
      blueShade
    ]; // use react logo blue shades
    canvasCtx.fillStyle = blueHex;
    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

const WaveForm = ({ analyzerData }) => {
  const canvasRef = useRef(null);
  const { dataArray, analyzer, bufferLength } = analyzerData;
  const [width, height] = useSize();

  const draw = (dataArray, analyzer, bufferLength) => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzer) return;
    const canvasCtx = canvas.getContext("2d");

    const animate = () => {
      requestAnimationFrame(animate);
      // eslint-disable-next-line no-self-assign
      canvas.width = canvas.width;
      canvasCtx.translate(0, canvas.offsetHeight / 2 - 115);
      animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength);
    };

    animate();
  };

  useEffect(() => {
    draw(dataArray, analyzer, bufferLength);
  }, [dataArray, analyzer, bufferLength]);

  return (
    <div style={{ position: "absolute", bottom: "-110px", right: "120px"}}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-[850px]"
      />
    </div>
  );
};

export default WaveForm;
