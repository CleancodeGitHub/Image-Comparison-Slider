import React from 'react';
import ImageComparisonSlider from './components/ImageComparisonSlider';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Image Comparison Slider
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Drag the slider to compare before and after images
          </p>
        </div>

        <div className="space-y-12">
          {/* Nature Example */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Nature Photography
            </h2>
            <ImageComparisonSlider
              beforeImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              afterImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?blur=50"
              beforeLabel="Original"
              afterLabel="Blurred"
            />
          </div>

          {/* Architecture Example */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Architecture
            </h2>
            <ImageComparisonSlider
              beforeImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
              afterImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?grayscale"
              beforeLabel="Color"
              afterLabel="Black & White"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;