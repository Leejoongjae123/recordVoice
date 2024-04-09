import { Inter } from "next/font/google";
import "@/public/css/ljj.css";
import "@/public/css/normalize.css";
import "@/public/css/webflow.css";
import Script from 'next/script'
import LoginStatus from './components/LoginStatus'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "메모리 페이지",
  description: "당신의 음성을 기록하세요",
  icons:{
    icon:'images/logo.png'
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          data-w-id="5f734f83-4103-1961-13c0-b45cc0282e6f"
          data-animation="default"
          data-collapse="medium"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="uui-navbar01_component w-nav"
        >
          <div className="uui-navbar01_container">
            <a href="/" className="uui-navbar01_logo-link w-nav-brand">
              <div className="uui-logo_component">
                <img
                  src="images/logo4.png"
                  loading="lazy"
                  alt="Untitled UI logotext"
                  className="uui-logo_logotype"
                />
              </div>
            </a>
            <nav role="navigation" className="uui-navbar01_menu w-nav-menu">
              <div className="uui-navbar01_menu-left">
                <a href="/" className="uui-navbar01_link w-nav-link">
                  홈
                </a>
                <a href="/upload" className="uui-navbar01_link w-nav-link">
                  업로드
                </a>
                <a href="/mypage" className="uui-navbar01_link w-nav-link">
                  내정보
                </a>
              </div>
              <div className="uui-navbar01_menu-right">
                <div className="uui-navbar01_button-wrapper">
                  <LoginStatus></LoginStatus>

                </div>
              </div>
            </nav>
            <div className="uui-navbar01_menu-button w-nav-button">
              <div className="menu-icon_component">
                <div className="menu-icon_line-top"></div>
                <div className="menu-icon_line-middle">
                  <div className="menu-icon_line-middle-inner"></div>
                </div>
                <div className="menu-icon_line-bottom"></div>
              </div>
            </div>
          </div>
        </div>

        {children}

      </body>
      <Script src="/js/webflow.js" strategy="lazyOnload"></Script>
      <Script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=660bf73b26a4d504faaf0159"></Script>
    </html>
  );
}
