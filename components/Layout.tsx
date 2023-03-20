import { NavBar } from "./NavBar";
import { Wrapper } from "./Wrapper";

interface LayoutProps {
  variant?: "small" | "regular";
  children: React.ReactNode;
}

function Layout({ variant, children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
}

export default Layout;
