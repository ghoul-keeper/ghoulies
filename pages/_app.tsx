import type { AppProps } from "next/app";
import "../styles/notification.css";
import "../styles/main.css";
import "../styles/pagination.css";
import "../styles/navigation.css";
import "../styles/react-ui.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="relative" id="r">
      <Component {...pageProps} />
    </div>
  );
}
