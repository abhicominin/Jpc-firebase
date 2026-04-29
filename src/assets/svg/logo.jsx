import Image from "next/image";

const Logo = (props) => {
  return (
    <Image
      src="/Images/hero/logo.png"
      alt="Jpc Logo"
      width={40}
      height={40}
      className="logo"
      {...props}
    />
  );
};

export default Logo
