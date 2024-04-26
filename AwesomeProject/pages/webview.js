// This is the Web page that implement the camera with AR.

import React from 'react';
import { WebView } from 'react-native-webview';

const PoseEstimationView = () => {
    return (
        <WebView
            source={{ uri: 'https://10.0.0.107:8080/cap.html' }}
            style={{ marginTop: 20 }}
        />
    );
};

export default PoseEstimationView;