import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import './ProductDetection.css';

const ProductDetection: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[] | undefined>([]);

  useEffect(() => {
    const initTensorflow = async () => {
      await tf.ready();
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
  
    initTensorflow();
  }, []);
  

  const capture = async () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot() as string;
      const video = document.createElement('video');
      video.src = image;
      video.width = 640; // Set your desired width
      video.height = 480; // Set your desired height
  
      const predictions = await model?.detect(video);
      setPredictions(predictions || []);
  
      // Display product predictions in a popup (you can replace this with a modal)
      if (predictions) {
        displayProductPopup(predictions);
      }
    }
  };
  
  

  const displayProductPopup = (predictions: cocoSsd.DetectedObject[]) => {
    let popupContent = 'Product Predictions:\n';
    predictions.forEach((prediction, index) => {
      popupContent += `${index + 1}. ${prediction.class} - ${Math.round(prediction.score * 100)}%\n`;
    });
    window.alert(popupContent);
  };

  return (
    <div className="container">
      <div className="video-container">
        <Webcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg" />
        <button onClick={capture}>Detect Product</button>
      </div>
    </div>
  );
};

export default ProductDetection;
