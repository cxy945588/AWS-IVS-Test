import "./globals.css";

export const metadata = {
  title: "AWS IVS Real-Time Streaming 測試",
  description: "使用 Amazon IVS 實現即時多人視訊串流",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
