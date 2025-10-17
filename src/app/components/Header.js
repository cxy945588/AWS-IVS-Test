const Header = () => {
  return (
    <header>
      <h1>🎥 AWS IVS Real-Time Streaming 測試應用</h1>
      <p>
        這是一個使用 <b>Amazon IVS Web Broadcast SDK</b> 的即時串流示範應用程式。
        支援多人視訊互動,延遲低於 300 毫秒。
      </p>
      <p>
        📚 <b>
          <a href="https://docs.aws.amazon.com/ivs/latest/userguide/multiple-hosts.html" target="_blank">
            查看 AWS 文檔
          </a>
        </b>{" "}
        以了解如何建立 Stage 和生成 Participant Token。
      </p>
    </header>
  );
};

export default Header;
