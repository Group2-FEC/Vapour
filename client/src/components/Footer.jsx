const Footer = () => {
  return (
    <footer className="text-center p-2 bg-blue-600/20 border-b border-blue-700/40">
      <div className="text-sm text-blue-200 mx-auto font-bold">
        {new Date().getFullYear().toString()} | Team Steam | Careers | Support |
        Contact
      </div>
    </footer>
  );
};

export default Footer;
