const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-4 text-center text-sm text-brand-gray">
      &copy; {new Date().getFullYear()} Eyewear Admin. All rights reserved.
    </footer>
  );
};

export default Footer;
