import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

export default function PowerBi() {
  return (
    <>
      <WebView
        source={{
          uri: `https://app.powerbi.com/view?r=eyJrIjoiOTI0OGM5OWEtMzBhOC00MzM0LTkwYWUtMzcxM2I5NDJlNTNiIiwidCI6ImQxYjY3M2I5LTdjY2QtNDM5Yi04NmJjLWUzNGNjNmM5NTNiYiIsImMiOjEwfQ%3D%3D`,
        }}></WebView>
    </>
  );
}
