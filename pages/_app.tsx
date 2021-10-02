import type { AppProps } from "next/app";
import "../styles/notification.css";
import "../styles/main.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="relative">
      <Component {...pageProps} />
    </div>
  );
}
