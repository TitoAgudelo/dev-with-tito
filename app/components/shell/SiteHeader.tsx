import { publishedNavigation } from "../../../content/site";
import Container from "../foundation/Container";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SiteLogo from "./SiteLogo";

const routeItems = publishedNavigation.filter((item) => item.id !== "contact");
const contactItem = publishedNavigation.find((item) => item.id === "contact");

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <SiteLogo />
        <div className="site-header__desktop">
          <DesktopNav items={routeItems} />
          {contactItem ? (
            <a className="button-link button-link--primary button-link--compact" href={contactItem.href}>
              {contactItem.label}
            </a>
          ) : null}
        </div>
        <MobileNav items={publishedNavigation} />
      </Container>
    </header>
  );
}
